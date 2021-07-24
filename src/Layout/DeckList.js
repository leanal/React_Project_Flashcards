import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api/index";
import { deleteDeck } from "../utils/api/index";
import { Link , useHistory } from "react-router-dom";

export default function DeckList() {
    const [decks, setDecks] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDecks() {
            const decksFromApi = await listDecks(abortController.signal)
            setDecks(decksFromApi);
        }

        loadDecks();

        return () => abortController.abort();
    }, []);

    if (decks === []) return "Empty decks.";

    function deleteClickHandler( deckId ) {
        const confirmDeletion = window.confirm("\nDelete this deck?\n\nYou will not be able to recover it.");

        if (!confirmDeletion) return history.push("/");

        const abortController = new AbortController();

        async function deleteThisDeck(){
            await deleteDeck(deckId, abortController.signal);
        }

        deleteThisDeck();

        window.location.reload();
    };

    return decks.map((deck) => {
        return (
        <div key={deck.id} className="card">
            <div className="card-body">
                <h2 className="card-title">{deck.name} - {deck.cards.length} cards</h2>
                <p className="card-text">{deck.description}</p>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link><span>  </span>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link><span>  </span>
                <button type="button" className="btn btn-danger" onClick={() => deleteClickHandler(deck.id)}>Delete</button>
            </div>
        </div>
        );
    });
}