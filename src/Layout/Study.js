import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import StudyCard from "./StudyCard";
import StudyNot from "./StudyNot";
import Breadcrumb from "./Breadcrumb";

export default function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeck() {
      const deckFromApi = await readDeck(deckId, abortController.signal)
      setDeck(deckFromApi);
    }

    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  const cards = deck.cards;
  const deckName = deck.name;

  if (cards) {
    const cardIds = cards.map((card) => card.id);

    const checkNumberOfCards =
      cards.length > 2 ? (
        <StudyCard
          cardIds={cardIds}
          numberOfCards={cards.length}
          deckName={deckName}
        />
      ) : (
        <StudyNot numberOfCards={cards.length} deckName={deckName} deckId={deck.id} />
      );

    return (
      <div>
        <Breadcrumb deckId={deckId} deckName={deckName} addText={"Study"} />
        <h2 className="card-title">Study: {deckName}</h2>
        {checkNumberOfCards}
      </div>
    );
  }

  return "Loading...";

}
