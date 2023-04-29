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

import avatar from "public/avatar.png";

import { GetStaticProps } from "next";
import { Project, allProjects } from "../.contentlayer/generated";
import { pick } from "lib/pick";

export const connectLinks = [
  { label: "Email", href: "mailto:contact@zenan.ch" },
  { label: "Twitter", href: "https://twitter.com/chzenan" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chzenan/" },
  { label: "GitHub", href: "https://github.com/alanzchen" }
];

export const FullName = "Zenan Chen";
export const SiteURL = "https://zenan.ch";

type AboutProps = {
  projects: Project[];
};

const workplaces = [
  {
    title: "Ph.D. in Information Systems",
    description: "University of Minnesota",
    time: "2018 - 2024",
    imageSrc: umnLogo,
  },
  {
    title: "B.A. in Economics",
    description: "CUHK, Shenzhen",
    time: "2014 - 2018",
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
    title: "浅见 (Qianjian)",
    time: "2014 - 2018",
    description: "Online campus media for CUHK(SZ)",
    imageSrc: qianjianLogo,
    link: "https://qianjian.space",
  },
  {
    title: "月台 (Stay)",
    time: "2015 - 2017",
    description: "Campus magazine for CUHK(SZ)",
    imageSrc: stayLogo,
    link: "https://qianjian.space",
  }
];

const awards = [
  {
    title: "General Track Best Paper Award @ ICIS",
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
  "Researcher in Information Systems with a primary focus on Technologies ✕ Productivity.";

export default function About({ projects }: AboutProps) {
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
          <Gallery />
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
                <em className="font-semibold">Hi!</em>&nbsp; My name is Zenan (泽南) Chen (陈), I usually go by Alan.
                I am a Researcher in Information Systems with a primary focus on Technologies ✕ Productivity.
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
                My advisor is <Link href="https://carlsonschool.umn.edu/faculty/jason-chan">Jason Chan</Link> and my co-advisor is {" "}
                <Link href={`https://carlsonschool.umn.edu/faculty/soumya-sen`}>Soumya Sen</Link> 
              </p>
              <Workplaces items={workplaces} />
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
          <Section heading="Side Projects" headingAlignment="right">
            <div className="flex flex-col w-full gap-8">
              <p>I am also a self-taught full-stack developer. I build stuff for fun :) </p>
              <Workplaces items={sideProjects} isAnimated />
            </div>
          </Section>
          <Section heading="Past Ventures" headingAlignment="right">
            <div className="flex flex-col w-full gap-8">
              <p>Ventures I have founded, co-founded, or advised. </p>
              <Workplaces items={ventures} isAnimated />
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

  return {
    props: { projects },
  };
};