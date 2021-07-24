import React, { useState, useEffect } from "react";
import { Link, useParams , useHistory } from "react-router-dom";
import CardList from "./CardList";
import { readDeck, deleteDeck } from "../utils/api/index";
import Breadcrumb from "./Breadcrumb";

export default function DeckView() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            const deckFromAPI = await readDeck(deckId, abortController.signal);
            setDeck(deckFromAPI);
        }

        loadDeck();

        return () => abortController.abort();
    }, [deckId] );

    const deckName = deck.name;

    function deleteClickHandler() {
        const confirmDeletion = window.confirm("\nDelete this deck?\n\nYou will not be able to recover it.");

        if (!confirmDeletion) return history.push(`/decks/${deckId}`);

        const abortController = new AbortController();

        async function deleteThisDeck(){
            await deleteDeck(deckId, abortController.signal);
        }

        deleteThisDeck();

        window.location.reload();
    };
    
    return (
        <div>
            <Breadcrumb addText={deckName} />
            <h3 className="card-text">{deckName}</h3>
            <p className="card-text">{deck.description}</p>
            <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit</Link><span>  </span>
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary">Study</Link><span>  </span>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">+ Add Card</Link><span>  </span>
            <button type="button" className="btn btn-danger" onClick={() => deleteClickHandler()}>Delete</button>
            <br />
            <br />
            <h2>Cards</h2>
            <CardList cards={deck.cards} deckId={deck.id} />
        </div>
      );
};