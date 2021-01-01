import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Music.css";

function Music(props) {
  const remove = (artistName) => {
    let encodedArtistName = encodeURI(artistName);
    axios
      .delete(
        `https://garifunamusic.herokuapp.com/Music/${encodedArtistName}`,
        {
          artistName,
        }
      )
      .then(function (response) {
        alert("Artist has been deleted!");
        console.log(response);
      });
  };

  let musicList = props.musicList.map((album, i) => {
    return (
      <div className="col mb-4 mainBody">
        <div className="card" style={{ width: "18rem" }} key={i}>
          <img src={album.artwork} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{album.title}</h5>
            <p className="card-text">{album.artistName}</p>
            {/* <a className="btn btn-primary" href={`/updatemusic/${encodeURI(album.artistName)}`}>
              Update
            </a> */}
            <Link to={`/updatemusic/${encodeURI(album.artistName)}`}>
              Update
            </Link>
            <a
              href='/updatemusic/${encodeURI(album.artistName)}'
              className="btn btn-primary"
              onClick={() => remove(album.artistName)}
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    );
  });

  let filteredList = props.filteredList.map((album, i) => {
    return (
      <div className="col mb-4 mainBody">
        <div className="card" style={{ width: "18rem" }} key={i}>
          <img src={album.artwork} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{album.title}</h5>
            <p className="card-text">{album.artistName}</p>
            {/* <a className="btn btn-primary" href={`/updatemusic/${encodeURI(album.artistName)}`}>
              Update
            </a> */}
            <Link to={`/updatemusic/${encodeURI(album.artistName)}`}>
              Update
            </Link>
            <a
              className="btn btn-primary"
              onClick={() => remove(album.artistName)}
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="musicContainer">
      <div className="gariInfo">
        <h1>Garifuna Music</h1>
        <div className="info">
          <img
            src="https://www.womex.com/virtual/image/artist/the_garifuna_big_61532.jpg"
            // className="rounded float-left"
            alt="..."
          />
          <span>
            "Garifuna music is an ethnic music and dance with African and Arawak
            elements, originated by an Afro Indigenous group known as
            the Garifuna people, pre to their exile to Central
            America from Saint Vincent And The Grenadines. It represents and
            belongs to the Garifuna community. Garifuna music and dance are
            closely related. The main traditional instruments are drums
            and maracas. Drums play an important role in Garifuna music. The
            main drum is the Segunda (bass drum). The drums are normally made by
            hollowing out logs and stretching antelope skin over them. There are
            certain types of songs that are associated with work, some with
            play, some with dance and some that are reserved for prayer or
            ritual use. Two main Garifuna genres are punta and paranda. In 2001,
            Garifuna music, dance, and language was proclaimed as a Masterpiece
            of the Oral and Intangible Heritage of Humanity by UNESCO." - Source
            Wikipedia
          </span>
        </div>
      </div>
      <br />
      <br />
      <div className="row row-cols-3 row-cols-md-3">
        {/* Ternary  */}
        {props.artistSearch.length > 1 ? filteredList : musicList}
      </div>
    </div>
  );
}

export default Music;
