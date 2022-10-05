import React from 'react'
import Header from './Header'
import { useEffect } from 'react'
import { useState } from 'react'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import Footer from './Footer'

function DemoVideos() {
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
            <div className='heading6 pt-5 pb-5 container-fluid' id='demo-video'>
                <div className='row'>
                    <p className='text-center bold h3'>Demo Videos</p>
                </div>
                <div className="row d-flex justify-content-between mt-4 align-items-center">
                <div className='h2 mt-1 text-center'>Check out below videos</div>
                    <div className='col-xs-12 col-sm-6 col-lg-4 mx-auto d-flex justify-content-evenly  mt-3'>

                        <iframe className='frame-border' width="560" height="313" src="https://www.youtube.com/embed/pRKfx8jbchs" title="Class 11th | Gravitation | Force and Energy" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className='col-xs-12 col-sm-6 col-lg-4 d-flex justify-content-center mt-3'>
                        <iframe className='frame-border' width="560" height="313" src="https://www.youtube.com/embed/QGud4ncI5UM" title="SHM Time Period" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className='col-xs-12 col-sm-6 col-lg-4 d-flex justify-content-center mt-3'>
                        <iframe className='frame-border' width="560" height="313" src="https://www.youtube.com/embed/SGUkffbyIHI" title="Class 11th | Properties of Matter | Surface Tension" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className='col-xs-12 col-sm-6 col-lg-4 d-flex justify-content-center mt-3'>
                        <iframe className='frame-border' width="560" height="313" src="https://www.youtube.com/embed/v0I1vs5gGMU" title="Class 12th | Gauss Law| Part 1 | Electrostatics" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className='col-xs-12 col-sm-6 col-lg-4 d-flex justify-content-center mt-3'>
                        <iframe className='frame-border' width="560" height="313" src="https://www.youtube.com/embed/iArGXw_cHGE" title="Class 11th | HCV Discussion | Rotation OBJECTIVES" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className='col-xs-12 col-sm-6 col-lg-4 d-flex justify-content-center mt-3'>
                        <iframe className='frame-border' width="560" height="313" src="https://www.youtube.com/embed/fZxeLKu_fU4" title="Class 11th | Work Energy theorem | Class Problems" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
                {/* <div className="d-flex justify-content-center mt-5 mb-3">
                    <button className='btn btn-outline-dark'>View more videos</button>
                </div> */}
                

            </div>
            <Footer/>
        </>
    )
}

export default DemoVideos