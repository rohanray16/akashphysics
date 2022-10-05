import React, { useEffect, useState } from 'react'
import CourseItems from './CourseItems'
import Header from './Header'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import Footer from './Footer';

function CoursePage() {
    let [loading, setLoading] = useState(false);
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
            <CourseItems home={true}/>
            <Footer/>
        </>
    )
}

export default CoursePage