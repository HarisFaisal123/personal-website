import { Panel, PanelContent, PanelHeader } from "@/components/panel";

import { USER } from "../data/user";

export function About() {
  return (
    <Panel id="about" aria-labelledby="about-title">
      <PanelHeader id="about-title" index="02" title="About" />

      <PanelContent className="space-y-3.5">
        {USER.about.map((paragraph, index) => (
          <p key={index} className="text-sm/relaxed text-pretty">
            {paragraph}
          </p>
        ))}
      </PanelContent>
    </Panel>
  );
}
