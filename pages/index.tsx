import { GetStaticProps } from "next";
import { allPosts, allProjects, allPublications, Post, Project, Publication } from ".contentlayer/generated";
import { pick } from "lib/pick";

import Link from "components/Link";
import Section from "components/Section";
import PostList from "components/postlist";

import { Photo } from "components/Gallery";
import headshot from "../public/headshot.jpeg";
import { FullName } from "./about";
import { TalkList } from "./talks";
import Award from "../components/Award";
import { talks } from "../data/talks";

const futureTalks = talks.filter((talk) => new Date(talk.date) > new Date());

type HomeProps = {
  posts: Post[];
  projects: Project[];
  publications: Publication[];
};

export default function Home({ posts, projects, publications }: HomeProps) {
  return (
    <>
      <div className="flex flex-col gap-20 md:gap-16">
        <div>
          <h1 className="">{`Young Bryan Yu`}</h1>
          <p
            className="text-secondary max-w-md"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            Software Engineer Intern @ KeyByte LLC<br />
            M.S. in Computer Science @ Purdue University<br />
            <br />
            I am interested in distributed systems, databases, and computing.
            <br />
            <br />
            <Link href="https://drive.google.com/file/d/1p-FvixBI4vU1n9HNTT0J_pcvMgQ7EQg-/view?usp=sharing" >Resume</Link>
          </p>
        </div>
        <div className="right-0 -mt-20 overflow-hidden hidden md:block">
          <div className="-mt-[230px]">
            <Photo
              src={headshot}
              meta={
                <span className="flex flex-col gap-3">
                  <span className="block">
                    2021-04-21 <br />PHOTO BY JASON KWOK
                  </span>
                  <Link
                    href={`/about`}
                  >
                    {`More photos ↗`}
                  </Link>
                </span>
              }
              alt="Headshot"
              width={180}
              height={240}
              rotate={6.3}
              left="calc(50% + 10rem)"
              index={1}
              flipDirection="left"
            />
          </div>
        </div>
        {futureTalks.length > 0 && (
        <div
          className="flex flex-col gap-8 animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <h2>Upcoming Talks</h2>
          <ul className="flex flex-col gap-8">
            {TalkList(futureTalks)}
          </ul>
        </div>
        )}
        <div
          className="flex flex-col gap-8 animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <h2>Working projects</h2>
          <ul className="flex flex-col gap-8">
            {projects.map((project) => (
              <li key={project.title} className="animate-in">
                <Section heading={project.time}>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <h3>{project.title}</h3>
                      <p className="text-secondary">{project.description}</p>
                      {project.awards && 
                        project.awards.map((award: string) => (
                          <p key={award} className="text-secondary">
                            <Award award={award} />
                          </p>
                        ))
                      }
                      <Link href={`/project/${project.slug}`} underline>
                        Read More
                      </Link>
                    </div>
                    {/* <Link href={`/project/${project.slug}`}>
                      {project.slug === "tracklib" && <TracklibGraphic />}
                      {project.slug === "bitrefill" && <BitrefillGraphic />}
                      {project.slug === "trailroutes" && <TrailRoutesGraphic />}
                    </Link> */}
                  </div>
                </Section>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="flex flex-col gap-8 animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <h2>Recent publications</h2>
          <ul className="flex flex-col gap-8">
            {publications.map((publication) => (
              <li key={publication.title} className="animate-in">
                <Section heading={publication.publishedAt}>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <h3>{publication.title}</h3>
                      <p className="text-secondary">{publication.description}</p>
                      <p className="text-primary"><i>{publication.journal}</i>{ publication.forthcoming && ", Forthcoming"}</p>
                      {publication.awards && 
                        publication.awards.map((award: string) => (
                          <p key={award} className="text-secondary">
                            <Award award={award} />
                          </p>
                        ))
                      }
                      <span>
                        <Link href={`/publication/${publication.slug}`} underline>
                          Abstract
                        </Link>
                      </span>
                      {!publication.forthcoming && (
                        <span>
                          <Link href={`/publication/${publication.url}`} underline>
                            Link to {publication.journal}
                          </Link>↗
                        </span>
                      )}

                      
                      
                    </div>
                    {/* <Link href={`/project/${project.slug}`}>
                      {project.slug === "tracklib" && <TracklibGraphic />}
                      {project.slug === "bitrefill" && <BitrefillGraphic />}
                      {project.slug === "trailroutes" && <TrailRoutesGraphic />}
                    </Link> */}
                  </div>
                </Section>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="flex flex-col items-start gap-8 animate-in"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          <h2>Recent blog posts</h2>
          <PostList posts={posts} />
          <Link href="/blog" className="items-start underline text-secondary">
            Read all posts
          </Link>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .filter((_, i) => i < 4)
    .map((post) => pick(post, ["slug", "title", "publishedAt", "image"]))
  
  const projects = allProjects
    .sort((a, b) => parseInt(b.time.slice(0, 4)) - parseInt(a.time.slice(0, 4)))
    .map((post) =>
    pick(post, ["slug", "title", "description", "time", "awards"])
  );

  const publications = allPublications
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return {
    props: { posts, projects, publications },
  };
};
