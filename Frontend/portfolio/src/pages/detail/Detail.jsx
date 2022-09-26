import "./detail.css";
import { Navbar } from "../../component/navbar/Navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";

export const Detail = () => {
  const detail = useSelector((state) => state.movie?.detail);
  const [data, setData] = useState([]);
  const [genre, setGenre] = useState([]);
  const [cast, setCast] = useState([]);
  const filterdarisana = detail.genre_ids;

  const [size, setSize] = useState([window.outerWidth, window.outerHeight]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.outerWidth, window.outerHeight]);
    };
    window.addEventListener("resize", handleResize)
  },[])

  const scroll = () => {
    window.scrollTo(0, 0);
  };

  const getVideo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/video?id=${detail?.id}`
      );
      setData(response.data.results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getCast = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/cast?id=${detail?.id}`
      );
      setCast(response.data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenre = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/genre`);
      setGenre(response.data.genres);
    } catch (error) {
      console.log(error);
    }
  };

  let dataFinal = [];
  const filter = genre.map((state) => {
    const data = filterdarisana.filter((data) => {
      if (data === state.id) {
        dataFinal.push(state.name);
      }
    });
    return data;
  });

  useEffect(() => {
    getVideo();
    scroll();
    getGenre();
    getCast();
  }, []);

  return (
    <div className="background">
      <Navbar />
      <>
        <div className="Container-detail">
          <div className="detail">
            <div className="forImage">
              <img
                className="imagedetail"
                src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
              />
              <div className="rate">{detail.vote_average.toFixed(1)}</div>
            </div>
            <div className="description-item">
              <h1 className="detail-title">{detail.title}</h1>
              <div className="span-title">
                <span className="year-duration">{detail.release_date}</span>
                {dataFinal &&
                  dataFinal.map((data, i) => {
                    return <span className="genres">{data}</span>;
                  })}
              </div>
              <div className="button-detail">
                <button className="watch-detail">
                  <a
                    target="_blank"
                    className="watch-detail"
                    href={`https://www.youtube.com/watch?v=${data.key}`}
                  >
                    Watch Thriller
                  </a>
                </button>
                <button className="addlistin">Add to Watchlist</button>
                <button className="share">Share</button>
              </div>
              <p className="description-detail">{detail.overview}</p>
              {/* <div className="info">
              <div className="title-info">
                <span>Director By</span>
                <span>Written By</span>
                <span>Studio</span>
                <span>Genre</span>
              </div>
              <div className="title-content">
                <span>fajar</span>
                <span>Dwiy</span>
                <span>Warner Bros</span>
                <span>Action</span>
              </div>
            </div> */}
            </div>
          </div>
          <div className="cast-container">
            <p className="title-cast">Cast</p>
            <div className="image-container">
              {
                size[0] < 768 ? (
                  <Swiper
                slidesPerView={3}
                spaceBetween={5}
                slidesPerGroup={8}
                // loop={true}
                // loopFillGroupWithBlank={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {cast &&
                  cast.map((data, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="swiper-cast">
                          <img
                            className="img-cast"
                            src={`https://image.tmdb.org/t/p/w300${data.profile_path}`}
                          />
                          <span className="name-cast">{data.name}</span>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>

                ) : (
                  <Swiper
                slidesPerView={8}
                spaceBetween={10}
                slidesPerGroup={5}
                // loop={true}
                // loopFillGroupWithBlank={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {cast &&
                  cast.map((data, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="swiper-cast">
                          <img
                            className="img-cast"
                            src={`https://image.tmdb.org/t/p/w300${data.profile_path}`}
                          />
                          <span className="name-cast">{data.name}</span>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
                )
              }
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
