import DonatedObjects from "../donatedObjects/DonatedObjects";
import Banner from "../banner/Banner";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <div className="home__wrapper">
        <Banner />
        <DonatedObjects />
        <Footer />
    </div>
  );
}


export default Home ;