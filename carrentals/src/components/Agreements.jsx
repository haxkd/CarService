import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import APIurl from "./includes/config";
import { toast } from "react-toastify";

const Agreements = () => {
    const navigate = useNavigate();
    let param = useParams();
    let [rental, setRental] = useState();


    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        let apiuri = APIurl + "/api/agreement/user";
        axios
            .get(apiuri, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("user"),
                },
            })
            .then(function (response) {
                setRental(response.data);
            })
            .catch(function (error) {
                if (error.response.status == "401") {
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



    return (
        <>
            <div className="container">

                <div className="table-responsive">
                    <table className="my-5 table table-bordered border-primary table-light table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Car</th>
                                <th>Status</th>
                                <th>Show</th>
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
                                            <td>{value.rentStatus}</td>

                                            <td>
                                                <Link to={`/agreement/${value.rentId}`}>
                                                    <button className="btn btn-outline-success">
                                                        show
                                                    </button>
                                                </Link>
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

export default Agreements