import Image from "next/image";
import { NextSeo } from "next-seo";

import Link from "components/Link";
import Section from "components/Section";
import Workplaces from "components/Workplaces";
import Gallery from "components/Gallery";
import { ActivityType } from "components/Activity";

import cuhkLogo from "public/schools/CUHK.png";
import umnLogo from "public/schools/UMN.png";

import githubLogo from "public/Github.png";
import jupyterLogo from "public/projects/jupyter.png";
import qianjianLogo from "public/ventures/qianjian.png";
import stayLogo from "public/ventures/stay.jpeg";
import openaiLogo from "public/projects/openai-logo.png";
import nosediveLogo from "public/projects/nosedive.png";
import canvasLogo from "public/projects/canvas.png";
import isjobsLogo from "public/ventures/davis001.jpg";
import surgeLogo from "public/ventures/surge.svg";
import misqLogo from "public/ventures/misq.png";

import avatar from "public/avatar.png";

import { GetStaticProps } from "next";
import { Project, allProjects } from "../.contentlayer/generated";
import { pick } from "lib/pick";
import MDXComponents from "../components/MDXComponents";
import { getActivities, getActivity } from "../lib/strava";

export const connectLinks = [
  { label: "Email", href: "mailto:contact@zenan.ch" },
  { label: "Twitter", href: "https://twitter.com/chzenan" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chzenan/" },
  { label: "GitHub", href: "https://github.com/alanzchen" }
];

export const FullName = "Zenan Chen";
export const SiteURL = "https://zenan.ch";

const education = [
  {
    title: "Ph.D. in Information Systems",
    description: "University of Minnesota",
    time: "2018 - 24",
    imageSrc: umnLogo,
  },
  {
    title: "B.A. in Economics",
    description: "CUHK, Shenzhen",
    time: "2014 - 18",
    imageSrc: cuhkLogo,
  },
];

const sideProjects = [
  {
    title: "ChatGPT Quick Actions for Raycast",
    time: "2023",
    description: "Invoke ChatGPT anywhere on your Mac",
    imageSrc: openaiLogo,
    link: "https://github.com/alanzchen/chatgpt-quick-actions",
  },
  {
    title: "Canvas Tools",
    time: "2022",
    description: "A set of CLI tools for Canvas LMS",
    imageSrc: canvasLogo,
    link: "https://github.com/alanzchen/Canvas-Tools"
  },
  {
    title: "Jupyter Desktop",
    time: "2020",
    description: "macOS App for Jupyter Lab",
    imageSrc: jupyterLogo,
    link: "https://github.com/alanzchen/jupyter-desktop",
  },
  {
    title: "Nosedive",
    time: "2017",
    description: "Parody website of Black Mirror's Nosedive",
    imageSrc: nosediveLogo,
    link: "https://github.com/alanzchen/nosedive/",
  }
];

const ventures = [
  {
    title: "IS Jobs",
    time: "2022 -",
    description: "Crowdsourced database for IS job posts",
    imageSrc: isjobsLogo,
    link: "https://isjobs.xyz",
  },
  {
    title: "MISQ Insider (as founding coordinator)",
    time: "2021 -",
    description: "MISQ-affiliated student blog for interviews",
    imageSrc: misqLogo,
    link: "https://www.linkedin.com/company/misqinsider/",
  },
  {
    title: "Surge.fm",
    time: "2020 -",
    description: "Crowdsourced self-organizing news aggregator",
    imageSrc: surgeLogo,
    link: "https://surge.fm",
  },
  {
    title: "浅见 (Qianjian)",
    time: "2014 - 18",
    description: "Online campus media for CUHK(SZ)",
    imageSrc: qianjianLogo,
    link: "https://qianjian.space",
  },
  {
    title: "月台 (Stay)",
    time: "2015 - 17",
    description: "Campus magazine for CUHK(SZ)",
    imageSrc: stayLogo,
    link: "https://qianjian.space",
  }
];

const awards = [
  {
    title: "Best Dissertation Award @ WITS",
    time: "2023",
  },
  {
    title: "Best Student Paper Runner-up @ CIST",
    time: "2023",
  },
  {
    title: "Best Paper Award @ ICIS, General Track",
    time: "2022",
  },
  {
    title: "Best Student Paper Award @ WITS",
    time: "2022",
  },
  {
    title: "Carlson School of Management Dissertation Fellowship",
    time: "2022",
  },
  {
    title: "First Place @ China Bridge Case Competition ($6,000)",
    description: "As Faculty Mentor, I coached a team of 4 undergraduate students.",
    time: "2021",
  },
  {
    title: "Dean’s Small Research Grant",
    time: "2020",
  },
];

const seoTitle = `About | ${FullName}`;
export const seoDesc =
  "Ph.D. candidate in Information Systems. For a more humane & productive future.";

export default function About({ projects, activities }: { projects: Project[]; activities: ActivityType[] }) {
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDesc}
        openGraph={{
          title: seoTitle,
          description: seoDesc,
          url: `/about/`,
          site_name: `${FullName}`,
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <div className="flex flex-col gap-16 md:gap-24">
        <div className="hidden sm:block">
          <Gallery activities={activities}/>
        </div>
        <div className="-mb-8 sm:hidden animate-in">
          <Image
            src={avatar}
            width={48}
            height={48}
            alt={`avatar of ${FullName}`}
          />
        </div>
        <div
          className="flex flex-col gap-16 animate-in sm:animate-none md:gap-16"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <Section heading="About me" headingAlignment="right">
            <div className="flex flex-col gap-6">
              <p>
                <em className="font-semibold">Hi!</em>&nbsp; My name is Zenan (泽南) Chen (陈), I usually go by Alan. I am an incoming assistant professor at University of Texas at Dallas, Jindal School of Management.
              </p>
            </div>
          </Section>
          <Section heading="Research" headingAlignment="right">
            <div className="flex flex-col gap-6">
              <p>
                Driven by the mistmatch between our understanding of technologies and the rate at which they are adopted, my research vision is centered on understanding and guiding the design and usage of emerging technologies and platforms. Specifically, my research delve into the following areas:
              </p>
              <ul className="list-decimal ml-10">
                <li>the impact of technological tools on individual work outcomes,</li>
                <li>the societal effects of emerging AI technologies, and</li>
                <li>the design considerations of digital platforms.</li>
              </ul>
              <p>
                I use a blend of methods, including field experiments, casual inference, machine learning, and analytical modeling.
              </p>
            </div>
          </Section>
          <Section heading="Connect" headingAlignment="right">
            <ul className="flex gap-6 animated-list">
              {connectLinks.map((link) => (
                <li className="transition-opacity" key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </Section>
          <Section heading="Education" headingAlignment="right">
            <div className="flex flex-col w-full gap-8">
              <p>
                Dissertation: <i>Design Considerations of Information Systems Artifacts and Digital Platforms</i><br />
              </p>
              <Workplaces items={education} />
            </div>
          </Section>
          <Section heading="Selected Awards" headingAlignment="right">
            <div className="flex flex-col w-full gap-8">
              <ul className={`flex flex-col gap-1`}>
                {awards.map((award) => (
                  <li className="" key="award">
                    <div className="flex justify-between gap-2">
                      <div className="flex flex-col gap-px">
                        <p>{award.title}</p>
                        {award.description && <p className="text-sm text-secondary">{award.description}</p>}
                      </div>
                      <p className="text-secondary">{award.time}</p>
                    </div>
                </li>
                ))}
              </ul>
            </div>
          </Section>
          <Section heading="Initiatives" headingAlignment="right">
            <div className="flex flex-col w-full gap-8">
              <p>Initiatives I have founded, co-founded, or advised. </p>
              <Workplaces items={ventures} isAnimated />
            </div>
          </Section>
          <Section heading="Side Projects" headingAlignment="right">
            <div className="flex flex-col w-full gap-8">
              <p>I am also a self-taught full-stack developer. I build stuff for fun :) </p>
              <Workplaces items={sideProjects} isAnimated />
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const projects = allProjects
    .sort((a, b) => parseInt(b.time.slice(0, 4)) - parseInt(a.time.slice(0, 4)))
    .map((post) =>
    pick(post, ["slug", "title", "description", "time"])
  );

  let activities: ActivityType[] = [];
  try {
    activities = await getActivities();
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      projects: projects,
      activities: activities
    },
    revalidate: 3600,
  };
};