import axios from "axios";
import { useEffect, useState } from "react";
import "./mainpage.css";
import ReactPaginate from "react-paginate";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import { Detail } from "../../pages/detail/Detail";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GET_DETAIL, GET_NOWPLAYING } from "../../redux/movieSlice";

function Mainpage() {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [size, setSize] = useState([window.outerWidth, window.outerHeight]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.outerWidth, window.outerHeight]);
    };
    window.addEventListener("resize", handleResize)
  },[])

 const fetchNowPlaying = async () => {
    const response = await axios.get("http://localhost:3000/now-playing");
    setMovie(response.data.results);
    dispatch(GET_NOWPLAYING(response.data.results))
  };

  useEffect(() => {
    fetchNowPlaying();
  }, []);

  const handleClick = (data) => {
    dispatch(GET_DETAIL(data))
    navigate('/detail')
  }

  return (
    <div className="container-mainpage">
      <div className="mainpage">
        <div className="title-mainpage">Now Playing</div>
        <div className="container-card">
          {
            size[0] < 768 ? (
          <Swiper
            slidesPerView={2}
            spaceBetween={5}
            slidesPerGroup={2}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {movie &&
              movie.map((data, i) => {
                return (
                  <SwiperSlide key={i}>
                    <div className="card"
                    onClick={() => handleClick(data)}
                    >
                      <img
                        className="image"
                        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
            ) : (
<Swiper
            slidesPerView={5}
            spaceBetween={5}
            slidesPerGroup={4}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {movie &&
              movie.map((data, i) => {
                return (
                  <SwiperSlide key={i}>
                    <div className="card"
                    onClick={() => handleClick(data)}
                    >
                      <img
                        className="image"
                        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                      />
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
  );
}

export default Mainpage;
