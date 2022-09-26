import "./favorite.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import { GET_DETAIL, GET_TRENDING } from "../../redux/movieSlice";

export const Favorite = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [trending, setTrending] = useState([]);

  const [size, setSize] = useState([window.outerWidth, window.outerHeight]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.outerWidth, window.outerHeight]);
    };
    window.addEventListener("resize", handleResize)
  },[])

  useEffect(() => {
    const fetchTrending = async () => {
      const response = await axios.get("http://localhost:3000/trending");
      setTrending(response.data.results);
      dispatch(GET_TRENDING(response.data.results))
    };

    fetchTrending();
  }, []);

  const handleClick = (data) => {
    dispatch(GET_DETAIL(data))
    navigate('/detail')
  }

  return (
    <div className="container-favorite">
      <div className="favorite">
        <div className="title-favorite">Trending</div>
        <div className="container-card">
          { size[0] < 768 ? <Swiper
            slidesPerView={2}
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
            {trending &&
              trending.map((data, i) => {
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
          </Swiper> : <Swiper
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
            {trending &&
              trending.map((data, i) => {
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
          </Swiper>  }
        </div>
      </div>
    </div>
  );
};
