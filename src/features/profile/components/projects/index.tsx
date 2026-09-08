import { Panel, PanelHeader } from "@/components/panel";

import { FEATURED_PROJECTS, OTHER_PROJECTS } from "../../data/projects";
import { ProjectItem } from "./project-item";

export function FeaturedProjects() {
  return (
    <Panel id="featured-projects" aria-labelledby="featured-projects-title">
      <PanelHeader
        id="featured-projects-title"
        index="05"
        title="Featured projects"
        count={FEATURED_PROJECTS.length}
      />

      <div>
        {FEATURED_PROJECTS.map((project) => (
          <ProjectItem key={project.id} project={project} showArchitecture />
        ))}
      </div>
    </Panel>
  );
}

export function OtherProjects() {
  return (
    <Panel id="other-projects" aria-labelledby="other-projects-title">
      <PanelHeader
        id="other-projects-title"
        index="06"
        title="Other projects"
        count={OTHER_PROJECTS.length}
      />

      <div>
        {OTHER_PROJECTS.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </Panel>
  );
}
