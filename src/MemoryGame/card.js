import React from "react";

const CardState = {
  Closed: 0,
  Open: 1,
  Found: 2
};

function Card({ color, state, onClick, id }) {
  return (
    <div
      onClick={onClick(id)}
      className="MemoryCard"
      style={{
        backgroundImage: state
          ? null
          : `url(${"https://pbs.twimg.com/profile_images/1200751639/Silver-Skull-Mask_400x400.jpeg"})`,
        backgroundSize: "cover",
        backgroundColor: state ? color : null,
        border:
          state === CardState.Found
            ? "2px solid gold"
            : state === CardState.Open
            ? "2px solid white"
            : null
      }}
    >
      {state === CardState.Found ? (
        <img
          src="https://static.thenounproject.com/png/5051-200.png"
          height="20px"
          width="20px"
          alt="x_x"
        />
      ) : null}
    </div>
  );
}

export default Card;
export { CardState };
