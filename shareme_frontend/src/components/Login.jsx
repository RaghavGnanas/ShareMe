import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import Raghav from "../assets/Raghav.jpg";
import { gapi } from "gapi-script";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN;
  // const clientId =
  //   "378872470560-cs1dmefh2ao7cn411u1tmec5nf6o96pn.apps.googleusercontent.com";

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

  const responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    console.log(name, googleId, imageUrl);

    //DOC FOR SANITY
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });

    // console.log(clientId);
    // console.log(`${process.env.REACT_APP_GOOGLE_API_TOKEN}`);
    console.log("test" + doc);
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          muted
          loop
          autoPlay
          controls={false}
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo.png" width="130px"></img>
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-neutral-600 flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
