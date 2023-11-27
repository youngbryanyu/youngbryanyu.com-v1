import Link from "components/Link";
import Section from "components/Section";
import React, { useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { NextSeo } from "next-seo";
import { FullName, SiteURL } from "./about";
import { formatDate } from "../lib/formatdate";
import Award from "../components/Award";
import { talks } from "../data/talks";

const seoTitle = `Talks | ${FullName}`;
const seoDesc = `Invited talks and presentations.`;

const pastTalks = talks.filter((talk) => new Date(talk.date) < new Date());
const futureTalks = talks.filter((talk) => new Date(talk.date) > new Date());

interface Talk {
  title: string;
  conference: string;
  date: string;
  location: string;
  link?: string;
  award?: string;
  invited?: boolean;
}

export function TalkList(talks: Talk[]) {
  return talks
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((talk) => (
      <li key={talk.title + talk.conference + talk.date}>
        <Section heading={talk.date + (talk.invited ? "*" : "")}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h3>
                {talk.title}
              </h3>
              
              {talk.award &&
                <p className="text-secondary">
                  <Award award={talk.award} />
                </p>
              }
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

const ALL_TALKS = "All Talks";
const INVITED_TALKS = "Invited Talks";

export default function Talks() {
  const [selectedConference, setSelectedConference] = useState(ALL_TALKS);
  const conferences = [ALL_TALKS, INVITED_TALKS, ...new Set(talks.flatMap((talk) => talk.invited ? [] : talk.conference))];

  const filteredFutureTalks = selectedConference && (selectedConference != ALL_TALKS)
    ? futureTalks.filter(talk => talk.conference === selectedConference || (selectedConference === INVITED_TALKS && talk.invited))
    : futureTalks;

  const filteredPastTalks = selectedConference && (selectedConference != ALL_TALKS)
    ? pastTalks.filter(talk => talk.conference === selectedConference || (selectedConference === INVITED_TALKS && talk.invited))
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
            Invited talks are marked with *<br/>
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
            <ul className="flex flex-col gap-8">
              {TalkList(filteredFutureTalks)}
            </ul>
          </div>
        )}
        {filteredPastTalks.length > 0 && (
          <div
            className="flex flex-col gap-4"
            style={{ "--index": 2 } as React.CSSProperties}
          >
            <h2>Past</h2>
            <ul className="flex flex-col gap-8">
              {TalkList(filteredPastTalks)}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}