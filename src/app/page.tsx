import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { Divider } from "@/components/divider";
import { Reveal } from "@/components/reveal";
import { SITE_INFO } from "@/config/site";
import { About } from "@/features/profile/components/about";
import { ContactCta } from "@/features/profile/components/contact-cta";
import { Coursework } from "@/features/profile/components/coursework";
import { Experiences } from "@/features/profile/components/experiences";
import { GithubContributions } from "@/features/profile/components/github-contributions";
import { Overview } from "@/features/profile/components/overview";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import {
  FeaturedProjects,
  OtherProjects,
} from "@/features/profile/components/projects";
import { SocialLinks } from "@/features/profile/components/social-links";
import { TechStack } from "@/features/profile/components/tech-stack";
import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { USER } from "@/features/profile/data/user";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <main id="main" className="max-w-screen overflow-x-clip">
        <div id="top" className="mx-auto max-w-3xl">
          <Reveal>
            <ProfileHeader />
          </Reveal>

          <Reveal>
            <Overview />
          </Reveal>
          <Divider />

          <Reveal>
            <SocialLinks />
          </Reveal>
          <Divider />

          <Reveal>
            <GithubContributions />
          </Reveal>
          <Divider />

          <Reveal>
            <About />
          </Reveal>
          <Divider />

          <Reveal>
            <TechStack />
          </Reveal>
          <Divider />

          <Reveal>
            <Experiences />
          </Reveal>
          <Divider />

          <Reveal>
            <FeaturedProjects />
          </Reveal>
          <Divider />

          <Reveal>
            <OtherProjects />
          </Reveal>
          <Divider />

          <Reveal>
            <Coursework />
          </Reveal>
          <Divider />

          <Reveal>
            <ContactCta />
          </Reveal>
        </div>
      </main>
    </>
  );
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      jobTitle: USER.role,
      description: USER.tagline,
      email: `mailto:${USER.email}`,
      url: SITE_INFO.url,
      image: `${SITE_INFO.url}${USER.avatar}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Toronto",
        addressCountry: "CA",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Toronto",
      },
      sameAs: SOCIAL_LINKS.filter((link) => link.icon !== "mail").map(
        (link) => link.href
      ),
    },
  };
}
