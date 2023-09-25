import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import APIurl from "./includes/config";
import { toast } from "react-toastify";


const AdminAgreements = () => {

    const navigate = useNavigate();
    let param = useParams();
    let [rental, setRental] = useState();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        let apiuri = APIurl + "/api/agreement";
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

    const handleAccept = (val) => {
        axios
            .put(
                APIurl + "/api/agreement/" + val,
                {
                    status: "returned",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("admin"),
                    },
                }
            )
            .then(function (response) {
                toast.success("Rent Car Returned", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loadData();
            })
            .catch(function (error) {
                if (error.response.status == "401") {
                    localStorage.removeItem("admin");
                    setTimeout(() => {
                        navigate("/admin/login");
                    }, 1000);
                    toast.error("Please Login First", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            });
    }

    function handleBlock(val) {
        axios
            .post(
                APIurl + "/api/agreement/blockuser/" + val,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("admin"),
                    },
                }
            )
            .then(function (response) {
                toast.success("User Blocked Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                loadData()
            })
            .catch(function (error) {
                if (error.response && error.response.status == "401") {
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



    function calcDays(day, duration) {
        const targetDate = new Date(day);
        const currentDate = new Date();
        const differenceInMilliseconds = currentDate - targetDate;
        const daysUntilTargetDate = differenceInMilliseconds / (24 * 60 * 60 * 1000);

        const currentDuration = Math.round(daysUntilTargetDate);
        if (currentDuration >= duration) {
            return true;
        }
        return false;
        // console.log('current duration',currentDuration,'duration',duration );

    }

    return (
        <>

            <div className="container">

                <div className="table-responsive">
                    <table className="my-5 table table-bordered border-primary table-light table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Car</th>
                                <th>User</th>
                                <th>Status</th>
                                <th>View</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rental &&
                                rental.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>{value.rentCarNavigation && value.rentCarNavigation.carModel} - {value.rentCarNavigation && value.rentCarNavigation.carMaker}</td>
                                            <td>{value.rentUserNavigation.userEmail}</td>
                                            <td>{value.rentStatus}</td>
                                            <td>
                                                <Link to={`/admin/agreement/${value.rentId}`}>
                                                    <button className="btn btn-outline-success">
                                                        view
                                                    </button>
                                                </Link>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-3">
                                                    {value.rentStatus == "return" && <><button className="btn btn-outline-success" onClick={() => handleAccept(value.rentId)}>Accept</button></>}

                                                    {value.rentStatus == "rented" && <><button className="btn btn-outline-secondary" onClick={() => handleAccept(value.rentId)}>Cancel</button></>}

                                                    {/* {calcDays(value.rentDate,value.rentDuration) && value.rentStatus =="rented" && value.rentUserNavigation.userStatus != "block" && <><button className="btn btn-outline-danger" onClick={() => handleBlock(value.rentId)}>Block</button></>} */}

                                                    {(calcDays(value.rentDate, value.rentDuration) || value.rentStatus == "returned") && (value.rentUserNavigation.userStatus != "block") ? <><button className="btn btn-outline-danger" onClick={() => handleBlock(value.rentId)}>Block</button></> : <></>}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminAgreements