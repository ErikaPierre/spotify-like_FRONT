import { useState } from "react";

function AddSong() {
  const [songName, setSongName] = useState("");
  const [songArtisteName, setSongArtisteName] = useState("");

  const createSong = (e) => {
    e.preventDefault();

    fetch("http://localhost:1234/songs/createsong", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: songName,
        artiste: songArtisteName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
      });
  };

  return (
    <>
      <h1>Ajouter votre propre son</h1>
      <form onSubmit={createSong}>
        <div className="mb-3">
          <label htmlFor="songTitle" className="form-label">
            Titre
          </label>
          <input
            type="text"
            className="form-control"
            id="songTitle"
            placeholder="Name of your playlist"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="artisteName" className="form-label">
            Artiste
          </label>
          <input
            type="text"
            className="form-control"
            id="artisteName"
            placeholder="Name of the artiste"
            value={songArtisteName}
            onChange={(e) => setSongArtisteName(e.target.value)}
            required
          />
        </div>
        <button className="button_create">Create</button>
      </form>
    </>
  );
}

export default AddSong;
