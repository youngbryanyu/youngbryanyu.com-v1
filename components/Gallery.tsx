import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import cn from "clsx";
import localFont from "@next/font/local";

import imageChicago from "public/gallery/chicago.jpg";
import imagePhotography from "public/gallery/photography.jpg";
import imageSedona from "public/gallery/sedona.jpg";
import imageAlviso from "public/gallery/alviso.jpg";
import { ReactNode } from "react";
import Activity, { ActivityType, SnowboardActivity } from "./Activity";
import Link from "./Link";
import Halo from "./Halo";

const ticketingFont = localFont({
  src: "../public/ticketing.woff2",
  display: "swap",
});

type PhotoProps = {
  src: StaticImageData | string;
  meta?: ReactNode;
  filename?: string;
  alt: string;
  width: number;
  height: number;
  rotate: number;
  left: number | string;
  index: number;
  flipDirection?: "left" | "right";
  children?: ReactNode;
};

export function Photo({
  src,
  alt,
  filename,
  width,
  height,
  rotate,
  left,
  index,
  flipDirection,
  meta,
  children,
}: PhotoProps) {
  const fileName =
    filename ||
    (typeof src !== "string" &&
      `${src.src.split("/").at(-1)?.split(".")[0]}.jpg`);
  const shared = "absolute h-full w-full rounded-2xl overflow-hidden";
  return (
    <motion.div
      className={`absolute mx-auto cursor-grab hover:before:block hover:before:w-[calc(100%+55px)] hover:before:h-[300px] hover:before:absolute hover:before:-top-8 hover:before:-left-7`}
      style={{ rotate: `${rotate}deg`, left, width, height, perspective: 1000 }}
      initial={{
        width,
        height,
        rotate: (rotate || 0) - 20,
        y: 200 + index * 20,
        x: index === 1 ? -60 : index === 2 ? -30 : index === 3 ? 30 : 60,
        opacity: 0,
      }}
      transition={{
        default: {
          type: "spring",
          bounce: 0.2,
          duration:
            index === 1 ? 0.8 : index === 2 ? 0.85 : index === 3 ? 0.9 : 1,
          delay: index * 0.15,
        },
        opacity: {
          duration: 0.7,
          ease: [0.23, 0.64, 0.13, 0.99],
          delay: index * 0.15,
        },
        scale: { duration: 0.12 },
      }}
      animate={{ width, height, rotate, y: 0, opacity: 1, x: 0 }}
      drag
      whileTap={{ scale: 1.1, cursor: "grabbing" }}
      whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      whileHover="flipped"
    >
      <motion.div
        className="relative w-full h-full shadow-md rounded-2xl will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ type: "spring", duration: 0.4 }}
        variants={{
          flipped: {
            scale: 1.1,
            rotateY: flipDirection === "right" ? -180 : 180,
            rotateX: 5,
          },
        }}
      >
        <div className={shared} style={{ backfaceVisibility: "hidden" }}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="absolute inset-0 object-cover w-full h-full bg-gray-400 pointer-events-none rounded-2xl"
            priority
          />
          {children}
        </div>
        <div
          className={cn(
            shared,
            "bg-[#FFFAF2] flex items-center rounded-2xl overflow-hidden"
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Halo strength={50} className="flex items-center">
            <span className="absolute w-[500px] h-[500px] rotate-[-20deg] bg-repeat bg-[length:280px] bg-[url('/photopaper.png')]" />
            <div className="z-[1] px-6">
              <div
                className={cn(
                  ticketingFont.className,
                  "flex flex-col gap-1 uppercase"
                )}
              >
                <p className="text-sm text-secondary">{fileName}</p>
                {meta && <p className="text-sm text-secondary">{meta}</p>}
              </div>
            </div>
          </Halo>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery({
  activities,
  lastActivity,
}: {
  activities: ActivityType[];
  lastActivity?: ActivityType;
  }) {
  const snowboardingActivities = activities.filter((activity) => activity.sport_type === "Snowboard");
  return (
    <>
      <section className="flex gap-4 h-[268px] relative">
        <Photo
          src={imageChicago}
          meta="2023"
          alt="Me in Chicago, by Young Bryan Yu"
          width={200}
          height={250}
          rotate={-6}
          left={-50}
          index={1}
          flipDirection="left"
        />
        <Photo
          src={imageSedona}
          meta="2022"
          alt="Me in Sedona, by Young Bryan Yu"
          width={180}
          height={240}
          rotate={6}
          left={140}
          index={2}
          flipDirection="left"
        />
        <Photo
          src={imagePhotography}
          meta="2021"
          alt={"Me with my camera, by Young Bryan Yu"}
          width={230}
          height={253}
          rotate={-6}
          left={313}
          index={3}
          flipDirection="left"
        />
        <Photo
          src={imageAlviso}
          meta="2020"
          alt="Me in Alviso, by Young Bryan Yu"
          width={220}
          height={240}
          rotate={6}
          left={500}
          index={4}
          flipDirection="left"
        />
        {/* <Photo
          src={imagePhotography}
          meta={
              snowboardingActivities.length ? (
                <span className="flex flex-col gap-3">
                  <span className="block">
                    {
                      snowboardingActivities[0].name.toString().split('-').at(-1)
                    }
                  </span>
                  <Link
                    href={`https://www.strava.com/activities/${activities[0].id}`}
                  >
                    See latest day on Strava ↗
                  </Link>
                </span>
              ) : "Snowboarding"
            }
            alt='Snowboarding'
            filename={`snowboarding.jpg`}
            width={270}
            height={225}
            rotate={-5.4}
            left={500}
            index={4}
            flipDirection="left"
          >
          {snowboardingActivities.length ? <SnowboardActivity activities={snowboardingActivities} /> : null}
        </Photo> */}
      </section>
    </>
  );
}
