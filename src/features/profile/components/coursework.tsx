import { Panel, PanelHeader } from "@/components/panel";

import { COURSEWORK } from "../data/coursework";

const COURSE_COUNT = COURSEWORK.reduce(
  (total, group) => total + group.courses.length,
  0
);

export function Coursework() {
  return (
    <Panel id="coursework" aria-labelledby="coursework-title">
      <PanelHeader
        id="coursework-title"
        index="07"
        title="Coursework"
        count={COURSE_COUNT}
      />

      <div>
        {COURSEWORK.map((group) => (
          <section
            key={group.id}
            className="border-b border-edge px-4 py-3.5 last:border-b-0 sm:flex sm:gap-4"
            aria-labelledby={`coursework-${group.id}`}
          >
            <h3
              id={`coursework-${group.id}`}
              className="mb-2 shrink-0 font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase sm:mb-0 sm:w-40 sm:pt-1"
            >
              {group.label}
            </h3>

            <ul className="flex-1 space-y-2">
              {group.courses.map((course) => (
                <li
                  key={course.code}
                  className="flex flex-col gap-x-2 gap-y-0.5 sm:flex-row sm:items-baseline"
                >
                  <span className="shrink-0 font-mono text-[12px] leading-5 font-medium text-accent tabular-nums">
                    {course.code}
                  </span>

                  <div className="min-w-0">
                    <span className="text-sm leading-5">{course.title}</span>
                    {course.note && (
                      <p className="mt-0.5 text-[13px]/relaxed text-pretty text-muted-foreground">
                        {course.note}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Panel>
  );
}
