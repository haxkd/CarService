import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import APIurl from "./includes/config";
import { toast } from "react-toastify";
const Car = () => {

  const navigate = useNavigate();
  let param = useParams();
  let [car, setCar] = useState({});




  function calculateDays() {
    const dateInput = document.getElementById("dateInput").value;
    const days = document.getElementById("days");
    const selectedDate = new Date(dateInput);
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = selectedDate - currentDate;

    // Convert milliseconds to days
    const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
    if (totalDays < 1) {
      toast.error("Please Choose correct Date", {
        position: toast.POSITION.TOP_RIGHT,
      });
      days.innerHTML = 0;

      return;

    }
    days.innerHTML = totalDays;
    // Display the result


  }

  function makeAgreement() {
    let days = document.getElementById("days").innerText.trim();

    if(car.carQuantity<1){
      toast.error("Sorry Car Not Available", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if(days<1){
      toast.error("Please Choose correct Date", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return
    }

    if (localStorage.getItem("user") == null) {
      toast.error("Please Login First", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

   

    

    let apiuri = APIurl + "/api/agreement/";
    let totalCost = car.carPrice * days;

    axios
      .post(
        apiuri,
        {
          carId: param.id,
          duration: days,
          totalCost: totalCost
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("user"),
          },
        }
      )
      .then(function (response) {
        toast.success("Rental Agreement Created", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          navigate("/agreement/"+response.data.rentId);
        }, 1000);
      })
      .catch(function (error) {
        if (error.response && error.response.status == "401") {
          setTimeout(() => {
            navigate("/login");
          }, 1000);
          toast.error("Please Login First", {
            position: toast.POSITION.TOP_RIGHT,
          });
          localStorage.removeItem("user");
        }
      });


  }

  useEffect(() => {
    let apiuri = APIurl + "/api/car/" + param.id;
    axios
      .get(apiuri)
      .then(function (response) {
        // handle success
        setCar(response.data);
      })
      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });
  }, []);

  return (
    <>
      <div className="">
        <div className="container">
          <div
            className="text-center wow fadeInUp"
            data-wow-delay="0.1s"
            style={{
              visibility: "visible",
              animationDelay: "0.1s",
              animationName: "fadeInUp",
            }}
          >
            <h6 className="text-primary text-uppercase">// The Car //</h6>
            <h1 className="mb-5">Our Car</h1>
          </div>
          <div className="row justify-content-center g-4">

            <div className="col-8">
              <div
                className="wow fadeInUp"
                data-wow-delay="0.1s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.1s",
                  animationName: "fadeInUp",
                }}
              >
                {car && (
                  <>

                    <div className="team-item">
                      <div className="position-relative overflow-hidden">
                        <img className="img-fluid" src={APIurl + "/" + car.carImage} alt="" style={{ width: '100%' }} />
                      </div>
                      <div className="bg-light text-center p-4 pb-0">
                        <h5 className="fw-bold mb-0">{car.carModel} </h5>
                        <p>Available : {car.carQuantity}</p>
                        <small> {car.carMaker}</small>
                      </div>
                      <div className="bg-light text-center p-4 ">
                        <hr />
                        <h5 className="fw-bold mb-3">Rent The Car</h5>
                        <div className="row">
                          <div className="col-md-4 d-flex align-items-center">
                            <input type="date"  id="dateInput" className="form-control" onChange={calculateDays} />
                          </div>
                          <div className="col-md-2 d-flex align-items-center">
                            Days : <span id="days"></span>
                          </div>
                          <div className="col-md-5">
                            <button className="btn btn-primary py-3 px-3" onClick={makeAgreement}>
                              Rent Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Car;
