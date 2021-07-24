import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, readCard , updateCard } from "../utils/api/index";
import Breadcrumb from "./Breadcrumb";

export default function CardEdit() {
  const { deckId } = useParams();
  const { cardId } = useParams();
  const history = useHistory();
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
  }, []);

  const frontChangeHandler = (event) => setFront(event.target.value);
  const backChangeHandler = (event) => setBack(event.target.value);
  const cancelClickHandler = () => history.push(`/decks/${deckId}`);

  async function submitHandler() {
    const abortController = new AbortController();
    const updatedCard = {
        id: cardId,
        front: front,
        back: back
    }
    const apiUpdate = await updateCard(updatedCard, abortController.signal)
    console.log("apiUpdate",apiUpdate)
    // setCard(apiUpdate)
    // setFront(apiUpdate.front);
    // setBack(apiUpdate.back);
    return () => abortController.abort();
  };

  return (
    <div>
      <Breadcrumb deckId={deckId} deckName={deck.name} addText={`Edit Card ${card.id}`} />
      <h2 className="card-title">Edit Card</h2>
      <form name="add" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front" 
            name="front" 
            placeholder={card.front}
            required={true} 
            rows={2} 
            onChange={frontChangeHandler}
            value={front}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back" 
            name="back" 
            placeholder={card.back}
            required={true} 
            rows={2} 
            onChange={backChangeHandler}
            value={back}
          ></textarea>
        </div>
        <button type="button" className="btn btn-secondary" onClick={cancelClickHandler}>Cancel</button><span>  </span>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
