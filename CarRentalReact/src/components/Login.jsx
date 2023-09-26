import React, { useState } from "react";
import Navbar from "./includes/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import APIurl from "./includes/config";
import axios from "axios";
import { useAuth } from "./includes/AuthContext";

const Login = () => {
    
    const {login} = useAuth();
    
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin() {
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

        let apiuri = APIurl + "/api/users/login";
        axios
            .post(apiuri, {
                userEmail: email,
                userPassword: password,
            })
            .then(function (response) {
                // handle success
                toast.success("user login successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                localStorage.setItem("user", response.data);
                setTimeout(() => {
                    login();
                    navigate("/agreement");
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
                                <h1 className="text-white mb-4"> -: User Login :- </h1>

                                <div className="row g-3">
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
                                            onClick={handleLogin}
                                        >
                                            Login
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

export default Login