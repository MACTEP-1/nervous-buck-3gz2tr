import React, { useEffect, useState, useRef } from "react";

const App = () => {
  const [flag, setFlag] = useState("");
  const [displayedFlag, setDisplayedFlag] = useState([]);
  const [loading, setLoading] = useState(true);
  const idxRef = useRef(0);

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const response = await fetch(
          "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/616e79"
        );

        if (!response.ok) {
          throw new Error("Error during fetch");
        }

        const data = await response.text();
        setFlag(data);
        setLoading(false);
      } catch (error) {
        console.error("Error during fetch: ", error);
        setLoading(false);
      }
    };

    fetchFlag();
  }, []);

  useEffect(() => {
    if (flag) {
      const chars = flag.split("");

      const displayNextChar = () => {
        const idx = idxRef.current;

        if (idx < chars.length) {
          //setDisplayedFlag((str) => [...str, chars[index]]);
          setDisplayedFlag((str) => str + chars[idx]);
          idxRef.current++;
          console.log(`Index: ${idx}, Character: ${chars[idx]}`);
        } else {
          clearInterval(interval);
        }
      };

      const interval = setInterval(displayNextChar, 500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [flag]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{displayedFlag}</div>;
};

export default App;

/* script to get the url:

const addr = [];
const els = document.querySelectorAll('code[data-class] > div[data-tag] > span[data-id] > i.char');

els.forEach(el => {
  const char = el.getAttribute('value');
  if (char && char !== '*') {
    addr.push(char);
  }
});

const result = addr.join('');
console.log(result);

*/
