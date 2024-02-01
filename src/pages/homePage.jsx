import { useEffect, useState } from "react";
import CardSong from "../composents/CardSong";
import { Link } from "react-router-dom";

function HomePage() {
  const [currentPlay, setCurrentPlay] = useState([]);
  const [playSongs, setPlaySongs] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("");

  const getsetSongs = () => {
    // Avoir toutes les musiques
    fetch("http://localhost:1234/songs/all").then(async (res) => {
      const data = await res.json();
      console.log(data);
      setPlaySongs(data);
      setPlaylistTitle(data.title);
    });
  };

  function deleteSongFromPlaylist(songId) {
    // Supprimer une musique d'une playliste
    const currentPlaylistId = currentPlay._id;
    fetch(
      `http://localhost:1234/playlists/${songId}/delete-song/${currentPlaylistId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (res) => {
      const data = await res.json();
      console.log(data);
      selectPlaylist(currentPlay);
    });
  }

  function deleteSong(songId) {
    // Supprimer une musique de la liste principale
    fetch(`http://localhost:1234/songs/removesong/${songId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const data = await res.json();
      console.log(data);
      setPlaySongs(data);
    });
  }

  useEffect(() => {
    getsetSongs();
  }, []);

  return (
    <>
      <div className="button_AddSg">
        <Link to="/createSong">
          <button id="buttonAddSong">➕ Add a song</button>
        </Link>
      </div>

      <h1>{playlistTitle}</h1>
      <ul className="list-group">
        {playSongs.map((playSong) => {
          return (
            <CardSong
              key={playSong._id}
              title={playSong.title}
              artiste={playSong.artiste}
              id={playSong._id}
              // deleteSongFromPlaylist={deleteSongFromPlaylist}
              deleteSong={deleteSong}
            />
          );
        })}
      </ul>
    </>
  );
}

export default HomePage;
