import React, { useState, useEffect } from "react";
import Card, { CardState } from "./card.js";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const colors = [
  "AliceBlue",
  "AntiqueWhite",
  "Aqua",
  "Aquamarine",
  "Azure",
  "Beige",
  "Bisque",
  "BlanchedAlmond",
  "Blue",
  "BlueViolet",
  "Brown",
  "BurlyWood",
  "CadetBlue",
  "Chartreuse",
  "Chocolate",
  "Coral",
  "CornflowerBlue",
  "Cornsilk",
  "Crimson",
  "Cyan",
  "DarkBlue",
  "DarkCyan",
  "DarkGoldenRod",
  "DarkGray",
  "DarkGrey",
  "DarkGreen",
  "DarkKhaki",
  "DarkMagenta",
  "DarkOliveGreen",
  "DarkOrange",
  "DarkOrchid",
  "DarkRed",
  "DarkSalmon",
  "DarkSeaGreen",
  "DarkSlateBlue",
  "DarkSlateGray",
  "DarkSlateGrey",
  "DarkTurquoise",
  "DarkViolet",
  "DeepPink",
  "DeepSkyBlue",
  "DimGray",
  "DimGrey",
  "DodgerBlue",
  "FireBrick",
  "FloralWhite",
  "ForestGreen",
  "Fuchsia",
  "Gainsboro",
  "GhostWhite",
  "Gold",
  "GoldenRod",
  "Gray",
  "Grey",
  "Green",
  "GreenYellow",
  "HotPink",
  "IndianRed",
  "Indigo",
  "Ivory",
  "Khaki",
  "Lavender",
  "LavenderBlush",
  "LawnGreen",
  "LemonChiffon",
  "LightBlue",
  "LightCoral",
  "LightCyan",
  "LightGoldenRodYellow",
  "LightGray",
  "LightGrey",
  "LightGreen",
  "LightPink",
  "LightSalmon",
  "LightSeaGreen",
  "LightSkyBlue",
  "LightSlateGray",
  "LightSlateGrey",
  "LightSteelBlue",
  "LightYellow",
  "Lime",
  "LimeGreen",
  "Linen",
  "Magenta",
  "Maroon",
  "MediumAquaMarine",
  "MediumBlue",
  "MediumOrchid",
  "MediumPurple",
  "MediumSeaGreen",
  "MediumSlateBlue",
  "MediumSpringGreen",
  "MediumTurquoise",
  "MediumVioletRed",
  "MidnightBlue",
  "MintCream",
  "MistyRose",
  "Moccasin",
  "NavajoWhite",
  "Navy",
  "OldLace",
  "Olive",
  "OliveDrab",
  "Orange",
  "OrangeRed",
  "Orchid",
  "PaleGoldenRod",
  "PaleGreen",
  "PaleTurquoise",
  "PaleVioletRed",
  "PapayaWhip",
  "PeachPuff",
  "Peru",
  "Pink",
  "Plum",
  "PowderBlue",
  "Purple",
  "RebeccaPurple",
  "Red",
  "RosyBrown",
  "RoyalBlue",
  "SaddleBrown",
  "Salmon",
  "SandyBrown",
  "SeaGreen",
  "SeaShell",
  "Sienna",
  "Silver",
  "SkyBlue",
  "SlateBlue",
  "SlateGray",
  "SlateGrey",
  "Snow",
  "SpringGreen",
  "SteelBlue",
  "Tan",
  "Teal",
  "Thistle",
  "Tomato",
  "Turquoise",
  "Violet",
  "Wheat",
  "Yellow",
  "YellowGreen"
];

const rndIndex = max => Math.floor(Math.random() * max);
const rndColor = colors => () => colors[rndIndex(colors.length)];
const getUniqueColor = () => {
  const chosen = [];
  return colors => {
    let color = rndColor(colors)();
    while (chosen.includes(color)) {
      color = rndColor(colors)();
    }
    chosen.push(color);
    return color;
  };
};

function genCardColors(colors, pairsCount) {
  let cards = new Array(pairsCount || 5).fill();
  const uniqueColorsInstance = getUniqueColor();
  cards = cards.map(e => uniqueColorsInstance(colors));
  cards = cards.concat(cards);
  shuffle(cards);
  return cards;
}

function closeOpenCards(setCards) {
  return () =>
    setCards(prevCards => {
      const openCards = prevCards.filter(
        ({ state }) => state === CardState.Open
      );
      if (openCards[0].color === openCards[1].color) {
        return prevCards.map(e =>
          e.state === CardState.Open && openCards.some(e2 => e2.id === e.id)
            ? { ...e, state: CardState.Found }
            : e
        );
      }
      return prevCards.map(e =>
        e.state === CardState.Open ? { ...e, state: CardState.Closed } : e
      );
    });
}
function onCardClick(setCards) {
  return id => () =>
    setCards(prevCards => {
      return prevCards.map(e => {
        if (e.id !== id || e.state !== CardState.Closed) return e;

        const openCards = prevCards.filter(
          ({ state }) => state === CardState.Open
        );
        if (openCards.length === 2) return e;
        if (openCards.length === 0) return { ...e, state: CardState.Open };
        setTimeout(closeOpenCards(setCards), 300);
        return { ...e, state: CardState.Open };
      });
    });
}

function restartGame(setCards, cardPairs) {
  return () => setCards(genCards(cardPairs));
}

function genCards(cardPairs) {
  return genCardColors(colors, cardPairs || 5).map((e, i) => ({
    id: i,
    color: e,
    state: CardState.Closed
  }));
}

const onCardPairsChange = setCardPairs => e =>
  !isNaN(e.target.value) ? setCardPairs(Number(e.target.value)) : null;

function MemoryGame(props) {
  const [cards, setCards] = useState(genCards);
  const [cardPairs, setCardPairs] = useState(5);

  return (
    <>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Card Pairs
          </span>
        </div>
        <input
          className="form-control"
          type="text"
          value={cardPairs}
          onChange={onCardPairsChange(setCardPairs)}
        />
        <button
          className="btn btn-primary"
          onClick={restartGame(setCards, cardPairs)}
        >
          Restart
        </button>
      </div>
      <div className="MemoryBoard">
        {cards.map(e => (
          <Card onClick={onCardClick(setCards)} key={e.id} {...e} />
        ))}
      </div>
      {cards.every(e => e.state === CardState.Found) ? (
        setTimeout(restartGame(setCards, cardPairs), 1000) ? (
          <div
            className="alert alert-success"
            style={{
              position: "fixed",
              top: "15%",
              left: "50%",
              zIndex: 999
            }}
            role="alert"
          >
            Well Done!
          </div>
        ) : null
      ) : null}
    </>
  );
}

export default MemoryGame;
