import React, { useEffect, useState } from "react";
import "./App.css";
import { Link, Outlet, useParams } from "react-router-dom";

function App() {
  const [playlists, setPlaylists] = useState([]);
  const [playSongs, setPlaySongs] = useState([]);

  const { playlistId } = useParams();

  const getsetPlaylist = () => {
    // Afficher toutes les playlists
    fetch("http://localhost:1234/playlists/all").then(async (res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch playlists");
      }

      const data = await res.json();
      console.log(data);
      setPlaylists(data);
    });
  };

  const getsetSongs = () => {
    // Afficher tous les sons
    fetch("http://localhost:1234/songs/all").then(async (res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch songs");
      }

      const data = await res.json();
      console.log(data);
      setPlaySongs(data);
    });
  };

  function deletePlaylist(playlistId) {
    fetch(`http://localhost:1234/playlists/delete/${playlistId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error("Failed to delete playlist");
      }

      const data = await res.json();
      console.log(data);
      setPlaylists(data);
    });
  }

  useEffect(() => {
    getsetPlaylist();
    getsetSongs();
  }, []);

  return (
    <main>
      <div className="sidebar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
        <img src="src/assets/Spotify_Logo_RGB_White.png" alt="logo" />
        <img src="src/assets/meme.jpeg" alt="avatar" />
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">❄️LeJuice🥃</span>
        </a>

        <hr />

        <div className="button_AddPL">
          <Link to="/createPlaylist">
            <button>➕</button>
            <span>Add a playlist</span>
          </Link>
        </div>

        <h1>Mes playlists</h1>

        <ul className="nav nav-pills flex-column mb-auto">
          {playlists &&
            playlists.map((playlist) => {
              return (
                <>
                  <div className="Card_Playlist">
                    <li key={playlist._id}>
                      <Link to={`/playlist/${playlist._id}`}>
                        <span>{playlist.title}</span>
                      </Link>
                    </li>
                    <div className="buttonDelPlay">
                      <button onClick={() => deletePlaylist(playlist._id)}>
                        ❌
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
        </ul>
      </div>

      <div className="main-content">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
