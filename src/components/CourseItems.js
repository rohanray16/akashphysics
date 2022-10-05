import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header'

function CourseItems(props) {
    let { home } = props;
    let navigate = useNavigate();
    let goToCourses = () => {
        navigate("/courses");
        window.scrollTo(0, 0);
    }
    let goToCourseItem = (id) => {
        navigate("/course-page/"+id);
        window.scrollTo(0, 0);
    }
    return (
        <>
            <div className="container-fluid heading3 pt-3 hvr pb-5" id='course-section' >
                <div className="text-bg4 text-center" >
                    Courses
                </div>
                <div className="row mx-auto w-87 d-flex flex-row justify-content-evenly">
                    <div className="card border-dark cardw col-xs-12 col-sm-6 col-md-4 d-flex flex-column justify-content-center p-00 mt-5" onClick={() => goToCourseItem(1)}>
                        <div className='cardw-1 p-00 rounded-top'>
                            <img src="./image/class102.png" alt="" className='img-fluid  ' />
                        </div>
                        <div className='h-1000 fon'>
                            <p className='text-center mt-2 bold'>Class 10 course</p> 
                            <div>
                                <p className='text-center'>Start investing in yourself</p>
                            </div>
                        </div>
                    </div>
                    <div className="card border-dark cardw col-xs-12 col-sm-6 col-md-4 d-flex flex-column justify-content-center p-00 mt-5" onClick={() => goToCourseItem(2)}>
                        <div className='cardw-1 p-00 rounded-top'>
                            <img src="./image/class11.png" alt="" className='img-fluid ' />
                        </div>
                        <div className='h-1000 fon'>
                            <p className='text-center mt-2 bold'>Class 11 course</p>
                            <div>
                                <p className='text-center'>Start slow and steady</p>
                            </div>
                        </div>
                    </div>
                    <div className="card border-dark cardw col-xs-12 col-sm-6 col-md-4 d-flex flex-column justify-content-center p-00 mt-5" onClick={() => goToCourseItem(3)}>
                        <div className='cardw-1 p-00 rounded-top'>
                            <img src="./image/class12.png" alt="" className='img-fluid ' />
                        </div>
                        <div className='h-1000 fon'>
                            <p className='text-center mt-2 bold'>Class 12 course</p>
                            <div>
                                <p className='text-center'>Grow fast with balance</p>
                            </div>
                        </div>
                    </div>
                    {(home == true ? (
                        <>
                            <div className="card border-dark cardw col-xs-12 col-sm-6 col-md-4 d-flex flex-column justify-content-center p-00 mt-5" onClick={() => goToCourseItem(5)}>
                                <div className='cardw-1 p-00 rounded-top'>
                                    <img src="./image/crashcourse.png" alt="" className='img-fluid ' />
                                </div>
                                <div className='h-1000 fon'>
                                    <p className='text-center mt-2 bold'>Crash Course</p>
                                    <div>
                                        <p className='text-center'>Possible if you believe</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-dark cardw col-xs-12 col-sm-6 col-md-4 d-flex flex-column justify-content-center p-00 mt-5" onClick={() => goToCourseItem(4)}>
                                <div className='cardw-1 p-00 rounded-top'>
                                    <img src="./image/repeater.png" alt="" className='img-fluid ' />
                                </div>
                                <div className='h-1000 fon'>
                                    <p className='text-center mt-2 bold'>Repeater's Course</p>
                                    <div>
                                        <p className='text-center'>Hard Work and focus</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-dark cardw col-xs-12 col-sm-6 col-md-4 d-flex flex-column justify-content-center p-00 mt-5" onClick={() => goToCourseItem(6)}>
                                <div className='cardw-1 p-00 rounded-top'>
                                    <img src="./image/fastforward.png" alt="" className='img-fluid ' />
                                </div>
                                <div className='h-1000 fon'>
                                    <p className='text-center mt-2 bold'>Fast Forward</p>
                                    <div>
                                        <p className='text-center'>Rapid learning and improvement</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : <>
                    <div className="d-flex justify-content-center mt-5">
                        <button className='btn btn-outline-success' onClick={goToCourses}>View more Courses</button>
                    </div>
                    </>)}
                </div>
            </div>
        </>
    )
}

export default CourseItems