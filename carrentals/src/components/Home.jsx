import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import APIurl from "./includes/config";
import axios from "axios";
const Home = () => {
  let [cars, setCars] = useState([]);
  function getAllData() {
    let apiuri = APIurl + "/api/car";
    axios
      .get(apiuri)
      .then(function (response) {
        // handle success
        setCars(response.data);
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () { });
  }
  useEffect(() => {
    getAllData();
  }, []);

  function queryData(query) {
    if (query.trim().length == 0) {
      getAllData();
      return;
    }

    axios
      .get(APIurl + "/api/car/search/" + query)
      .then(function (response) {
        // handle success
        setCars(response.data);
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
      })
      .finally(function () {
        // always executed
      });

  }


  function handleChange(val) {
    if (val == "maker") {
      const sortedObj = [...cars].sort((a, b) => a.carMaker.localeCompare(b.carMaker));
      setCars(sortedObj);
    }
    else if (val == "model") {
      const sortedObj = [...cars].sort((a, b) => a.carModel.localeCompare(b.carModel));
      setCars(sortedObj);
    }
    else if (val == "price") {
      const sortedObj = [...cars].sort((a, b) => a.carPrice - b.carPrice);
      setCars(sortedObj);
    }
    else if (val == "quantity") {
      const sortedObj = [...cars].sort((a, b) => b.carQuantity - a.carQuantity);
      setCars(sortedObj);
    }
    else {
      getAllData();
    }
    
  }
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const getPaginatedCars = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return cars.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(cars.length / itemsPerPage);

    if (totalPages <= 1) {
      return null; // Don't render pagination if there's only one page
    }

    const maxButtonsToShow = 3; // Maximum number of buttons to show (including ellipsis)
    const buttons = [];

    // Show the first page button
    buttons.push(
      <li
        key={1}
        className={`page-item ${currentPage === 1 ? "active" : ""}`}
      >
        <button className="page-link" onClick={() => handlePageChange(1)}>
          1
        </button>
      </li>
    );

    // Calculate the range of buttons to show around the current page
    let start = currentPage - Math.floor(maxButtonsToShow / 2);
    let end = currentPage + Math.floor(maxButtonsToShow / 2);

    if (start <= 1) {
      start = 2;
      end = Math.min(start + maxButtonsToShow - 2, totalPages - 1);
    } else if (end >= totalPages) {
      end = totalPages - 1;
      start = Math.max(end - maxButtonsToShow + 2, 2);
    }

    // Show ellipsis if there are more pages before or after the range
    if (start > 2) {
      buttons.push(
        <li key="start-ellipsis" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    // Render page buttons within the range
    for (let i = start; i <= end; i++) {
      buttons.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    // Show ellipsis if there are more pages after the range
    if (end < totalPages - 1) {
      buttons.push(
        <li key="end-ellipsis" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
    }

    // Show the last page button
    buttons.push(
      <li
        key={totalPages}
        className={`page-item ${currentPage === totalPages ? "active" : ""
          }`}
      >
        <button
          className="page-link"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      </li>
    );

    return buttons;
  };

  return (
    <>
      {/* <div id="spinner" classNameName="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div classNameName="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
            <span classNameName="sr-only">Loading...</span>
        </div>
    </div> */}

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="d-flex py-5 px-4">
                <i className="fa fa-certificate fa-3x text-primary flex-shrink-0"></i>
                <div className="ps-4">
                  <h5 className="mb-3">Quality Servicing</h5>
                  <p>Diam dolor diam ipsum sit amet diam et eos erat ipsum</p>
                  <a className="text-secondary border-bottom" href="">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="d-flex bg-light py-5 px-4">
                <i className="fa fa-users-cog fa-3x text-primary flex-shrink-0"></i>
                <div className="ps-4">
                  <h5 className="mb-3">Expert Workers</h5>
                  <p>Diam dolor diam ipsum sit amet diam et eos erat ipsum</p>
                  <a className="text-secondary border-bottom" href="">
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="d-flex py-5 px-4">
                <i className="fa fa-tools fa-3x text-primary flex-shrink-0"></i>
                <div className="ps-4">
                  <h5 className="mb-3">Modern Equipment</h5>
                  <p>Diam dolor diam ipsum sit amet diam et eos erat ipsum</p>
                  <a className="text-secondary border-bottom" href="">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="container-fluid fact bg-dark my-5 py-5">
        <div className="container">
          <div className="row g-4">
            <div
              className="col-md-6 col-lg-3 text-center wow fadeIn"
              data-wow-delay="0.1s"
            >
              <i className="fa fa-check fa-2x text-white mb-3"></i>
              <h2 className="text-white mb-2" data-toggle="counter-up">
                1234
              </h2>
              <p className="text-white mb-0">Years Experience</p>
            </div>
            <div
              className="col-md-6 col-lg-3 text-center wow fadeIn"
              data-wow-delay="0.3s"
            >
              <i className="fa fa-users-cog fa-2x text-white mb-3"></i>
              <h2 className="text-white mb-2" data-toggle="counter-up">
                1234
              </h2>
              <p className="text-white mb-0">Expert Technicians</p>
            </div>
            <div
              className="col-md-6 col-lg-3 text-center wow fadeIn"
              data-wow-delay="0.5s"
            >
              <i className="fa fa-users fa-2x text-white mb-3"></i>
              <h2 className="text-white mb-2" data-toggle="counter-up">
                1234
              </h2>
              <p className="text-white mb-0">Satisfied Clients</p>
            </div>
            <div
              className="col-md-6 col-lg-3 text-center wow fadeIn"
              data-wow-delay="0.7s"
            >
              <i className="fa fa-car fa-2x text-white mb-3"></i>
              <h2 className="text-white mb-2" data-toggle="counter-up">
                1234
              </h2>
              <p className="text-white mb-0">Compleate Projects</p>
            </div>
          </div>
        </div>
      </div>





      <div className="container-xxl py-5">
        <div className="container">


          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="text-primary text-uppercase">// Our Cars //</h6>
            <h1 className="mb-5">Our Cars</h1>
          </div>
          <div className="row my-5 justify-content-center">
            <div className="col-6">
              <input placeholder="Enter Search Query" onChange={(e) => {
                setTimeout(() => {
                  queryData(e.target.value);
                }, 1000);
              }} type="text" className="form-control" />

            </div>
            <div className="col-4">
              <select name="" id="" className="form-control" onChange={(e) => handleChange(e.target.value)} >
                <option value="0">Apply Filter</option>
                <option value="maker">Car Maker</option>
                <option value="model">Car Model</option>
                <option value="price">Car Price</option>
                <option value="quantity">Car Quantity</option>
              </select>
            </div>
          </div>
          <div className="row g-4">
            {getPaginatedCars().map((value, index) => {
              return (
                <div
                  className="col-lg-3 col-md-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                  key={index * Math.random() * 127}
                >
                  <div className="team-item">
                    <div className="position-relative overflow-hidden">
                      <img
                        style={{ height: '200px', width: '100%' }}

                        src={APIurl + "/" + value.carImage}
                        alt=""
                      />
                      <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                        {value.carQuantity > 0 ? <><Link
                          className="btn btn-square mx-1"
                          to={`car/${value.carId}`}
                          style={{ padding: "0px 30px" }}
                        >
                          Rent
                        </Link></> : <>
                          <a className="btn btn-large">Not Available</a>
                        </>}

                      </div>
                    </div>
                    <div className="bg-light text-center p-4">
                      <h5 className="fw-bold mb-0">{value.carModel}</h5>
                      <small>{value.carMaker}</small>
                    </div>
                  </div>
                </div>
              );
            })}


            {cars.length == 0 && <><h1 className="text-center p-5"> Sorry No Cars Avalable...!</h1></>}


            <div className="text-center">
              <ul className="pagination">
                {renderPaginationButtons()}
              </ul>
            </div>




          </div>
        </div>
      </div>
      <hr />
      <div className="container-xxl service py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="text-primary text-uppercase">// Our Services //</h6>
            <h1 className="mb-5">Explore Our Services</h1>
          </div>
          <div className="row g-4 wow fadeInUp" data-wow-delay="0.3s">
            <div className="col-lg-4">
              <div className="nav w-100 nav-pills me-4">
                <button
                  className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4 active"
                  data-bs-toggle="pill"
                  data-bs-target="#tab-pane-1"
                  type="button"
                >
                  <i className="fa fa-car-side fa-2x me-3"></i>
                  <h4 className="m-0">Diagnostic Test</h4>
                </button>
                <button
                  className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4"
                  data-bs-toggle="pill"
                  data-bs-target="#tab-pane-2"
                  type="button"
                >
                  <i className="fa fa-car fa-2x me-3"></i>
                  <h4 className="m-0">Engine Servicing</h4>
                </button>
                <button
                  className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4"
                  data-bs-toggle="pill"
                  data-bs-target="#tab-pane-3"
                  type="button"
                >
                  <i className="fa fa-cog fa-2x me-3"></i>
                  <h4 className="m-0">Tires Replacement</h4>
                </button>
                <button
                  className="nav-link w-100 d-flex align-items-center text-start p-4 mb-0"
                  data-bs-toggle="pill"
                  data-bs-target="#tab-pane-4"
                  type="button"
                >
                  <i className="fa fa-oil-can fa-2x me-3"></i>
                  <h4 className="m-0">Oil Changing</h4>
                </button>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="tab-content w-100">
                <div className="tab-pane fade show active" id="tab-pane-1">
                  <div className="row g-4">
                    <div className="col-md-6" style={{ minHeight: "350px" }}>
                      <div className="position-relative h-100">
                        <img
                          className="position-absolute img-fluid w-100 h-100"
                          src="img/service-1.jpg"
                          style={{ objectFit: "cover" }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h3 className="mb-3">
                        15 Years Of Experience In Auto Servicing
                      </h3>
                      <p className="mb-4">
                        Tempor erat elitr rebum at clita. Diam dolor diam ipsum
                        sit. Aliqu diam amet diam et eos. Clita erat ipsum et
                        lorem et sit, sed stet lorem sit clita duo justo magna
                        dolore erat amet
                      </p>
                      <p>
                        <i className="fa fa-check text-success me-3"></i>Quality
                        Servicing
                      </p>
                      <p>
                        <i className="fa fa-check text-success me-3"></i>Expert
                        Workers
                      </p>
                      <p>
                        <i className="fa fa-check text-success me-3"></i>Modern
                        Equipment
                      </p>
                      <a href="" className="btn btn-primary py-3 px-5 mt-3">
                        Read More<i className="fa fa-arrow-right ms-3"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-pane-2">
                  <div className="row g-4">
                    <div className="col-md-6" style={{ minHeight: "350px" }}>
                      <div className="position-relative h-100">
                        <img
                          className="position-absolute img-fluid w-100 h-100"
                          src="img/service-2.jpg"
                          style={{ objectFit: "cover" }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h3 className="mb-3">
                        15 Years Of Experience In Auto Servicing
                      </h3>
                      <p className="mb-4">
                        Tempor erat elitr rebum at clita. Diam dolor diam ipsum
                        sit. Aliqu diam amet diam et eos. Clita erat ipsum et
                        lorem et sit, sed stet lorem sit clita duo justo magna
                        dolore erat amet
                      </p>
                      <p>
                        <i className="fa fa-check text-success me-3"></i>Quality
                        Servicing
                      </p>
                      <p>
                        <i className="fa fa-check text-success me-3"></i>Expert
                        Workers
                      </p>
                      <p>
                        <i className="fa fa-check text-success me-3"></i>Modern
                        Equipment
                      </p>
                      <a href="" className="btn btn-primary py-3 px-5 mt-3">
                        Read More<i className="fa fa-arrow-right ms-3"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-pane-3">
                  <div className="row g-4">
                    <div className="col-md-6" style={{ minHeight: "350px" }}>
                      <div className="position-relative h-100">
                        <img
                          className="position-absolute img-fluid w-100 h-100"
                          src="img/service-3.jpg"
                          style={{ objectFit: "cover" }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h3 className="mb-3">
                        15 Years Of Experience In Auto Servicing
                      </h3>
                      <p className="mb-4">
                        Tempor erat elitr rebum at clita. Diam dolor diam ipsum
                        sit. Aliqu diam amet diam et eos. Clita erat ipsum et
                        lorem et sit, sed stet lorem sit clita duo justo magna
                        dolore erat amet
                      </p>
                      <p>
                        <i className="fa fa-check text-success me-3"></i>Quality
                        Servicing
                      </p>
                      <p>
                        <i className="fa fa-check text-success me-3"></i>Expert
                        Workers
                      </p>
                      <p>
                        <i className="fa fa-check text-success me-3"></i>Modern
                        Equipment
                      </p>
                      <a href="" className="btn btn-primary py-3 px-5 mt-3">
                        Read More<i className="fa fa-arrow-right ms-3"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-pane-4">
                  <div className="row g-4">
                    <div className="col-md-6" style={{ minHeight: "350px" }}>
                      <div className="position-relative h-100">
                        <img
                          className="position-absolute img-fluid w-100 h-100"
                          src="img/service-4.jpg"
                          style={{ objectFit: "cover" }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h3 className="mb-3">
                        15 Years Of Experience In Auto Servicing
                      </h3>
                      <p className="mb-4">
                        Tempor erat elitr rebum at clita. Diam dolor diam ipsum
                        sit. Aliqu diam amet diam et eos. Clita erat ipsum et
                        lorem et sit, sed stet lorem sit clita duo justo magna
                        dolore erat amet
                      </p>
                      <p>
                        <i className="fa fa-check text-success me-3"></i>Quality
                        Servicing
                      </p>
                      <p>
                        <i className="fa fa-check text-success me-3"></i>Expert
                        Workers
                      </p>
                      <p>
                        <i className="fa fa-check text-success me-3"></i>Modern
                        Equipment
                      </p>
                      <a href="" className="btn btn-primary py-3 px-5 mt-3">
                        Read More<i className="fa fa-arrow-right ms-3"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 pt-4" style={{ minHeight: "400px" }}>
              <div
                className="position-relative h-100 wow fadeIn"
                data-wow-delay="0.1s"
              >
                <img
                  className="position-absolute img-fluid w-100 h-100"
                  src="img/about.jpg"
                  style={{ objectFit: "cover" }}
                />
                <div
                  className="position-absolute top-0 end-0 mt-n4 me-n4 py-4 px-5"
                  style={{ background: "rgba(0, 0, 0, .08)" }}
                >
                  <h1 className="display-4 text-white mb-0">
                    15 <span className="fs-4">Years</span>
                  </h1>
                  <h4 className="text-white">Experience</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h6 className="text-primary text-uppercase">// About Us //</h6>
              <h1 className="mb-4">
                <span className="text-primary">CarServ</span> Is The Best Place
                For Your Auto Care
              </h1>
              <p className="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <div className="row g-4 mb-3 pb-3">
                <div className="col-12 wow fadeIn" data-wow-delay="0.1s">
                  <div className="d-flex">
                    <div
                      className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1"
                      style={{ width: "45px", height: "45px" }}
                    >
                      <span className="fw-bold text-secondary">01</span>
                    </div>
                    <div className="ps-3">
                      <h6>Professional & Expert</h6>
                      <span>Diam dolor diam ipsum sit amet diam et eos</span>
                    </div>
                  </div>
                </div>
                <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                  <div className="d-flex">
                    <div
                      className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1"
                      style={{ width: "45px", height: "45px" }}
                    >
                      <span className="fw-bold text-secondary">02</span>
                    </div>
                    <div className="ps-3">
                      <h6>Quality Servicing Center</h6>
                      <span>Diam dolor diam ipsum sit amet diam et eos</span>
                    </div>
                  </div>
                </div>
                <div className="col-12 wow fadeIn" data-wow-delay="0.5s">
                  <div className="d-flex">
                    <div
                      className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1"
                      style={{ width: "45px", height: "45px" }}
                    >
                      <span className="fw-bold text-secondary">03</span>
                    </div>
                    <div className="ps-3">
                      <h6>Awards Winning Workers</h6>
                      <span>Diam dolor diam ipsum sit amet diam et eos</span>
                    </div>
                  </div>
                </div>
              </div>
              <a href="" className="btn btn-primary py-3 px-5">
                Read More<i className="fa fa-arrow-right ms-3"></i>
              </a>
            </div>
          </div>
        </div>
      </div>



    </>
  );
};

export default Home;
