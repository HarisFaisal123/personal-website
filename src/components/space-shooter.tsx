"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const WIDTH = 256;
const HEIGHT = 168;
const SHIP_W = 18;
const SHIP_H = 26;
const SHIP_BOTTOM_MARGIN = 10;
const SHIP_SPEED = 3.5;
const BULLET_SPEED = 6;
const BULLET_COOLDOWN = 200;
const FIRE_HOLD_INTERVAL = 260;
const STAR_COUNT = 24;
const FLAME_COLOR = "#f5a524";
const HIT_COLOR = "#e5484d";
const SHIP_TOP = HEIGHT - SHIP_BOTTOM_MARGIN - SHIP_H;
const ENEMY_W = 15;
const ENEMY_H = 12;
const BULLET_W = 3;
const BULLET_H = 9;

type Body = { x: number; y: number; w: number; h: number };
type Bullet = Body;
type Enemy = Body & { speed: number };
type Star = { x: number; y: number; speed: number };

type GameState = {
  shipX: number;
  bullets: Bullet[];
  enemies: Enemy[];
  stars: Star[];
  keys: { left: boolean; right: boolean };
  pointerX: number | null;
  lastShot: number;
  lastSpawn: number;
  lastPointerFire: number;
  hitFlashUntil: number;
};

type Colors = {
  background: string;
  edge: string;
  foreground: string;
  mutedForeground: string;
  accent: string;
};

function readColors(): Colors {
  const style = getComputedStyle(document.documentElement);
  const get = (name: string) => style.getPropertyValue(name).trim();
  return {
    background: get("--background") || "#0b0f14",
    edge: get("--edge") || "#33404d",
    foreground: get("--foreground") || "#e8edf2",
    mutedForeground: get("--muted-foreground") || "#8b98a5",
    accent: get("--accent") || "#5ec8c8",
  };
}

function createStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * WIDTH,
    y: Math.random() * HEIGHT,
    speed: 0.25 + Math.random() * 0.5,
  }));
}

function createState(): GameState {
  return {
    shipX: WIDTH / 2 - SHIP_W / 2,
    bullets: [],
    enemies: [],
    stars: createStars(),
    keys: { left: false, right: false },
    pointerX: null,
    lastShot: 0,
    lastSpawn: 0,
    lastPointerFire: 0,
    hitFlashUntil: 0,
  };
}

function overlaps(a: Body, b: Body) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

/**
 * A small, always-on easter egg. It is entirely inert — zero listeners, zero
 * animation frames — until it actually has DOM focus, so it can never steal
 * a keystroke meant for anything else on the page: clicking or tabbing away
 * blurs it like any other focusable element, which is what stops the game.
 * There is deliberately no separate "focused" flag disconnected from real
 * focus — that would risk the game still eating Space/Arrow presses aimed at
 * the theme switch or a collapsible after the user tabbed elsewhere.
 */
export function SpaceShooter() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const stateRef = React.useRef<GameState>(createState());
  const colorsRef = React.useRef<Colors | null>(null);
  const rafRef = React.useRef<number>(0);
  const dprRef = React.useRef(1);

  const [focused, setFocused] = React.useState(false);
  const [score, setScore] = React.useState(0);

  // Canvas setup + idle draw + theme-change repaint, independent of gameplay.
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    canvas.style.width = `${WIDTH}px`;
    canvas.style.height = `${HEIGHT}px`;

    colorsRef.current = readColors();
    drawFrame(canvas, stateRef.current, colorsRef.current, dprRef.current);

    const observer = new MutationObserver(() => {
      colorsRef.current = readColors();
      if (!focusedRef.current) {
        drawFrame(canvas, stateRef.current, colorsRef.current, dprRef.current);
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mirrors `focused` into a ref so the MutationObserver above (registered
  // once) always reads the current value rather than a stale closure.
  const focusedRef = React.useRef(focused);
  React.useEffect(() => {
    focusedRef.current = focused;
  }, [focused]);

  // The game loop itself: starts on focus, fully stops on blur.
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!focused || !canvas) return;

    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - last, 48);
      last = now;

      const state = stateRef.current;
      const colors = colorsRef.current ?? readColors();

      if (state.keys.left) state.shipX -= SHIP_SPEED * (dt / 16.7);
      if (state.keys.right) state.shipX += SHIP_SPEED * (dt / 16.7);
      if (state.pointerX !== null) {
        state.shipX += (state.pointerX - (state.shipX + SHIP_W / 2)) * 0.25;
      }
      state.shipX = Math.max(0, Math.min(WIDTH - SHIP_W, state.shipX));

      if (state.pointerX !== null && now - state.lastPointerFire > FIRE_HOLD_INTERVAL) {
        fire(state, now);
      }

      state.bullets = state.bullets
        .map((b) => ({ ...b, y: b.y - BULLET_SPEED * (dt / 16.7) }))
        .filter((b) => b.y + b.h > 0);

      const spawnInterval = Math.max(420, 1100 - score * 6);
      if (now - state.lastSpawn > spawnInterval) {
        state.lastSpawn = now;
        state.enemies.push({
          x: Math.random() * (WIDTH - ENEMY_W),
          y: -ENEMY_H,
          w: ENEMY_W,
          h: ENEMY_H,
          speed: Math.min(1.3 + score * 0.013, 3.4),
        });
      }

      state.enemies = state.enemies
        .map((e) => ({ ...e, y: e.y + e.speed * (dt / 16.7) }))
        .filter((e) => e.y < HEIGHT + ENEMY_H);

      const survivingEnemies: Enemy[] = [];
      let scoreDelta = 0;
      for (const enemy of state.enemies) {
        const hitBullet = state.bullets.find((b) => overlaps(b, enemy));
        if (hitBullet) {
          state.bullets = state.bullets.filter((b) => b !== hitBullet);
          scoreDelta += 10;
          continue;
        }
        survivingEnemies.push(enemy);
      }
      state.enemies = survivingEnemies;

      const ship: Body = { x: state.shipX, y: SHIP_TOP, w: SHIP_W, h: SHIP_H };
      if (state.enemies.some((e) => overlaps(e, ship))) {
        scoreDelta = -Infinity;
        state.hitFlashUntil = now + 260;
        state.enemies = [];
      }

      if (scoreDelta === -Infinity) {
        setScore(0);
      } else if (scoreDelta > 0) {
        setScore((s) => s + scoreDelta);
      }

      state.stars = state.stars.map((star) => {
        const y = star.y + star.speed * (dt / 16.7);
        return y > HEIGHT ? { ...star, y: 0, x: Math.random() * WIDTH } : { ...star, y };
      });

      drawFrame(canvas, state, colors, dprRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [focused, score]);

  function fire(state: GameState, now: number) {
    if (now - state.lastShot < BULLET_COOLDOWN) return;
    if (state.bullets.length >= 5) return;
    state.lastShot = now;
    state.lastPointerFire = now;
    state.bullets.push({
      x: state.shipX + SHIP_W / 2 - BULLET_W / 2,
      y: SHIP_TOP - BULLET_H,
      w: BULLET_W,
      h: BULLET_H,
    });
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    const state = stateRef.current;

    if (event.key === "Escape") {
      (event.currentTarget as HTMLDivElement).blur();
      return;
    }

    if (["ArrowLeft", "ArrowRight", " ", "a", "d", "A", "D"].includes(event.key)) {
      event.preventDefault();
    }

    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
      state.keys.left = true;
    } else if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
      state.keys.right = true;
    } else if (event.key === " ") {
      fire(state, performance.now());
    }
  }

  function handleKeyUp(event: React.KeyboardEvent) {
    const state = stateRef.current;
    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
      state.keys.left = false;
    } else if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
      state.keys.right = false;
    }
  }

  function pointerXFromEvent(event: React.PointerEvent) {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return ((event.clientX - rect.left) / rect.width) * WIDTH;
  }

  function handlePointerDown(event: React.PointerEvent) {
    stateRef.current.pointerX = pointerXFromEvent(event);
  }

  function handlePointerMove(event: React.PointerEvent) {
    if (stateRef.current.pointerX === null) return;
    stateRef.current.pointerX = pointerXFromEvent(event);
  }

  function handlePointerUp() {
    stateRef.current.pointerX = null;
  }

  return (
    <div
      role="application"
      tabIndex={0}
      aria-label="Space shooter mini-game. Click or press Enter to play. Arrow keys or drag to move, space to shoot. Click away or press Escape to stop."
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        stateRef.current.keys = { left: false, right: false };
        stateRef.current.pointerX = null;
        if (canvasRef.current && colorsRef.current) {
          drawFrame(canvasRef.current, stateRef.current, colorsRef.current, dprRef.current);
        }
      }}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={cn(
        "fixed bottom-4 left-4 z-40 origin-bottom-left touch-none rounded-sm border border-edge bg-surface shadow-lg select-none",
        // Scaled visually per breakpoint rather than resized internally, so
        // the simulation (speeds, hitboxes) stays identical at every size —
        // only the rendered footprint shrinks on a phone, where the fixed
        // pixel size would otherwise dominate the screen.
        "scale-[0.42] sm:scale-[0.58] lg:scale-[0.72]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-edge px-2 py-1">
        <span className="font-mono text-[9px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
          Space shooter
        </span>
        <span className="font-mono text-[9px] font-medium text-accent tabular-nums">
          {String(score).padStart(3, "0")}
        </span>
      </div>

      <div className="relative">
        <canvas ref={canvasRef} className="block" />

        {!focused && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <span className="font-mono text-[9px] tracking-[0.1em] text-muted-foreground uppercase">
              {score > 0 ? "Click to resume" : "Click to play"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function drawFrame(
  canvas: HTMLCanvasElement,
  state: GameState,
  colors: Colors,
  dpr: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.save();
  ctx.scale(dpr, dpr);

  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = colors.mutedForeground;
  ctx.globalAlpha = 0.5;
  for (const star of state.stars) {
    ctx.fillRect(star.x, star.y, 1, 1);
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = colors.accent;
  for (const bullet of state.bullets) {
    ctx.fillRect(bullet.x, bullet.y, bullet.w, bullet.h);
  }

  for (const enemy of state.enemies) {
    drawEnemy(ctx, enemy, colors);
  }

  const now = performance.now();
  drawShip(ctx, state.shipX, SHIP_TOP, colors, now < state.hitFlashUntil, now);

  ctx.restore();
}

/** A small flying-saucer silhouette: an ellipse body, a dome, and running lights. */
function drawEnemy(ctx: CanvasRenderingContext2D, enemy: Enemy, colors: Colors) {
  const cx = enemy.x + enemy.w / 2;
  const cy = enemy.y + enemy.h / 2;

  ctx.beginPath();
  ctx.ellipse(cx, cy + enemy.h * 0.12, enemy.w / 2, enemy.h * 0.34, 0, 0, Math.PI * 2);
  ctx.fillStyle = colors.foreground;
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(cx, cy - enemy.h * 0.2, enemy.w * 0.3, enemy.h * 0.24, 0, 0, Math.PI * 2);
  ctx.fillStyle = colors.mutedForeground;
  ctx.fill();

  ctx.fillStyle = colors.background;
  for (const dx of [-enemy.w * 0.26, 0, enemy.w * 0.26]) {
    ctx.beginPath();
    ctx.arc(cx + dx, cy + enemy.h * 0.16, Math.max(0.8, enemy.w * 0.05), 0, Math.PI * 2);
    ctx.fill();
  }
}

/** A dart-shaped rocket: pointed nose, swept fins, a cockpit window, and an engine flame. */
function drawShip(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  colors: Colors,
  isHit: boolean,
  now: number
) {
  const cx = x + SHIP_W / 2;
  const bodyHalfW = SHIP_W * 0.22;
  const finOuterW = SHIP_W * 0.55;
  const noseH = SHIP_H * 0.32;
  const finTipY = SHIP_H * 0.8;

  // The flame is drawn first so the hull's tail point sits in front of its base.
  const flicker = 3 + Math.sin(now / 55) * 1.6;
  ctx.beginPath();
  ctx.moveTo(cx - bodyHalfW * 0.6, y + SHIP_H - 2);
  ctx.lineTo(cx, y + SHIP_H + 5 + flicker);
  ctx.lineTo(cx + bodyHalfW * 0.6, y + SHIP_H - 2);
  ctx.closePath();
  ctx.fillStyle = FLAME_COLOR;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(cx, y);
  ctx.lineTo(cx + bodyHalfW, y + noseH);
  ctx.lineTo(cx + finOuterW, y + finTipY);
  ctx.lineTo(cx, y + SHIP_H);
  ctx.lineTo(cx - finOuterW, y + finTipY);
  ctx.lineTo(cx - bodyHalfW, y + noseH);
  ctx.closePath();
  ctx.fillStyle = isHit ? HIT_COLOR : colors.accent;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, y + SHIP_H * 0.36, SHIP_W * 0.15, 0, Math.PI * 2);
  ctx.fillStyle = colors.background;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = colors.mutedForeground;
  ctx.stroke();
}
