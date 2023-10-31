import React from 'react'
import videoHomePage from "../../assets/intro-home.mp4"
import { AiOutlineArrowRight } from "react-icons/ai";

const Home = () => {
    return (
        <div className="home-container w-100 ">
            <div className="d-flex w-100 h-100 p-3 m-auto pt-5">
                <div className="w-50 m-auto">
                    <h1
                        style={{
                            fontSize: "50px",
                            fontWeight: "600px",
                            marginLeft: "100px"
                        }}
                    >
                        Welcome to Homepage
                    </h1>
                    <div className="mt-3"></div>
                    <div className="mt-3 w-100 d-flex justify-content-center">
                        <div className="text-box">
                            <div className="lg_row" style={{}}>
                                <p
                                    //onClick={() => navigate("/check_in")}
                                    style={{
                                        border: "2px solid black",
                                        color: "#000",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <AiOutlineArrowRight /> Bla Bla
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end w-50">
                    <video
                        className=" right-0"
                        width="100%"
                        autoPlay
                        muted
                        loop
                        style={{
                            borderRadius: "10px",
                        }}
                    >
                        <source src={videoHomePage} type="video/mp4" />
                    </video>

                </div>
            </div>
        </div>
    );
}

export default Home