import React from 'react'
import { useState } from 'react';
import Header from './Header'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import Footer from './Footer';

function About() {
    let [queryMail, setQueryMail] = useState("");
    let [queryName, setQueryName] = useState("");
    let [queryPhone, setQueryPhone] = useState();
    let [queryQuery, setQueryQuery] = useState("");
    let [loading, setLoading] = useState(false);
    let queryFormHandler = async (event) => {
        event.preventDefault();
        let URL = "https://akashphysicsbackend.onrender.com//api/add-query"
        try {
            let response = await axios.post(URL, {
                name: queryName,
                email: queryMail,
                phone: queryPhone,
                query: queryQuery
            });
            console.log("response check")
            console.log(response);
            if (response.data.result) {
                Swal.fire({
                    icon: "success",
                    title: "Query Submitted, You will be replied shortly",
                }).then(() => {
                    // window.location.assign("/");
                    window.location.reload();
                });
            }
        } catch (error) {
            alert("error")
            console.log(error);
        }
    }
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [])
    return (
        <>
            {loading ? (
                <div className='loading-element'>
                    <ClimbingBoxLoader
                        color="#36d7b7"
                        size={19}
                        speedMultiplier={1}
                        loading={loading}
                    />
                </div>
            ) : (<></>)}
            {loading ? (<></>) : (
                < Header />
            )}
            <div className='heading6 pt-5 pb-4 container-fluid'>
                <div className="row">
                    <div className='col-12 col-md-6 d-flex justify-content-center about-ht pt-5'>
                        <img src="/image/akashperson.jpg" className='img-fluid border border-white' alt="" />
                    </div>
                    <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-start about-ht pt-5">
                        <h2>AKASH KUMAR</h2>
                        <h4>IIEST Shibpur, CS Department</h4>
                        <p className='fa fa-dot-circle-o'> 2 years at PricewaterhouseCoopers Pvt Ltd</p>
                        <p className='fa fa-dot-circle-o'> 4 years teaching experience to Senior section and foundations</p>
                        <p className='fa fa-dot-circle-o'> Ex-Faculty at Partha institutions (2019-2021)</p>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt-4 pb-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-md-6">
                        <h4 className='text-center'>For more queries, call/whatsapp at 8697317359</h4>
                        <h4 className='text-center'>Or</h4>
                        <h4 className='text-center'>Fill up the following form</h4>

                        <form onSubmit={queryFormHandler}>
                            <div className="form-group">
                                <label htmlFor="exampleInputName">Name</label>
                                <input type="text" className="form-control" id="exampleInputName" placeholder="Enter Student Name" required
                                    value={queryName} onChange={(e) => { setQueryName(e.target.value) }}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Student email" required
                                    value={queryMail} onChange={(e) => { setQueryMail(e.target.value) }}
                                />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="exampleInputNumber">Phone Number</label>

                                <input type="number" className="form-control" id="exampleInputNumber" placeholder="Enter 10-digit Student Phone Number"
                                    value={queryPhone} onChange={(e) => { setQueryPhone(e.target.value) }}

                                    required />
                                <small id="phoneHelp" className="form-text text-muted">We'll never share your phone number with anyone else.</small>

                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="exampleInputQuery">Query</label>
                                <textarea className="form-control" id="exampleInputQuery" placeholder="Enter your query" rows="5" required
                                    value={queryQuery} onChange={(e) => { setQueryQuery(e.target.value) }}
                                />
                            </div>
                            <div className='d-flex justify-content-center  pt-2'>
                                <button type="submit" className="btn btn-primary mt-2">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default About