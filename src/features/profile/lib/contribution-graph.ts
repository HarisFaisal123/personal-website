import {
  eachDayOfInterval,
  formatISO,
  getMonth,
  parseISO,
  startOfWeek,
} from "date-fns";

export type Activity = {
  date: string;
  count: number;
  /** Intensity bucket, 0 (none) through 4 (busiest), as returned by the API. */
  level: number;
};

export type Week = (Activity | null)[];

/**
 * Lays activities out into whole Sunday-to-Saturday weeks, the shape a
 * calendar grid needs. The API only returns days that exist, so this also
 * fills any missing day with a zero-activity placeholder — a column can't
 * have a hole in it.
 */
export function toWeeks(activities: Activity[]): Week[] {
  if (activities.length === 0) return [];

  const byDate = new Map(activities.map((activity) => [activity.date, activity]));
  const sorted = [...activities].sort((a, b) => a.date.localeCompare(b.date));

  const gridStart = startOfWeek(parseISO(sorted[0].date));
  const gridEnd = parseISO(sorted[sorted.length - 1].date);

  const days = eachDayOfInterval({ start: gridStart, end: gridEnd }).map(
    (day): Activity => {
      const iso = formatISO(day, { representation: "date" });
      return byDate.get(iso) ?? { date: iso, count: 0, level: 0 };
    }
  );

  const weeks: Week[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

/**
 * Which week column each new month's label should sit above. The grid's
 * first column is usually a partial week, which can tick over into a new
 * month just one column later than the grid's actual first label — too
 * close for both to be legible — so a label is dropped if it would land
 * within `minGap` columns of the previous one.
 */
export function monthLabels(
  weeks: Week[],
  minGap = 2
): { label: string; weekIndex: number }[] {
  const labels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  let lastWeekIndex = -Infinity;

  weeks.forEach((week, weekIndex) => {
    const firstDay = week.find((day): day is Activity => day !== null);
    if (!firstDay) return;

    const month = getMonth(parseISO(firstDay.date));
    if (month === lastMonth) return;
    if (weekIndex - lastWeekIndex < minGap) return;

    lastMonth = month;
    lastWeekIndex = weekIndex;

    labels.push({
      label: parseISO(firstDay.date).toLocaleString("en-US", { month: "short" }),
      weekIndex,
    });
  });

  return labels;
}

export function totalCount(activities: Activity[]): number {
  return activities.reduce((sum, activity) => sum + activity.count, 0);
}

export const WEEKDAY_ROWS = [1, 3, 5] as const; // Mon, Wed, Fri
