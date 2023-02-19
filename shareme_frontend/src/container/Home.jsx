import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import { Sidebar, UserProfile } from "../components";
import { userQuery } from "../utils/data";
import { client } from "../client";
import Pins from "./Pins";
import logo from "../assets/logo.png";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const [toggleBar, setToggleBar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  //getting USER INFO
  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transistion-h duration-75 ease-out ">
      {/* //Larger screen side bar */}
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      {/* //ToogleMenu */}
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => {
              setToggleBar(true);
            }}
          />
          <Link to={"/"}>
            <img src={logo} alt="logo.img" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo.img" className="w-28" />
          </Link>
        </div>

        {/* smaller screen sideBar */}
        {toggleBar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleBar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleBar} />
          </div>
        )}
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
