// pages/Home.js

import React from "react";
import { Link } from "react-router-dom";



const Home = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4 nav1">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
            <Link to="/" className="my-logo">
               <img src="./images/logo.png" alt=""/>
            </Link>
            </div>    
            <h1 className="my"> Place Finder
            </h1>  
            <div className="flex items-center">
              <Link to="/login" className="loginbutton">
                Login
              </Link>
              <Link to="/signup" className="siginbutton">
                Signup
              </Link>
              <h1></h1>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-md mx-auto p-4">
      <box className="top">
        <div className="heroimg">
                </div></box>
            
      </div>
      <box className="searchbar">
        <input className="searchbar1"placeholder=""/>
      </box>
      <button className="search">
       </button>
        <box className="pbox">
        </box>
        <box className="pbox">
        </box>
        <box className="pbox">
        </box>
        
    </div>
  );
};

export default Home;
