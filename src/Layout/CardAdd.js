import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import Breadcrumb from "./Breadcrumb";

export default function CardAdd() {
  const { deckId } = useParams();
  const history = useHistory();
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
  const doneClickHandler = () => history.push(`/decks/${deckId}`);
  const saveHandler = (event) => {
    event.preventDefault();
    const newCard = {
        deckId: deckId,
        front: front,
        back: back
    }
    console.log("newCard",newCard)
    createCard(deckId, newCard)
    setFront("");
    setBack("");
  };

  return (
    <div>
      <Breadcrumb deckId={deckId} deckName={deckName} addText={"Add Card"} />
      <h2 className="card-title">{deckName}: Add Card</h2>
      <form name="add" onSubmit={saveHandler}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front" 
            name="front" 
            placeholder="Front side of card"
            required={true} 
            rows={2} 
            onChange={frontChangeHandler}
            value={front}
          ></textarea>front
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back" 
            name="back" 
            placeholder="Back side of card"
            required={true} 
            rows={2} 
            onChange={backChangeHandler}
            value={back}
          ></textarea>
        </div>
        <button type="button" className="btn btn-secondary" onClick={doneClickHandler}>Done</button><span>  </span>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
}
