import React from "react";

export default function Breadcrumb({ deckId= null , deckName, addText }) {
  const text = (
    <li className="breadcrumb-item active" aria-current="page">
      {addText}
    </li>);
  const deckLink = (<>
    <li className="breadcrumb-item">
      <a href={`/decks/${deckId}`}>{deckName}</a>
    </li>
    </>);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">Home</a>
        </li>
        {deckName && deckLink}
        {addText && text}
      </ol>
    </nav>
  );
}
