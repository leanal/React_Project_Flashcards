import React from "react";
import { Link } from "react-router-dom";
import DeckList from "./DeckList";

export default function Home() {
    return (
        <div>
            <Link to="/decks/new" className="btn btn-secondary">+ Create Deck</Link>
            <p></p>
            <DeckList />
        </div>
    );
}