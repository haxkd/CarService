import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import APIurl from "./includes/config";
import { toast } from "react-toastify";


const AdminAgreement = () => {
    const navigate = useNavigate();
    let param = useParams();
    let [rental, setRental] = useState({});

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (rental.rentStatus == "pending") {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + rental.rentDuration);
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1 and pad with 0 if needed
            const day = String(currentDate.getDate()).padStart(2, '0');
            document.getElementById('dateInput').value = `${year}-${month}-${day}`;
        }
        else {
            const originalDate = new Date(rental.rentDate);
            originalDate.setDate(originalDate.getDate() + rental.rentDuration);
            // Get the year, month, and day from the original date
            const year = originalDate.getFullYear();
            const month = String(originalDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so we add 1
            const day = String(originalDate.getDate()).padStart(2, "0");

            // Create the formatted date string in "yyyy-MM-dd" format
            const formattedDateString = `${year}-${month}-${day}`;

            document.getElementById('dateInput').value = formattedDateString;
        }

    }, [rental.rentDuration]);

    const loadData = async () => {
        let apiuri = APIurl + "/api/agreement/" + param.id;
        axios
            .get(apiuri, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("admin"),
                },
            })
            .then(function (response) {
                setRental(response.data);
            })
            .catch(function (error) {
                if (error.response.status == "401") {
                    setTimeout(() => {
                        navigate("/admin/login");
                    }, 1000);
                    toast.error("Please Login First", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    localStorage.removeItem("admin");
                }
            });
    }

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
            return;
        }

        var totalCost = rental.rentCarNavigation.carPrice * totalDays;

        axios
            .put(
                APIurl + "/api/agreement/" + param.id,
                {
                    duration: totalDays,
                    totalCost: totalCost,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("admin"),
                    },
                }
            )
            .then(function (response) {
                // window.location.reload();
                loadData();
            })
            .catch(function (error) {
                if (error.response.status == "401") {
                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                    toast.error("Please Login First", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    localStorage.removeItem("admin");
                }
            });
    }


    return (
        <>
            <div className="container p-5">
                {rental && (<>

                    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                        <div className="container-fluid py-5">
                            <h1 className="display-5 fw-bold text-center mb-5">Rental Agreement</h1>
                            <p className="col-md-8 fs-4">Car Model :  {rental.rentCarNavigation && rental.rentCarNavigation.carModel} </p>
                            <p className="col-md-8 fs-4">Car Maker : {rental.rentCarNavigation && rental.rentCarNavigation.carMaker}</p>
                            <p className="col-md-8 fs-4">Rent Price : {rental.rentCarNavigation && rental.rentCarNavigation.carPrice}</p>
                            <p className="col-md-8 fs-4">Choose Date :


                                <input type="date" disabled={rental.rentStatus !== "pending"} style={{ color: 'red', display: 'initial', width: 'initial' }} id="dateInput" className="form-control" onChange={calculateDays} />


                            </p>
                            <p className="col-md-8 fs-4">Total Days : {rental.rentDuration}</p>
                            <p className="col-md-8 fs-4">Total Cost : {rental.rentCost}</p>
                            <p className="col-md-8 fs-4">Status : {rental.rentStatus}</p>
                            <p className="col-md-8 fs-4">User Name : {rental.rentUserNavigation && rental.rentUserNavigation.userName}</p>
                            <p className="col-md-8 fs-4">User Email : {rental.rentUserNavigation && rental.rentUserNavigation.userEmail}</p>
                            <hr />

                        </div>
                    </div>
                </>)}
            </div>


        </>
    )
}

export default AdminAgreement