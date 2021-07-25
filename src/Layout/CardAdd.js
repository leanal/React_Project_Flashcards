import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import Breadcrumb from "./Breadcrumb";
import CardForm from "./CardForm";

export default function CardAdd() {
  const { deckId } = useParams();
  const [ deck, setDeck ] = useState({});
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
  
  const deckName = deck.name;
  const frontChangeHandler = (event) => setFront(event.target.value);
  const backChangeHandler = (event) => setBack(event.target.value);
  const saveHandler = (event) => {
    event.preventDefault();
    const newCard = {
        deckId: deckId,
        front: front,
        back: back
    }
    createCard(deckId, newCard)
    setFront("");
    setBack("");
  };

  return (
    <div>
      <Breadcrumb deckId={deckId} deckName={deckName} addText={"Add Card"} />
      <h2 className="card-title">{deckName}: Add Card</h2>
      <CardForm 
        deckId={deckId}
        frontPlaceholder={"Front side of card"} 
        backPlaceholder={"Back side of card"} 
        front={front}
        back={back}
        frontChangeHandler={frontChangeHandler}
        backChangeHandler={backChangeHandler}
        submitHandler={saveHandler} 
      />
    </div>
  );
}
