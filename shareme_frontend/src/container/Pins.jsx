import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Createpin, Feed, Navbar, Pindetails, Search } from "../components";

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");

  console.log(user + "[]jkgjg");

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user && user}
        />
      </div>

      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-details/:pinId"
            element={<Pindetails user={user && user} />}
          />
          <Route
            path="/create-pin"
            element={<Createpin user={user && user} />}
          />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
