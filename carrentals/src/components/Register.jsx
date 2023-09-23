import React, { useState } from "react";
import Navbar from "./includes/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import APIurl from "./includes/config";
import axios from "axios";
import { useAuth } from "./includes/AuthContext";

const Register = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [name, setName] = useState("");
    const navigate = useNavigate();


    function handleRegister(){
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            toast.error("email is in wrong format", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (password.trim().length == 0) {
            toast.error("password is empty", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        let apiuri = APIurl + "/api/users/signup";
        axios
            .post(apiuri, {
                userName: name,
                userEmail: email,
                userPassword: password,
            })
            .then(function (response) {
                // handle success
                toast.success("user register successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                });                
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            })
            .catch(function (error) {
                // handle error
                toast.error(error.response.data, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .finally(function () {
                // always executed
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
                                <h1 className="text-white mb-4"> -: User Register :- </h1>

                                <div className="row g-3">
                                <div className="col-12 ">
                                        <input
                                            type="email"
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            className="form-control border-0"
                                            placeholder="Your Name"
                                            style={{ height: "55px" }}
                                        />
                                    </div>
                                    <div className="col-12 ">
                                        <input
                                            type="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            className="form-control border-0"
                                            placeholder="Your Email"
                                            style={{ height: "55px" }}
                                        />
                                    </div>
                                    <div className="col-12 ">
                                        <input
                                            type="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            className="form-control border-0"
                                            placeholder="Your Password"
                                            style={{ height: "55px" }}
                                        />
                                    </div>


                                    <div className="col-12">
                                        <button
                                            className="btn btn-secondary w-100 py-3"
                                            type="button"
                                            onClick={handleRegister}
                                        >
                                            Register
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

export default Register