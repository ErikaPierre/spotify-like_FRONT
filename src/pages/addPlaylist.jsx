import { useState } from "react";

function AddPlaylist() {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");

  const createPlaylist = (e) => {
    e.preventDefault();

    fetch("http://localhost:1234/playlists/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: playlistName,
        description: playlistDescription,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
      });
  };

  return (
    <>
      <h1>Créez votre propre playliste</h1>
      <form onSubmit={createPlaylist}>
        <div className="mb-3">
          <label htmlFor="playlistTitle" className="form-label">
            Titre
          </label>
          <input
            type="text"
            className="form-control"
            id="playlistTitle"
            placeholder="Name of your playlist"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="playlistDescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="playlistDescription"
            placeholder="Description of your playlist"
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
            required
          />
        </div>
        <button className="button_create">Create</button>
      </form>
    </>
  );
}

export default AddPlaylist;
