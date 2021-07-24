import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { readCard } from "../utils/api/index";

export default function StudyCard({ cardIds, numberOfCards, deckName }) {
  const history = useHistory();
  const [flipped, setFlipped] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  let index = cardIndex + 1;
  const [cardId, setCardId] = useState(cardIds[cardIndex]);

  const [card, setCard] = useState({});

  useEffect(() => {
    setCard({})
    if (!cardId) return `cardId is ${cardId}`;
    const abortController = new AbortController();

    async function loadCard() {
      const cardFromApi = await readCard(cardId, abortController.signal)
      setCard(cardFromApi);
    }

    loadCard();
    
    return () => abortController.abort(); // cancels pending request
  }, [cardId]);

  const flipClickHandler = () => setFlipped(!flipped);

  function nextClickHandler() {
    setFlipped(!flipped);
    setCardIndex((prevIndex) => prevIndex + 1);

    // checks end of deck before api request
    if (index === cardIds.length) {
      const restart = window.confirm("\nRestart cards?\n\nClick 'cancel' to return to the home page.");

      setCardIndex(0);
      index = 0;
      if (restart) {
        setCardId(cardIds[index]);
      } 
      if (!restart) return history.push("/");
    }

    setCardId(cardIds[index]); // rerun API call with useEffect
  }

  const cardView = (
    <div className="card">
      <div className="card-body">
        <h5 className="card-text">
          Card {cardIndex + 1} of {numberOfCards}
        </h5>
        <p className="card-text">
          {flipped ? card.back : card.front}
        </p>
        <button type="button" className="btn btn-secondary" onClick={flipClickHandler} >
          Flip
        </button><span>  </span>
        {flipped && (<button type="button" className="btn btn-primary" onClick={nextClickHandler}>Next</button>)}
      </div>
    </div>
  );

  if (card !== {}) {
    return cardView;
  }
}
