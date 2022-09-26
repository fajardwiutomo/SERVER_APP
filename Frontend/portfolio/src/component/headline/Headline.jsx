import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./headline.css";

export const Headline = () => {
  const [movie, setMovie] = useState([]);
  const [data, setData] = useState([]);

  const fetchNowPlaying = async () => {
    const response = await axios.get("http://localhost:3000/now-playing");
    setMovie(response.data.results[3]);
  };


  useEffect(() => {
    fetchNowPlaying();
  }, []);
  return (
    <div className="container-headline">
      <div
        className="container-inner-headline"
        style={{
          backgroundImage:
            "url(" +
            `https://image.tmdb.org/t/p/w500${movie?.poster_path}` +
            ")",
          backgroundSize: "cover",
        }}
      >
        <div className="items-headline">
          <h1 className="title">{movie.title}</h1>
          <span className="description">{movie.overview}</span>
          {/* <div className="Button">
            <button className="watch">
              <a
                target="_blank"
                href={`https://www.youtube.com/watch?v=${data.key}`}
              >
                Watch Thriller
              </a>
            </button>
            <button className="addlist">Add List</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
