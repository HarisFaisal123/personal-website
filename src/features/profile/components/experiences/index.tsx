import { Panel, PanelHeader } from "@/components/panel";

import { EXPERIENCES } from "../../data/experiences";
import { ExperienceItem } from "./experience-item";

export function Experiences() {
  return (
    <Panel id="experience" aria-labelledby="experience-title">
      <PanelHeader
        id="experience-title"
        index="04"
        title="Experience"
        count={EXPERIENCES.length}
      />

      <div>
        {EXPERIENCES.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </Panel>
  );
}
