import LaurelIcon from "./LaurelIcon";

export default function Award({ award, className = "" }: { award: string, className?: string }) {
  return (
    <>
      <span className="inline-block select-none mr-1 align-middle">
        <LaurelIcon></LaurelIcon>
      </span>{award}<span className="inline-block select-none ml-1 align-middle">
        <LaurelIcon className="transform -scale-x-100"></LaurelIcon>
      </span></>
  )
}