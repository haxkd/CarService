import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIurl from "./includes/config";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const AdminCars = () => {
    const navigate = useNavigate();
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

    function handleDelete(pid) {
        let c = window.confirm("are your sure want to delete");
        if (c) {
            axios({
                method: "delete",
                url: APIurl + "/api/car/" + pid,
                //data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + localStorage.getItem("admin"),
                },
            })
                .then(function (response) {
                    toast.success("Car Deleted successfully", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    getAllData();
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
    }

    return (
        <>
            <div className="container">
                <div>
                    <Link to={'/admin/cars/add'} className="btn btn-outline-warning">Add new Car</Link>
                </div>
                <div className="table-responsive">
                    <table className="my-5 table table-bordered border-primary table-light table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>CarModel - Makere</th>
                                <th>Quantity</th>
                                <th>Img</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars &&
                                cars.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>{value.carModel} - {value.carMaker}</td>
                                            <td>{value.carQuantity}</td>
                                            <td><img style={{ maxWidth: '400px' }} src={APIurl + "/" + value.carImage} alt="" /></td>
                                            <td>
                                                <Link to={`/admin/cars/edit/${value.carId}`}>
                                                    <button className="btn btn-outline-success">
                                                        Edit
                                                    </button>
                                                </Link>
                                                -
                                                
                                                    <button onClick={() => handleDelete(value.carId)} className="btn btn-outline-danger">
                                                        Delete
                                                    </button>
                                                
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

export default AdminCars