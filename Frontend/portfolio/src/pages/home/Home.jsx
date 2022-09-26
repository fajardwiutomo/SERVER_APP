import { Favorite } from "../../component/favorite/Favorite";
import { Headline } from "../../component/headline/Headline";
import Mainpage from "../../component/mainpage/Mainpage";
import { Navbar } from "../../component/navbar/Navbar";
import "./home.css";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <Headline />
      <Mainpage/>
      <Favorite/>
    </div>
  );
};
