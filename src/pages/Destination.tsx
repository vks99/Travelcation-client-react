import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

// declaring type for package state variable
interface getType {
  days: number;
  description: string;
  name: string;
  no_persons: number;
  price: number;
  _id: string;
}

// creating Destination page function/component
const Destination = () => {

  // creating state variables
  const [packages, setPackages] = useState<getType[]>([]);
  const [imgurl, setImageurl] = useState([
    "/images/Destination/destinationindia.jpg",
    "/images/Destination/DestinationCanada.jpg",
    "/images/Destination/destinationSwitzerland.jpg",
    "/images/Destination/destinationEgypt.jpg",
    "/images/Destination/destinationLondon.jpg",
    "/images/Destination/destinationAustralia.jpg",
  ]);
  // state variables for online desitnation booking dropdown
  const [selectedDestination, setSelectedDestination] = useState("");
  const [price, setPrice] = useState(0);

  //   to navigate when clicked on button
  const navigate = useNavigate();
  const navigateTo = (name: String, price: number) => {
    console.log(name);
    console.log(price);
    navigate("/Payment", { state: { name: name, price: price } });
  };

   // creating function to update price based on selected destination dropdown 
  function handleDestinationChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setSelectedDestination(selectedValue);

    let newPrice=0;
    switch (selectedValue) {
      case "Bali":
        newPrice = 1000;
        break;
      case "Maldives":
        newPrice = 1500;
        break;
      case "Bangkok":
        newPrice = 2000;
        break;
      default:
        newPrice = 0;
        break;
    }
    setPrice(newPrice);
  }

  // useEffect for calling api
  useEffect(() => {
    axios
      .get("https://travelcationserver.onrender.com/packages")
      .then((res) => {
        setPackages(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="container-fluid position-relative p-0">
        <div className="container-fluid bg-success py-5 mb-5 hero-header">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white mb-3">
                Enjoy Your vacation With Us
              </h1>
              <p className="f5-4 text-white mb-4">
                {" "}
                From stunning beaches to ancient ruins, our travel experts have
                scoured the globe to bring you the best destinations and
                experiences. Browse our curated selection of travel guides,
                itineraries, and insider tips to plan your next adventure today.
              </p>
              <div className="position-relative w-75 mx-auto ">
                <input
                  type="text"
                  className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
                  placeholder="Eg:London"
                />
                <button
                  type="button"
                  className="btn btn-success rounded-pill position-absolute top-0 end-0 me-2 my-1 d-flex align-items-center"
                  style={{ height: 30 }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6" style={{ minHeight: 400 }}>
              <div className="overflow-hidden">
                <img
                  src="/images/Destination/Destination_AboutUs.jpg"
                  className="img-fluid"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <h6 className="section-title bg-white text-start text-success pe-3">
                About Us
              </h6>
              <h1 className="mb-4">
                Welcome to<span className="text-success"> Tourist</span>
              </h1>

              <p className="mb-4">
                We understand tourism not as a mere leisure activity but as an
                educational yet pleasant journey to unknown countries and
                cultures. We put a strong focus on bringing long-term &
                sustainable development to the regions we promote by working
                closely with local providers and using local products.
                <br />
                <br />
              </p>

              <div className="row gy-2 gx-4 mb-4">
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-success me-2"></i>First
                    Class Flights
                  </p>
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-success me-2"></i>5
                    Star Accommodation
                  </p>
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-success me-2"></i>
                    Premium City Tours
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-success me-2"></i>
                    Handpicked Hotels
                  </p>
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-success me-2"></i>
                    Latest Model Vehicles
                  </p>
                  <p className="mb-0">
                    <i className="fa fa-arrow-right text-success me-2"></i>
                    Service
                  </p>
                </div>
              </div>
              <div className="btn btn-success py-3 px-5 mt-2">Read More</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center>">
            <h3 className="section-title bg-white text-center text-success px-3">
              {" "}
              Packages{" "}
            </h3>
            <h1 className="mb-5 text-center">Awesome packages</h1>
          </div>

          <div className="row g-4 justify-content-center">
            {packages.map((item, index) => (
              <div className="col-lg-4 col-md-6">
                <div className="package-item">
                  <div className="overflow-hidden">
                    <img src={imgurl[index]} alt="" className="img-fluid" />
                  </div>

                  <div className="d-flex border-bottom">
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-map-marker-alt text-success me-2"></i>
                      {item.name}
                    </small>
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-calendar-alt text-success me-2"></i>{" "}
                      {item.days} days
                    </small>
                    <small className="flex-fill text-center border-end py-2">
                      <i className="fa fa-user text-success me-2"></i>{" "}
                      {item.no_persons} Person
                    </small>
                  </div>
                  <div className="text-center p-4">
                    <h3 className="mb-0">${item.price}.00</h3>
                    <div className="mb-3">
                      <small className="fa fa-star text-success"></small>
                      <small className="fa fa-star text-success"></small>
                      <small className="fa fa-star text-success"></small>
                      <small className="fa fa-star text-success"></small>
                      <small className="fa fa-star text-success"></small>
                    </div>
                    <p>{item.description}</p>
                    <div className="d-flex justify-content-center mb-2">
                      <a
                        href=""
                        className="btn btn-sm btn-success px-3"
                        style={{ borderRadius: "30px 0 0 30px" }}
                      >
                        Read More
                      </a>
                      <a
                        href="/Payment"
                        className="btn btn-sm btn-success px-3"
                        onClick={() => navigateTo(item.name, item.price)}
                        style={{ borderRadius: "0 30px 30px 0" }}
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="booking p-5">
            <div className="row g-5 align-items-center">
              <div className="col-md-6 text-white">
                <h6 className="text-white text-uppercase">Booking</h6>
                <h1 className="text-white mb-4">Online Booking</h1>
                <p className="mb-4">
                  Our travel website is dedicated to making the booking process
                  for your next adventure as simple and stress-free as possible.
                  With our easy-to-use online booking platform, you can find and
                  reserve the perfect hotel, flight, or vacation package with
                  just a few clicks.
                </p>
                <p className="mb-4">
                  At our travel website, we understand that finding the best
                  deals on travel is key to making your dream vacation a
                  reality. That's why our online booking portal offers exclusive
                  deals and discounts on flights, hotels, and vacation packages
                  from top travel providers around the world.
                </p>
                <a href="" className="btn btn-outline-light py-3 px-5 mt-2">
                  Read More
                </a>
              </div>
              <div className="col-md-6">
                <h1 className="text-white mb-4">Book A Tour</h1>
                <form action="">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control bg-transparent text-white"
                          id="name"
                          placeholder="Your Name"
                        />
                        <label htmlFor="name" className="text-white">
                          {" "}
                          Your Name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control bg-transparent text-white"
                          id="email"
                          placeholder="Your Email"
                        />
                        <label htmlFor="email" className="text-white">
                          {" "}
                          Your Email
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          name=""
                          id="selectdestination"
                          className="form-select bg-transparent text-white"
                          value={selectedDestination}
                          onChange={handleDestinationChange}
                        >
                          <option value="">Select a destination</option>
                          <option value="Bali" className="text-dark">
                            Bali
                          </option>
                          <option value="Maldives" className="text-dark">
                            Maldives
                          </option>
                          <option value="Bangkok" className="text-dark">
                            Bangkok
                          </option>
                        </select>
                        <label
                          htmlFor="selectdestination"
                          className="text-white"
                        >
                          Destination
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control bg-transparent text-white"
                          id="price"
                          placeholder="Price"
                          value={price}
                          readOnly
                        />
                        <label htmlFor="price" className="text-white">
                          Price
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control bg-transparent text-white"
                          placeholder="Special Request"
                          id="message"
                          style={{ height: "100px" }}
                        ></textarea>
                        <label htmlFor="message" className="text-white">
                          Special Request
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-outline-light w-100 py-3"
                        type="submit"
                        onClick={() => navigateTo(selectedDestination, price)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// exporting the component
export default Destination;