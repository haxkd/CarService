import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import APIurl from "./includes/config";
import { toast } from "react-toastify";


const AdminEditCar = () => {
    const navigate = useNavigate();
    const param = useParams();
    let [CarMaker, setCarMaker] = useState("");
    let [CarModel, setCarModel] = useState("");
    let [CarPrice, setCarPrice] = useState("");
    let [CarQuantity, setCarQuantity] = useState("");

    useEffect(() => {
        let apiuri = APIurl + "/api/car/" + param.id;
        axios
            .get(apiuri)
            .then(function (response) {
                // handle success
                if (response && response.data) {
                    setCarMaker(response.data.carMaker);
                    setCarModel(response.data.carModel);
                    setCarPrice(response.data.carPrice);
                    setCarQuantity(response.data.carQuantity);
                }
            })
            .catch(function (error) {
                if (error.response && error.response.status == "404") {
                    setTimeout(() => {
                        navigate("/admin/cars");
                    }, 1000);
                    toast.error("Car Not Found", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            })
            .finally(function () {
                // always executed
            });
    }, []);

    function handleUpdate() {
        if (!/^[a-zA-Z ]{1,}$/.test(CarMaker.trim())) {
            toast.error("Care Name is not valid", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (!/^[a-zA-Z ]{1,}$/.test(CarModel.trim())) {
            toast.error("Car Model is not valid", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (!/^[0-9]{1,}$/.test(CarPrice)) {
            toast.error("Price is not valid", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (!/^[0-9]{1,}$/.test(CarQuantity)) {
            toast.error("Quantity is not valid", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        if (localStorage.getItem("admin") == null) {
            toast.error("Please Login First", {
                position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(() => {
                navigate("/admin/login");
            }, 1000);
        }

        let formData = new FormData();
        formData.append("CarMaker", CarMaker);
        formData.append("CarModel", CarModel);
        formData.append("CarPrice", CarPrice);
        formData.append("CarQuantity", CarQuantity);
        formData.append("CarImage", document.querySelector("#fileInput").files[0]);

        axios({
            method: "put",
            url: APIurl + "/api/car/" + param.id,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + localStorage.getItem("admin"),
            },
        })
            .then(function (response) {
                toast.success("Car Edit successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                });

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

    return (
        <>

            <div
                className="container-fluid bg-secondary booking my-5 wow fadeInUp"
                data-wow-delay="0.1s"
            >
                <div className="container">
                    <div className="row gx-5">

                        <div className="col-12">
                            <div
                                className="bg-primary h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn"
                                data-wow-delay="0.6s"
                            >
                                <h1 className="text-white mb-4"> -: Update Car :- </h1>

                                <div className="row g-3">
                                    <div className="col-12 ">
                                        <input
                                            type="text"
                                            onChange={(e) => setCarMaker(e.target.value)}
                                            value={CarMaker}
                                            className="form-control border-0"
                                            placeholder="Enter Car Maker"
                                            style={{ height: "55px" }}
                                        />
                                    </div>
                                    <div className="col-12 ">
                                        <input
                                            type="text"
                                            onChange={(e) => setCarModel(e.target.value)}
                                            value={CarModel}
                                            className="form-control border-0"
                                            placeholder="Enter Car Model"
                                            style={{ height: "55px" }}
                                        />
                                    </div>
                                    <div className="col-12 ">
                                        <input
                                            type="text"
                                            onChange={(e) => setCarPrice(e.target.value)}
                                            value={CarPrice}
                                            className="form-control border-0"
                                            placeholder="Enter Car Price"
                                            style={{ height: "55px" }}
                                        />
                                    </div>

                                    <div className="col-12 ">
                                        <input
                                            type="text"
                                            onChange={(e) => setCarQuantity(e.target.value)}
                                            value={CarQuantity}
                                            className="form-control border-0"
                                            placeholder="Enter Car Quantity"
                                            style={{ height: "55px" }}
                                        />
                                    </div>

                                    <div className="col-12 ">
                                        <input
                                            type="file"
                                            className="form-control border-0"
                                            placeholder="choose jpg or png"
                                            accept=".jpg,.png"
                                            id="fileInput"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <button
                                            className="btn btn-secondary w-100 py-3"
                                            type="button"
                                            onClick={handleUpdate}
                                        >
                                            Update Car
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AdminEditCar