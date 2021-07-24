import { Link } from "react-router-dom";

export default function StudyNot({ numberOfCards, deckName , deckId }) {

  return (
    <div>
        <h3 className="card-text">Not enough cards.</h3>
        <p className="card-text">
          You need at least 3 cards to study. There are {numberOfCards} cards in
          this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">+ Add Card</Link>
    
    </div>
  );
}
