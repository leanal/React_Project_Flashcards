import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck, readCard , updateCard } from "../utils/api/index";
import Breadcrumb from "./Breadcrumb";
import CardForm from "./CardForm";

export default function CardEdit() {
  const { deckId } = useParams();
  const { cardId } = useParams();
  const [ deck, setDeck ] = useState({});
  const [ card, setCard ] = useState({});
  const [ front, setFront ] = useState("");
  const [ back, setBack ] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    if (!deckId) return `deckId is ${deckId}`;
    async function loadDeck() {
        const deckFromApi = await readDeck(deckId, abortController.signal)
        setDeck(deckFromApi);
    }

    loadDeck();
  }, [deckId]);

  useEffect(() => {
    const abortController = new AbortController();

    if (!cardId) return `cardId is ${cardId}`;
    async function loadCard() {
        const cardFromApi = await readCard(cardId, abortController.signal)
        setCard(cardFromApi);
        setFront(cardFromApi.front);
        setBack(cardFromApi.back);
    }
    
    loadCard();
  }, [cardId]);

  const frontChangeHandler = (event) => setFront(event.target.value);
  const backChangeHandler = (event) => setBack(event.target.value);

  const submitHandler = async (event) => {
    event.preventDefault();
    
    const abortController = new AbortController();
    const updatedCard = {
        id: cardId,
        deckId: parseInt(deckId),
        front: front,
        back: back
    };
    await updateCard(updatedCard, abortController.signal);
 
    return () => abortController.abort();
  };

  return (
    <div>
      <Breadcrumb deckId={deckId} deckName={deck.name} addText={`Edit Card ${card.id}`} />
      <h2 className="card-title">Edit Card</h2>
      <CardForm 
        deckId={deckId} 
        frontPlaceholder={card.front} 
        backPlaceholder={card.back}
        front={front}
        back={back}
        frontChangeHandler={frontChangeHandler}
        backChangeHandler={backChangeHandler} 
        submitHandler={submitHandler}
      />
    </div>
  );
}
