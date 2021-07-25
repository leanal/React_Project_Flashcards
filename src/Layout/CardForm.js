import React from "react";
import { useHistory } from "react-router-dom";

export default function CardForm({ deckId, frontPlaceholder, backPlaceholder, front, back, frontChangeHandler, backChangeHandler, submitHandler }){
    const history = useHistory();
    const doneClickHandler = () => history.push(`/decks/${deckId}`);

  return (
    <form name="add" onSubmit={submitHandler}>
    <div className="form-group">
      <label htmlFor="front">Front</label>
      <textarea
        className="form-control"
        id="front" 
        name="front" 
        placeholder={frontPlaceholder}
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
        placeholder={backPlaceholder}
        required={true} 
        rows={2} 
        onChange={backChangeHandler}
        value={back}
      ></textarea>
    </div>
    <button type="button" className="btn btn-secondary" onClick={doneClickHandler}>Done</button><span>  </span>
    <button type="submit" className="btn btn-primary">Save</button>
  </form>
  );
}