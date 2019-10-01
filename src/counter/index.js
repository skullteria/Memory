import React, { useState } from "react";
import withLayout from "../HOCs/with-layout.js";
import CounterComponent from "./counter-component.js";

const apiUrl = "https://my.freenom.com/includes/domains/fn-available.php";

const chars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

const genWordlist = (chars, wordSize) => {
  let wordlist = [...chars];
  for (let i = 0; i < wordSize - 1; i++) {
    let newWordlist = [];
    for (let j = 0; j < wordlist.length; j++) {
      for (let k = 0; k < chars.length; k++) {
        newWordlist.push(wordlist[j] + chars[k]);
      }
    }
    wordlist = newWordlist;
  }
  return wordlist;
};

const pipe = (...fns) => x => fns.reduce(async (y, fn) => fn(await y), x);
const changeDomain = cb => e => cb(e.target.value);
const fetchDomains = domain =>
  fetch(apiUrl, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: `domain=${domain}&tld=`
  });
const getDomains = setState => domain => {
  pipe(
    fetchDomains,
    r => r.json(),
    r => r.free_domains,
    r => r.filter(e => e.status === "AVAILABLE" && e.type === "FREE"),
    r => r.map(({ domain, tld }) => domain + tld),
    r => r.length !== 0 && setState(prev => [...prev, ...r]),
    () => setTimeout(null, 200)
  )(domain);
};
function Counter() {
  const [domain, setDomain] = useState("qqqa");
  const [domains, setDomains] = useState([]);

  return (
    <CounterComponent
      onGetDomainClick={async e => {
        e.preventDefault();
        await genWordlist(chars, 4).forEach(getDomains(setDomains));
      }}
      domain={domain}
      domains={domains}
      onDomainChange={changeDomain(setDomain)}
    />
  );
}

export default Counter;
