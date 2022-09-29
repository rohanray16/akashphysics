import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Carousel from './Carousel'
import CourseItems from './CourseItems'
import Header from './Header'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'

function Home() {
    let [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    let goToDemo = () => {
        navigate("/demo-videos");
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
            <>
                {loading ? (<></>) : (
                    < Header />
                )}
                <div className={`heading container-fluid {
                    ${loading?"":"mt-10"}
                }`}>
                    <div className="row d-flex justify-content-center align-items-center border-success hth">
                        <div className="col-lg-6 col-md-8">
                            <div>
                                <h1 className="text-center fonth">Offering quality and affordable online Physics training
                                    program for your entrance exams
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div
                            // className="img-main"
                            className='iframe-container'
                        >
                            {/* <img src="/image/mosh-home-2x.jpg" alt="" className="img-fluid img-ht" /> */}
                            <iframe width="560" className='border-frame' height="315" src="https://www.youtube.com/embed/156QqV_VAv4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            {/* <div className="play-btn invisible">
                            <img src="./image/play-1173495_640.png" className="play-ht" />
                        </div> */}
                        </div>
                    </div>

                </div>

                <div className="vh-20"></div>
                <div>
                    <p className="fonta text-center">I never teach my pupils. I only attempt to provide the conditions in which they can learn.</p>
                    <p className="fonta text-center">-Albert Einstein</p>
                </div>

                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h3 className="animate-charcter"> Results 2022</h3>
                        </div>
                    </div>
                </div>



                <Carousel />
                <div className="margin-large"></div>
                <div className='container'>
                    <div className="row d-flex justify-content-center">
                        <p className='text-bg text-center'> &lt; WHY AKASH PHYSICS? &gt; </p>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <p className='text-center text-bg2 '> Clear, Concise, Comprehensive, and Practical </p>
                    </div>
                    <div className="mt-5"></div>
                    <div className="row d-flex justify-content-center align-items-start">
                        <div className="col-lg-4 col-12 ">
                            <p className='text-bg3'>STEP-BY-STEP-LESSONS</p>
                            <p className="text-bg2">Simple and Beginner friendly</p>
                            <p className="">Time and time again, Akash Sir's students praise his ability to break down complex topics into simple, digestible lessons that anyone can understand. </p>
                        </div>
                        <div className="col-lg-4 col-12 d-flex justify-content-end ">
                            <img src="./image/prac.png" alt="img-fluid" className="" height="300px" />
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center align-items-start my-5 ">

                        <div className="col-lg-4 col-12 d-flex justify-content-start order-lg-1 order-md-1 order-sm-2 order-2">
                            <img src="./image/step.png" alt="img-fluid" className="" height="300px" />
                        </div>
                        <div className="col-lg-4 col-12 order-lg-2 order-md-2 order-sm-1 order-1">
                            <p className='text-bg3'>Fast-track Your Learning</p>
                            <p className="text-bg2">Clear and Concise Lessons</p>
                            <p className="">Don't waste any more time on long, repetitive, and poorly-structured courses. Akash Sir's lessons are concise, right to the point, and free of rambling and unnecessary buzzwords. Everything explained in plain English. </p>
                        </div>
                    </div>
                </div>



                <CourseItems home={false} />
                <div className='heading4 pt-5 pb-5 container-fluid'>
                    <div className='row'>
                        <p className='text-center bold h3'>Demo Videos</p>
                    </div>
                    <div className="row d-flex justify-content-between mt-4">
                        <div className='col-xs-12 col-sm-6 col-lg-4 mx-auto d-flex justify-content-center  mt-3'>

                            <iframe className='frame-border' width="200" height="113" src="https://www.youtube.com/embed/pRKfx8jbchs" title="Class 11th | Gravitation | Force and Energy" frameBorder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className='col-xs-12 col-sm-6 col-lg-4 d-flex justify-content-center mt-3'>
                            <iframe className='frame-border' width="200" height="113" src="https://www.youtube.com/embed/QGud4ncI5UM" title="SHM Time Period" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className='col-xs-12 col-sm-6 col-lg-4 d-flex justify-content-center mt-3 mb-3'>
                            <iframe className='frame-border' width="200" height="113" src="https://www.youtube.com/embed/SGUkffbyIHI" title="Class 11th | Properties of Matter | Surface Tension" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                            <button className='btn btn-outline-warning' onClick={goToDemo}>View more videos</button>
                        </div>
                    </div>
                    {/* <div className="d-flex justify-content-center mt-5 mb-3">
                    <button className='btn btn-outline-dark'>View more videos</button>
                </div> */}

                </div>
                <div className="heading5 pt-5">
                    <div>
                        <p className='text-center fontf' >Contact/Whatsapp at 8697317359 for queries</p>
                    </div>
                </div>
            </>


            {/* <div className='h-100 heading2 '>

            </div> */}
        </>
    )
}

export default Home