import Link from "components/Link";
import Image, { StaticImageData } from "next/image";
import { Fragment } from "react";

type Workplace = {
    title: string;
    description: string;
    imageSrc: string | StaticImageData;
    time?: string;
    link?: string;
};

function Workplace({ title, description, imageSrc, time, link }: Workplace) {
    const content = (
        <>
            <div className="flex items-center gap-4">
                <Image
                    src={imageSrc}
                    alt={description}
                    width={48}
                    height={48}
                    className="rounded-full"
                />
                <div className="flex flex-col gap-px">
                    <p className={link ? "external-arrow" : ""}>{title}</p>
                    {/* <p className="text-secondary">{description}</p> */}
                    <div className="text-secondary">
                        {description.split('\n').map((line, index) => (
                            <Fragment key={index}>
                                {line}
                                <br />
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
            {time && <p className="text-secondary">{time}</p>}
        </>
    );
    return (
        <li className="" key={description}>
            {link ? (
                <Link
                    href={link}
                    className="flex justify-between w-full no-underline"
                >
                    {content}
                </Link>
            ) : (
                <div className="flex justify-between w-full">{content}</div>
            )}
        </li>
    );
}

export default function Workplaces({ items, isAnimated }: { items: Workplace[], isAnimated?: boolean }) {
    return (
        <ul className={`flex flex-col gap-8 ${isAnimated ? 'animated-list' : ''}`}>
            {items.map(Workplace)}
        </ul>
    );
}
