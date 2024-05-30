import Image from "next/image";
import { NextSeo } from "next-seo";

import Link from "components/Link";
import Section from "components/Section";
import Workplaces from "components/Workplaces";
import Gallery from "components/Gallery";
import { ActivityType } from "components/Activity";

import purdueLogo from "public/schools/purdue.jpg";

import titanLogo from "public/projects/titan_logo.png";
import openaiLogo from "public/projects/openai-logo.png";
import nosediveLogo from "public/projects/nosedive.png";
import canvasLogo from "public/projects/canvas.png";
import keybyteLogo from "public/ventures/keybyte.png";
import amazonLogo from "public/ventures/amazon.jpg";

import avatar from "public/avatar.png";

import { GetStaticProps } from "next";
import { Project, allProjects } from "../.contentlayer/generated";
import { pick } from "lib/pick";
import MDXComponents from "../components/MDXComponents";
import { getActivities, getActivity } from "../lib/strava";
import { subtle } from "crypto";

export const connectLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/youngbryanyu/" },
    { label: "GitHub", href: "https://github.com/youngbryanyu" },
    { label: "Email", href: "mailto:youngyu19@gmail.com" },
];

export const FullName = "Young Bryan Yu";
export const SiteURL = "https://zenan.ch"; // TODO: change

const ventures = [
    {
        title: "Software Engineer Intern",
        time: "2024",
        description: "KeyByte LLC",
        imageSrc: keybyteLogo,
        link: "https://keybyte.xyz/",
    },
    {
        title: "Software Development Engineer Intern",
        time: "2023",
        description: "Amazon\nAlexa Food",
        imageSrc: amazonLogo,
        link: "https://amazon.com/",
    },
    {
        title: "Software Development Engineer Intern",
        time: "2022",
        description: "Amazon\nAlexa Kitchen",
        imageSrc: amazonLogo,
        link: "https://amazon.com/",
    }
];

const education = [
    {
        title: "MS, Computer Science",
        description: "Purdue University",
        time: "2024 - 2026",
        imageSrc: purdueLogo,
        link: "https://www.purdue.edu/"
    },
    {
        title: "BS, Computer Science",
        description: "Purdue University",
        time: "2020 - 2023",
        imageSrc: purdueLogo,
        link: "https://www.purdue.edu/"
    },
];

const awards = [
    {
        title: "Dean's List and Semester Honors",
        description: "All semesters during undergrad",
        time: "2020 - 2023",
    }
];

const sideProjects = [
    {
        title: "SimpliStash",
        time: "2024",
        description: "A simple in-memory key-value database with a custom TCP-based protocol supporting features like TTL, LRU eviction, snapshots to disk, single-leader replication, off-heap storage, and a CLI",
        imageSrc: openaiLogo,
        link: "https://github.com/youngbryanyu/SimpliStash",
    },
    {
        title: "simple-app-config",
        time: "2024",
        description: "A simple easy-to-use configuration manager package for Node.js applications",
        imageSrc: canvasLogo,
        link: "https://github.com/youngbryanyu/simple-app-config"
    },
    {
        title: "Titan Health App",
        time: "2023",
        description: "An all-in-one fitness, nutrition, and health tracking web application that integrates with Purdue dining menus",
        imageSrc: titanLogo,
        link: "https://github.com/youngbryanyu/titan-health-app",
    },
    {
        title: "Füdstops: Dining Recommendations for Students",
        time: "2022",
        description: "A dining court menu web application for Purdue students supporting features like recommendations, dietary preferences, ratings, popular menu items, search, filtering, and notifications",
        imageSrc: nosediveLogo,
        link: "https://github.com/youngbryanyu/fudstops",
    }
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
                    <Gallery activities={activities} />
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
                                <em className="font-semibold">Hi!</em>&nbsp; My name is Young Bryan Yu. I am pursuing a M.S. in Computer Science at Purdue University. I received my B.S. in Computer Science from Purdue University as well.
                            </p>
                        </div>
                    </Section>
                    <Section heading="Interests" headingAlignment="right">
                        <div className="flex flex-col gap-6">
                            <p>
                                I am interested in the following areas:
                            </p>
                            <ul className="list-decimal ml-10">
                                <li>Distributed Systems</li>
                                <li>Databases</li>
                                <li>Computing</li>
                            </ul>
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
                    <Section heading="Experience" headingAlignment="right">
                        <div className="flex flex-col w-full gap-8">
                            <p>Where I have worked. </p>
                            <Workplaces items={ventures} isAnimated />
                        </div>
                    </Section>
                    <Section heading="Education" headingAlignment="right">
                        <div className="flex flex-col w-full gap-8">
                            <p>
                            Where I have studied.
                {/* Dissertation: <i>Design Considerations of Information Systems Artifacts and Digital Platforms</i><br /> */}
              </p>
                            <Workplaces items={education} isAnimated />
                        </div>
                    </Section>
                    <Section heading="Awards" headingAlignment="right">
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
                    {/* <Section heading="Projects" headingAlignment="right">
                        <div className="flex flex-col w-full gap-8">
                            <p>Projects I have built.</p>
                            <Workplaces items={sideProjects} isAnimated />
                        </div>
                    </Section> */}
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