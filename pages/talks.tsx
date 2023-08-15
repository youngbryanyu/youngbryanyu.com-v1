import Link from "components/Link";
import Section from "components/Section";
import React, { useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { NextSeo } from "next-seo";
import { FullName, SiteURL } from "./about";
import { formatDate } from "../lib/formatdate";

const seoTitle = `Talks | ${FullName}`;
const seoDesc = `Invited talks and presentations.`;

export const talks = [
  {
    conference: "Conference in Information Systems and Technology (CIST)",
    title: "Large Language Model In Creative Work",
    location: "Phoenix, Arizona",
    date: "October 14, 2023"
  },
  {
    conference: "INFORMS Annual Meeting",
    title: "Large Language Model In Creative Work",
    location: "Phoenix, Arizona",
    date: "October 15, 2023"
  },
  {
    conference: "Business & Generative AI Workshop @ Wharton",
    title: "Large Language Model In Creative Work",
    location: "San Francisco, California",
    date: "September 8, 2023"
  },
  {
    conference: "International Conference on Information Systems (ICIS)",
    title: "Less is Not Always More: Investigating the Impact of Block Intensity and Immediacy of Social Media Blockers on Productivity",
    award: "Best Paper in General IS Track",
    location: "Copenhagen, Denmark",
    date: "December 13, 2022",
    link: "https://aisel.aisnet.org/icis2022/general_is/general_is/1/"
  },
  {
    conference: "Conference in Information Systems and Technology (CIST)",
    title: "Net Neutrality: Network Congestion, Social Welfare and Service Tiering Regulations",
    location: "Seattle, Washington",
    date: "October 19, 2019",
  },
  {
    conference: "Conference in Information Systems and Technology (CIST)",
    title: "Investigating the Coordination of Functionality Richness, First-party Content Quality, and Revenue-sharing on Digital Platforms",
    location: "Virtual",
    date: "November 8, 2020"
  },
  {
    conference: "Conference in Information Systems and Technology (CIST)",
    title: "Less is Not Always More: Investigating the Impact of Block Intensity and Immediacy of Social Media Blockers on Productivity",
    location: "Indianapolis, Indiana",
    date: "October 16, 2022"
  },
  {
    conference: "Workshop on Information Technologies and Systems (WITS)",
    title: "Less is Not Always More: Investigating the Impact of Block Intensity and Immediacy of Social Media Blockers on Productivity",
    award: "Best Student Paper Award",
    location: "Copenhagen, Denmark",
    date: "December 14, 2022",
    link: "https://witsconf.org/wits2022-awards/"
  },
  {
    conference: "Workshop on Information Technologies and Systems (WITS)",
    title: "Investigating the Coordination of Functionality Richness, First-party Content Quality, and Revenue-sharing on Digital Platforms",
    location: "Austin, Texas",
    date: "December 16, 2021"
  },
  {
    conference: "Symposium on Statistical Challenges in Electronic Commerce Research (SCECR)",
    title: "Attendance Tracking Apps Academic Performance: Evidence from a Field Study",
    location: "Virtual",
    date: "June 17, 2021"
  },
  {
    conference: "Symposium on Statistical Challenges in Electronic Commerce Research (SCECR)",
    title: "Less is Not Always More: Investigating the Impact of Block Intensity and Immediacy of Social Media Blockers on Productivity",
    location: "Madrid, Spain",
    date: "June 21, 2022"
  },
  {
    conference: "Platform Strategy Symposium",
    title: "Investigating the Coordination of Functionality Richness, First-party Content Quality, and Revenue-sharing on Digital Platforms",
    location: "Boston, Massachusetts",
    link: "https://www.youtube.com/watch?v=iQK2ZKabHdI",
    date: "July 19, 2022"
  },
  {
    conference: "Conference on Digital Experimentation (CoDE) @ MIT",
    title: "Less is Not Always More: Investigating the Impact of Block Intensity and Immediacy of Social Media Blockers on Productivity",
    location: "Boston, Massachusetts",
    date: "October 21, 2022"
  },
  {
    conference: "Americas Conference on Information Systems (AMCIS)",
    title: "Less is Not Always More: Investigating the Impact of Block Intensity and Immediacy of Social Media Blockers on Productivity",
    location: "Minneapolis, Minnesota",
    date: "August 13, 2022"
  },
  {
    conference: "INFORMS Annual Meeting",
    title: "Investigating the Coordination of Functionality Richness, First-party Content Quality , and Revenue-sharing on Digital Platforms",
    location: "Indianapolis, Indiana",
    date: "October 18, 2022"
  },
  {
    conference: "China Workshop on Economics of Information Systems Theory (CWEIST)",
    title: "Dynamics of User Preference in Broadband Market",
    location: "Virtual",
    date: "June 30, 2020"
  },
  {
    conference: "China Workshop on Economics of Information Systems Theory (CWEIST)",
    title: "Investigating the Coordination of Functionality Richness, First-party Content Quality, and Revenue-sharing on Digital Platforms",
    location: "Virtual",
    date: "June 28, 2021"
  },
  {
    conference: "Industry Studies Association (ISA) Annual Conference",
    title: "Less is Not Always More: Investigating the Impact of Block Intensity and Immediacy of Social Media Blockers on Productivity",
    location: "Philadelphia, Pennsylvania",
    date: "June 25, 2022"
  }
];

const pastTalks = talks.filter((talk) => new Date(talk.date) < new Date());
const futureTalks = talks.filter((talk) => new Date(talk.date) > new Date());

interface Talk {
  title: string;
  conference: string;
  date: string;
  location: string;
  link?: string;
  award?: string;
}

export function TalkList(talks: Talk[]) {
  return talks
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((talk) => (
      <li key={talk.title + talk.conference + talk.date}>
        <Section heading={formatDate(talk.date)}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h3>
                {talk.title}
                {talk.award &&
                  <span className="inline-block px-1.5 py-[1px] relative -top-[2px] font-bold ml-2 text-[10px] uppercase rounded-full brand-gradient text-white">
                    Award
                  </span>
                }
              </h3>
              {talk.award && <p className="text-secondary"><i>{talk.award}</i></p>}
              <p className="text-secondary">{talk.conference}</p>
              <p className="text-secondary">{talk.location}</p>
              {talk.link && <Link href={`${talk.link}`} underline>
                Read More
              </Link>}
            </div>
          </div>
        </Section>
      </li>
    ))
}

export default function Talks() {
  const [selectedConference, setSelectedConference] = useState('All Conferences');
  const conferences = ["All Conferences", ...new Set(talks.map(talk => talk.conference))];

  const filteredFutureTalks = selectedConference && (selectedConference != "All Conferences")
    ? futureTalks.filter(talk => talk.conference === selectedConference)
    : futureTalks;

  const filteredPastTalks = selectedConference && (selectedConference != "All Conferences")
    ? pastTalks.filter(talk => talk.conference === selectedConference)
    : pastTalks;

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDesc}
        openGraph={{
          title: seoTitle,
          url: `${SiteURL}/talks`,
          description: seoDesc,
          site_name: FullName
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <div className="flex flex-col gap-10 md:gap-10">
        <div className="">
          <h1>Talks</h1>
          <p
            className="text-secondary"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            Invited talks and presentations. <br></br>
          </p>
        </div>
        <div
          style={{ zIndex: 5 } as React.CSSProperties}
          className=""
        >
          <Listbox
            value={selectedConference}
            onChange={setSelectedConference}
          >
            <div className="relative">
              <Listbox.Button className="p-2 w-full overflow-auto max-h-60 w-42 rounded-xl backdrop-blur-lg ring-1 ring-gray-400 ring-opacity-20 text-sm focus:outline-none hover:bg-secondaryA transition-all">
                <span className="block truncate">
                  {selectedConference}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronUpDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Listbox.Options className="absolute mt-2 w-full p-2 overflow-auto text-base origin-top-right shadow-lg max-h-60 w-42 rounded-xl bg-blur backdrop-blur-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm scroll-smooth no-scrollbar">
                  {conferences.map(conference => (
                    <Listbox.Option
                      key={conference}
                      value={conference}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 rounded-md ${active ? "bg-secondaryA" : "text-primary"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`${selected ? 'font-medium' : 'font-normal'
                              } block truncate`}
                          >
                            {conference}
                          </span>
                          {selected && (
                            <span
                              className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary"
                            >
                              <CheckIcon className="w-5 h-5" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        {filteredFutureTalks.length > 0 && (
          <div
            className="flex flex-col gap-4"
            style={{ "--index": 2 } as React.CSSProperties}
          >
            <h2>Upcoming</h2>
            <ul className="flex flex-col gap-16">
              {TalkList(filteredFutureTalks)}
            </ul>
          </div>
        )}
        <div
          className="flex flex-col gap-4"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <h2>Past</h2>
          <ul className="flex flex-col gap-16">
            {filteredPastTalks.length > 0 && TalkList(filteredPastTalks)}
          </ul>
        </div>

      </div>
    </>
  );
}