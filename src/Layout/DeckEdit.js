import React, { useEffect, useState } from "react";
import { useParams , useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

export default function DeckEdit() {
    const { deckId } = useParams();
    const history = useHistory();
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            const deckFromApi = await readDeck(deckId, abortController.signal);
            setName(deckFromApi.name);
            setDescription(deckFromApi.description);
        };

        loadDeck();

        return () => abortController.abort();
    }, [deckId]);

    const nameChangeHandler = (event) => setName(event.target.value);
    const descriptionChangeHandler = (event) => setDescription(event.target.value);
    const cancelClickHandler = () => history.push(`/decks/${deckId}`);
    
    async function submitClickHandler() {
        const abortController = new AbortController();
        const updatedDeck = {
            id: deckId,
            name: name,
            description: description
        };

        const apiUpdate = await updateDeck(updatedDeck, abortController.signal);
        console.log("apiUpdate",apiUpdate)

        return () => abortController.abort();
    };
    
    return (
        <div>
          <Breadcrumb deckId={deckId} deckName={name} addText={"Edit Deck"} />
          <h2 className="card-title">Edit Deck</h2>
          <form name="add" onSubmit={submitClickHandler}>
            <div className="form-group">
              <label htmlFor="front">Name</label>
              <input
                className="form-control"
                id="name" 
                type="text"
                name="name" 
                required={true}
                onChange={nameChangeHandler}
                value={name}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="back">Description</label>
              <textarea
                className="form-control"
                id="description" 
                name="description" 
                required={true} 
                rows={4} 
                onChange={descriptionChangeHandler}
                value={description}
              ></textarea>
            </div>
            <button type="" className="btn btn-secondary" onClick={cancelClickHandler}>Cancel</button><span>  </span>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    );
}