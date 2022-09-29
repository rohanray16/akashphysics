import axios from 'axios';
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import Header from './Header'
import Swal from "sweetalert2";
import jwtDecode from 'jwt-decode';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'

function Course() {
  let closeModal = useRef();
  let userNameRef = useRef();
  let emailRef = useRef();
  let addressRef = useRef();
  let phoneRef = useRef();
  let params = useParams();
  let [coursepd, setCoursePd] = useState(false);

  let [queryMail, setQueryMail] = useState("");
  let [queryName, setQueryName] = useState("");
  let [queryPhone, setQueryPhone] = useState();
  let [queryQuery, setQueryQuery] = useState("");
  let [loading, setLoading] = useState(false);
  let initCourse = {
    course_id: 0,
    title: "title",
    heading: "heading",
    para: [""],
    fees: 0
  }
  let [courseDetails, setCourseDetails] = useState({ ...initCourse });
  let getCourseDetails = async () => {
    let URL = "https://akashphysics-backend.herokuapp.com/api/get-course/" + params.id;
    try {
      let response = await axios.get(URL);
      let data = response.data;
      if (data.status) {
        setCourseDetails({ ...data.course })
      }
      else {
        setCourseDetails({ ...initCourse });
      }
    } catch (error) {
      alert("error");
      console.log(error);
    }

  }
  let enrollment = () => {
    let token = localStorage.getItem("auth-token");
    if (token) {
      return true;
    }
    return false;
  }
  let coursePaid = async () => {
    let URL = "https://akashphysics-backend.herokuapp.com/api/paids";
    let token = localStorage.getItem("auth-token");
    console.log("hehehehehe")
    if (token) {
      try {
        let response = await axios.post(URL, {
          email: jwtDecode(token).email
        });
        console.log("entry donw man")
        console.log(jwtDecode(token).email)
        console.log(response.data);
        if (response.data.result) {
          console.log(response.data.result)
          setCoursePd(true);
          console.log("entry done");
        }
      } catch (error) {
        alert("error");
        console.log(error);
      }
    }
  }
  //Payment methods
  let loadScript = async () => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://checkout.razorpay.com/v1/checkout.js";
    scriptElement.onload = () => { return true };
    scriptElement.onerror = () => { return false };
    document.body.appendChild(scriptElement);
  }
  let makePayment = async () => {

    let isLoaded = await loadScript();
    if (isLoaded) {
      alert('unable to load');
      return false;
    }
    let URL = "https://akashphysics-backend.herokuapp.com/api/payment";
    let sendData = {
      "amount": "" + courseDetails.fees,
      "email": "" + emailRef.current.value,
      "name": "" + userNameRef.current.value,
      "phone": "" + phoneRef.current.value,
      "address": "" + addressRef.current.value,
      "course": "" + courseDetails.title
    }
    closeModal.current.click();
    try {
      let { data } = await axios.post(URL, sendData);
      let { order } = data;
      var options = {
        key: "rzp_test_stg4Xq3wPuMpMj", // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Akash Physics Payment",
        description: "Course fee payment",
        image: "/image/akash physics",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async (response) => {
          let URL = "https://akashphysics-backend.herokuapp.com/api/callback";
          let sendData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          }
          try {
            let paymentStatus = await axios.post(URL, sendData);
            let { data } = paymentStatus;
            let { signatureIsValid } = data;
            if (signatureIsValid) {
              let URL2 = "https://akashphysics-backend.herokuapp.com/api/verify";
              let verifyAction = await axios.post(URL2, {
                email: emailRef.current.value,
                verifyStatus: signatureIsValid,
                razorpay_order_id: sendData.razorpay_order_id,
                razorpay_payment_id: sendData.razorpay_payment_id,
                razorpay_signature: sendData.razorpay_signature
              })
              Swal.fire({
                icon: "success",
                title: "Payment Successful",
              }).then(() => {
                // window.location.assign("/");
                window.location.reload();
              });
            }
          } catch (error) {
            alert("error");
            console.log(error);
          }
        },
        prefill: {
          name: "Rohan Ray",
          email: "rohanandmail@gmail.com",
          contact: "8768366427"
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
      };
      var paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error)
    }
  }

  let queryFormHandler = async (event) => {
    event.preventDefault();
    let URL = "https://akashphysics-backend.herokuapp.com/api/add-query"
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
    getCourseDetails();
    enrollment();
    coursePaid();
    

  }, []);
  return (
    <>
      <div
        className="modal fade"
        id="enrol"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">
                {courseDetails.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter full Name"
                  ref={userNameRef}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Email must be same as login email"
                  ref={emailRef}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter 10-digit Student Phone Number"
                  ref={phoneRef}
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Address
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  ref={addressRef}
                ></textarea>
              </div>
              <div className="mb-2">
                <h3>Course: {courseDetails.title}</h3>
              </div>
              <div className="mb-2 ">
                <h3>Total: <i className='fa fa-rupee'></i>{courseDetails.fees}</h3>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                Back
              </button>
              <button
                className="btn btn-success"
                onClick={makePayment}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
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
      <div className="heading4 container-fluid mt-10 p-5">
        <div className="row d-flex justify-content-center align-items-center border-success hth">
          <div className="col-lg-6 col-md-8">
            <div className=''>
              <p className="text-center fonth">{courseDetails.title}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className="row ">
          <div className="col-12 col-lg-6 p-5">
            <h4 className='mb-4 text-center'>{courseDetails.heading}</h4>
            {courseDetails.para.map((item, index) => {
              return (
                <p className=''><i className='fa fa-check-circle'></i> {item}</p>
              )
            })}
            <p className='h4'>Monthly fees: <i className='fa fa-rupee'> {courseDetails.fees}</i>.</p>
            <div className='d-flex justify-content-center '>
              {!coursepd ? (
                <button className='btn btn-outline-dark fa fa-shopping-cart'
                  data-bs-toggle="modal"
                  data-bs-target={enrollment() ? "#enrol" : "#login"}
                > Enroll Now</button>
              ) : (
                <h5 className='fa fa-check'>Enrolled</h5>
              )}
            </div>
            {enrollment() ? (
              <></>
            ) : <div className='text-center text-success'>(Log in to enroll)</div>}
          </div>
          <div className="col-12 col-lg-6 p-5 d-flex flex-column justify-content-center">

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
                <button type="submit" className="btn btn-primary mt-5">Submit</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </>
  )
}

export default Course