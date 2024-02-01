import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardSong from "../composents/CardSong";

function SinglePlaylist() {
  const [playSongs, setPlaySongs] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("");

  const { playlistId } = useParams();

  function selectPlaylist(playlistId) {
    fetch(`http://localhost:1234/playlists/get/${playlistId}`).then(
      async (res) => {
        const data = await res.json();
        console.log(data);
        setPlaySongs(data.songs);
        setPlaylistTitle(data.title);
      }
    );
  }

  useEffect(() => {
    selectPlaylist(playlistId);
  }, [playlistId]);

  function deleteSongFromPlaylist(songId) {
    fetch(
      `http://localhost:1234/playlists/${songId}/delete-song/${playlistId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    ).then(async (res) => {
      const data = await res.json();
      selectPlaylist(playlistId);
    });
  }

  return (
    <>
      <div className="main-content">
        <h1>{playlistTitle}</h1>
        <ul className="list-group">
          {playSongs.map((playSong) => {
            return (
              <CardSong
                key={playSong._id}
                title={playSong.title}
                artiste={playSong.artiste}
                id={playSong._id}
                deleteSongFromPlaylist={deleteSongFromPlaylist}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default SinglePlaylist;
