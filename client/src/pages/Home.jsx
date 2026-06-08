import Banner from "../components/Banner";
import Header from "../components/Header";
import Specialty from "../components/Specialty";
import TopDoctors from "../components/TopDoctors";

const Home = () => {
  return (
    <div>
      <Header />
      <Specialty />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;
