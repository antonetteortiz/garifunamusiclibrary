import React, { useEffect, useState } from "react";
import { Link, Route, Switch, Redirect } from "react-router-dom";
// import { Navbar } from "reactstrap";
import "./App.css";
import Music from "./components/Music";
import Musicinfo from "./components/Musicinfo";
import CreateMusic from "./components/CreateMusic";
import UpdateMusic from "./components/UpdateMusic";

function App() {
  // In react hooks this is how we set state
  // The first agrument is the name of the state, second argument is how we manipulate that state
  // Anything passed in useState is the default value of that state
  const [music, setMusic] = useState([]);
  const [artistSearch, setArtistSearch] = useState("");
  // UseEffect works similarily to componentDidMount
  useEffect(() => {
    let apiUrl = "https://garifunamusic.herokuapp.com/Music";
    fetch(apiUrl)
      .then((data) => data.json())
      .then((music) => setMusic(music));

    // Empty array bracket will only run useEffect once, because we are fetching
    //Argument passed here is saying everytime our argument changes the API will be called.
  }, [music]);

  const searchArtist = (e) => {
    // e.preventDefault()
    setArtistSearch(e.target.value);
    if (artistSearch.length > 1) {
      let newArtistArr = music.filter((input) =>
        input.artistName.toLowerCase().includes(artistSearch)
      );
      console.log(newArtistArr);
      setMusic(newArtistArr);
    } else {
      let apiUrl = "https://garifunamusic.herokuapp.com/Music";
      fetch(apiUrl)
        .then((data) => data.json())
        .then((music) => setMusic(music));
    }
  };

  // console.log(music)

  return (
    <div className="body">
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Flag_of_Garifuna.svg"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
            loading="lazy"
          />
          <Link to="/"> GariMusic </Link>
          <Link to="/createmusic"> Create Artist </Link>
        </a>

        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Enter Artist Name"
            // aria-label="Search"
            value={artistSearch}
            onChange={searchArtist}
          />

          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={() => searchArtist()}
          >
            Search
          </button>
        </form>
      </nav>

      <main>

        <Switch>
          {music.length !== 0 ?
        
          <Route
            path="/"
            render={() => {
              return <Music musicList={music} />;
            }}
          /> : null }


          {music.length !== 0 ? 
          
            <Route
              exact
              path="/music/:id"
              render={(routerProps) => {
                let music = music.filter(
                  (music) => music.id == routerProps.match.params.id
                );
                return <Musicinfo musicList={music} />;
              }}
            />
           : null}

          <Route
            exact
            path="/createmusic"
            render={() => {
              return <CreateMusic />;
            }}
          />
          <Route
            exact
            path="/updatemusic/:artistName"
            render={() => {
              return <UpdateMusic music={music} />;
            }}
          />
        </Switch>
      </main>
      {/* <Link to="/createmusic">
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="button"
          aria-pressed="false"
        >
          Create Album
        </button>
      </Link> */}
    </div>
  );
}

export default App;
