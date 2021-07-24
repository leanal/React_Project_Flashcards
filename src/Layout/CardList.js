import React from "react";
import { Link } from "react-router-dom";
import { deleteCard } from "../utils/api";

export default function CardList({ cards, deckId }) {
  if (!cards) return `cards is ${cards}`;
  if (!deckId) return `deckId is ${deckId}`;

  function deleteClickHandler(cardId) {
    const abortController = new AbortController();

    async function deleteThisCard() {
      const confirmDeletion = window.confirm("Delete this card?\n\nYou will not be able to recover it.");

      if (confirmDeletion) {
        const deletedApi = await deleteCard(cardId, abortController.signal);
        console.log(deletedApi);
      }
    }

    deleteThisCard();
    window.location.reload()
  }

  return cards.map((card, index) => {
    return (
      <div key={index} className="card">
        <div className="card-body">
          <div className="row">
            <h5 className="col card-text">{card.front}</h5>
            <h5 className="col card-text">{card.back}</h5>
          </div>
          <div className="row">
            <Link
              to={`/decks/${deckId}/cards/${card.id}/edit`}
              className="btn btn-secondary mr-1"
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteClickHandler(card.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });
}
