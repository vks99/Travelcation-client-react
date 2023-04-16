import { useState, useEffect, useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import AuthContext, { AuthContextType } from "../context/AuthContext";

//declaring props for feedback
type Props = {
  name: string;
  email: string;
  feedback: string;
};
//declaring props for destinations name and description
type destProps = {
  name: string;
  description: string;
};
//declaring props for travel guide titles
type guideProps = {
  name: string;
};

const Home = () => {
  //creating state variables
  const [feed, setFeed] = useState(false);
  const [feedback, setFeedback] = useState<Props[]>([]);
  const [dest, setdest] = useState<destProps[]>([]);
  const [travelguide, setTravelGuide] = useState<guideProps[]>([]);
  //Images of destinations
  const [imgurl, setImageurl] = useState([
    "/images/Home/image1.jpeg",
    "/images/Home/image2.jpeg",
    "/images/Home/image3.jpeg",
  ]);
  //Images of travelguides
  const [guideimgurl, setGuideImageurl] = useState([
    "/images/Home/sarada_img.jpg",
    "/images/Home/vikas_image1.jpg",
    "/images/Home/sethu_madhav_image1.jpg",
    "/images/Home/suzhang.jpeg",
  ]);

  const auth = useContext(AuthContext) as AuthContextType;

  //post method to send feedback details
  const sendFeedPostRequest = async () => {
    try {
      const response = await axios.post("https://travelcationserver.onrender.com/home", feedback);
      console.log(feedback);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  //get methods to fetch the destination details and travelguides information from database
  useEffect(() => {
    axios
      .get("https://travelcationserver.onrender.com/home_destinations")
      .then((res) => {
        setdest(res.data);
        console.log(dest);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("https://travelcationserver.onrender.com/home_travelguides")
      .then((res) => {
        setTravelGuide(res.data);
        console.log(travelguide);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };
  return (
    //Code for images scrolling
    <div>
      <Carousel className="my-5">
        <Carousel.Item>
          <img
            className="bg-img-top"
            src="images/Home/background_image_fort3.jpeg"
            alt="First slide"
          />
          <Carousel.Caption>
            {auth.isLoggedIn ? (
              <>
                <h1>Welcome!</h1>
              </>
            ) : (
              <>
                <h1>Welcome!</h1>
                <a href="/Login" className="btn btn-primary">
                  Login
                </a>
                <a href="/Signup" className="btn btn-primary ml-2">
                  Signup
                </a>
              </>
            )}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="bg-img-top"
            src="images/Home/background_image_city.jpeg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Travel To Explore</h3>
            <p>All journeys are different, just find what makes it unique!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="bg-img-top"
            src="images/Home/background_image_fort.jpeg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Adventure</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* Destination details */}
      <div className="row text-center mt-5">
        <h2>Popular Destinations</h2>
      </div>
      <div className="container mb-5">
        <div className="card-deck">
          {dest.map((item, index) => (
            <div className="card">
              <img
                src={imgurl[index]}
                className="card-img-top"
                alt="Card Image"
              />
              <div className="card-body">
                <h3 className="card-title">{item.name}</h3>
                <p className="card-text">{item.description}</p>
                <div className="btn mb-2">
                  <a href="/Destination" className="btn btn-primary">
                    View More
                  </a>
                </div>
              </div>
            </div>
          ))}
          ;
        </div>
      </div>
      {/* travelguides information */}
      <div className="row mx-5 g-3">
        <div className="header-travelguide">
          <h2>Travel Guides</h2>
        </div>
        {travelguide.map((i, index) => (
          <div className="col-md-6 col-lg-3">
            <div className="card">
              <img
                className="rounded-circle card-image-travelguide "
                alt="image-travelguide"
                src={guideimgurl[index]}
              />
              <div className="card-text-travelguide d-flex justify-content-center">
                <h4>{i.name}</h4>
              </div>
            </div>
          </div>
        ))}
        ;
      </div>
      {/* Form for customer feedback */}
      <div className="container">
        <div className="row mt-5">
          <h3 className="d-flex justify-content-center">
            If you are a savvy traveler, there is nothing better than sharing
            your personal experience.
          </h3>
          <br />
        </div>
        <div className="d-flex justify-content-center mb-5">
          {!feed && (
            <button
              className="btn btn-danger d-flex justify-content-center"
              onClick={() => setFeed((value) => !value)}
            >
              {" "}
              Provide Feedback
            </button>
          )}
        </div>
        <div className="feedback d-flex justify-content-center">
          {feed && (
            <form onSubmit={sendFeedPostRequest}>
              <div className="my-1">
                <input
                  placeholder="Enter Name"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  placeholder="Enter Email"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-1">
                <input
                  placeholder="Enter Feedback"
                  name="feedback"
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success mb-5">
                Submit feedback
              </button>
              <button
                className="btn btn-danger mb-5"
                onClick={() => setFeed((value) => !value)}
              >
                Close
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
