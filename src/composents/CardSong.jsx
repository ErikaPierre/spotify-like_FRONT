import { useState } from "react";

function CardSong(props) {
  const [count, setCount] = useState(0);

  function Count() {
    setCount(count + 1);
  }

  function onDeleteClick(songId) {
    props.deleteSongFromPlaylist(songId);
  }

  function onClickDelete(songId) {
    props.deleteSong(songId);
  }

  return (
    <div className="Card_Song">
      <li className="list-group" aria-current="true" key={props.title}>
        {props.title} - {props.artiste}
      </li>
      <div className="buttonsDelLik">
        <span>{count}</span>
        <button onClick={Count}>❤️</button>
        {/* <button onClick={() => onDeleteClick(props.id)}>❌</button> */}
        <button onClick={() => onClickDelete(props.id)}>❌</button>
      </div>
    </div>
  );
}

export default CardSong;
