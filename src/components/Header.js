import React from 'react'
import Login from './Login'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header(props) {
    let [userLogin, setUserLogin] = useState(null);
    let [invisible, setInvisible] = useState('');
    let clickOnLoad = createRef();
    let navigate = useNavigate();
    let onSuccess = async (response) => {
        let token = response.credential;
        localStorage.setItem("auth-token", token);
        setInvisible('invisible');
        let decode = jwtDecode(token);
        console.log("decode")
        let cred = {
            name: decode.name,
            email: decode.email,
        }
        let URL = "https://akashphysicsbackend.onrender.com/api/add-user";
        try {
            let res = await axios.post(URL, cred);
            console.log("successful db entry");

        } catch (error) {
            alert("error");
            console.log(error)
        }
        Swal.fire({
            icon: "success",
            title: "Login Successfully",
        }).then(() => {
            window.location = window.location;
            window.location.reload(true);
        });
    }
    let onError = () => {
        alert("Something went wrong try again...");
    };
    let logout = () => {
        Swal.fire({
            title: "Confirm Logout?",
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("auth-token");
                sessionStorage.setItem("flag", 0);
                window.location.reload();
            }
        })
    }
    let onClickOnLoad = () => {
        let sessionFlag = sessionStorage.getItem("flag");
        if (sessionFlag > 0)
            clickOnLoad.current.click();
        else {
            sessionStorage.setItem("flag", 1);
        }
    }
    let goToHome = () => {
        navigate("/");
    }
    let goToCourses = () => {
        navigate("/courses");
        // window.scrollTo(0,0);
    }
    let goToDemo = () => {
        navigate("/demo-videos");
    }
    let goToAbout = () => {
        navigate("/about");
    }
    useEffect(() => {

        let token = localStorage.getItem("auth-token");
        if (token) {
            let tokenDecoded = jwtDecode(token);
            console.log("tkd")
            console.log(tokenDecoded);
            setUserLogin(tokenDecoded);
        }
        else {
            setUserLogin(null);
            let sessionFlag = sessionStorage.getItem("flag");
            if (sessionFlag) {
                if (sessionFlag > 0) {
                    sessionStorage.setItem("flag", 0);
                    clickOnLoad.current.click();
                }
                // else {
                //     sessionStorage.setItem("flag", 1);
                // }
            }
            else {
                sessionStorage.setItem("flag", 0);
            }

        }
        if (props.enrolState == false) {
            clickOnLoad.current.click();

        }
    }, [])
    return (
        <GoogleOAuthProvider clientId="670355259218-bi38dujagkthd5r4afg4adf46u025e8g.apps.googleusercontent.com">
            <Login success={onSuccess} error={onError} invisible={invisible} />
            <nav className="navbar fixed-top navbar-expand-lg bg-white pding">
                <div className="container-fluid wdth mx-auto ">
                    <a className="navbar-brand header-logo me-auto wt-20 curso" onClick={goToHome}>
                        <img className="img-fluid" src="/image/akash physics.png" alt="Akash Physics" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 font-sizing-medium">
                            {/* <li className="nav-item ms-4">
                                <a className="nav-link" >Subscribe</a>
                            </li> */}
                            <li className="nav-item ms-4">

                                <a className="nav-link font-sizing-medium curso" onClick={goToCourses} >Courses</a>

                            </li>
                            <li className="nav-item ms-4">
                                <a className="nav-link text-nowrap font-sizing-medium curso" onClick={goToAbout}>About/Contact Me</a>
                            </li>
                            <li className="nav-item ms-4">

                                <a className="nav-link text-nowrap font-sizing-medium curso" onClick={goToDemo}>Demo Videos</a>

                            </li>
                            {userLogin == null ? (
                                <li className="nav-item ms-4 dd1">
                                    <a className="nav-link font-sizing-medium curso text-nowrap"
                                        data-bs-toggle="modal"
                                        data-bs-target="#login"
                                    // ref={clickOnLoad}
                                    >Login/Sign Up</a>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item ms-4 dd1">
                                        <a className="nav-link font-sizing-medium text-nowrap" >Welcome, {userLogin.name}</a>
                                    </li>
                                    <li className="nav-item ms-4 dd1">
                                        <a className="nav-link font-sizing-medium" onClick={logout}>Logout</a>
                                    </li>
                                </>

                            )}
                            {/* <li className="nav-item dropdown ms-4">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    More
                                </a>
                                <ul className="dropdown-menu dropdown-off mt-md-2" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" >About</a></li>
                                    <li><a className="dropdown-item" >Contact</a></li>
                                </ul>
                            </li>
                            <li className="nav-item ms-4">
                                <a className="nav-link" >Login</a>
                            </li> */}


                        </ul>
                        {userLogin == null ? (
                            // <form className='form-inline ms-4 my-2 navbar-nav dd2'>
                            <button className="btn btn-outline-danger rounded-pill text-start px-3 widdth font-sizing-medium ms-4 dd2 text-nowrap"
                                data-bs-toggle="modal"
                                data-bs-target="#login"
                                ref={clickOnLoad}
                            >
                                Login/Sign Up
                            </button>

                        ) : (
                            <div className='ms-4 my-2 navbar-nav dd2 d-flex justify-content-center align-items-center dd2'>
                                <div className='text-center dd2'>Welcome, {userLogin.name}</div>
                                <div className='ms-2 dd2'>
                                    <button className="btn btn-outline-danger rounded-pill text-start px-3 widdth font-sizing-medium dd2" onClick={logout}>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </GoogleOAuthProvider>
    )
}

export default Header