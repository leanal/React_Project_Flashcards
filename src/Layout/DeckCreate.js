import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

export default function DeckCreate() {
    const history = useHistory();
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");

    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const handleCancelClick = (event) => {
        event.preventDefault();
        history.push("/");
    };
    async function handleSubmitClick(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const newDeck = {
            name: name,
            description: description
        };
        const response = await createDeck(newDeck, abortController.signal);
        history.push(`/decks/${response.id}`)
    }
    return (
        <div>
          <Breadcrumb addText={"Create Deck"} />
          <h2 className="card-title">Create Deck</h2>
          <form name="add" onSubmit={handleSubmitClick}>
            <div className="form-group">
              <label htmlFor="front">Name</label>
              <input
                className="form-control"
                id="name" 
                type="text"
                name="name" 
                placeholder="Deck Name"
                required={true}
                onChange={handleNameChange}
                value={name}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="back">Description</label>
              <textarea
                className="form-control"
                id="description" 
                name="description" 
                placeholder="Brief description of the deck"
                required={true} 
                rows={4} 
                onChange={handleDescriptionChange}
                value={description}
              ></textarea>
            </div>
            <button type="button" className="btn btn-secondary" onClick={handleCancelClick}>Cancel</button><span>  </span>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    );
}