import React, { useState, useEffect } from "react";

/**
 * Types out the word as list items in a list with 500ms delay between characters
 */
export const Typewriter: React.FC<{ word: string; delay?: number }> = ({
  word,
  delay = 500,
}) => {
  const [charNum, setCharNum] = useState<number>(0);

  // increase the character count by 1 every 500ms until we've reached the end of the word
  useEffect(() => {
    if (charNum < word.length) {
      const timeout = setTimeout(() => setCharNum(charNum + 1), delay);
      return () => clearTimeout(timeout);
    }
  }, [word, charNum, setCharNum, delay]);

  // build the list of characters that should be rendered
  const displayedCharacters = word.split("").slice(0, charNum);

  return (
    <ul style={{ display: "flex", flexDirection: "row", listStyle: "none" }}>
      {displayedCharacters.map((char: string, index: number) => {
        // typically I try to avoid using the array index in the key
        // but it's the source of uniqueness in this list
        // I've combined it with the character to ensure its continued uniqueness
        // is accurately handled should the value of the word prop change,
        // even if it's unlikely in this particular case
        return (
          <li style={{ paddingLeft: "5px" }} key={`${index}${char}`}>
            {char}
          </li>
        );
      })}
      {charNum < word.length && <li style={{ paddingLeft: "5px" }}>_</li>}
    </ul>
  );
};
