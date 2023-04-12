import cn from "clsx";
import styles from "./messages.module.scss";

export const TailBreakdown = () => (
  <ol className={styles.list}>
    <li className={cn(styles.shared, styles.tailBreakdown)}>Hello</li>
  </ol>
);

interface Message {
  text: string;
  sent?: boolean;
}

function Messages({
  messages
}: {
  messages: Message[];
  type: "warning" | "info";
}): JSX.Element {
  return (
    <ol className={cn(styles.list, "not-prose")}>
      {messages.map(({ text, sent }, i) => {
        const isLast = i === messages.length - 1;
        const noTail = !isLast && messages[i + 1]?.sent === sent;
        return (
          <li
            key={text}
            className={cn(
              styles.shared,
              sent ? styles.sent : styles.received,
              noTail && styles.noTail
            )}
          >
            {text}
          </li>
        );
      })}
    </ol>
  )
}

// const Messages = (messages: Message[]): JSX.Element => (
  
// );

export default Messages;
