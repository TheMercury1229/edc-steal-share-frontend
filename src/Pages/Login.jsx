import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [playerId, setPlayerId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [verifiedToken, setVerifiedToken] = useState(null);
  const navigate = useNavigate();
  const { gameId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!verifiedToken) {
      console.error("Please verify that you are not a robot");
      return;
    }

    try {
      const res = await axiosInstance.post("/user/connect-to-game", {
        playerId,
        gameId,
        playerName,
        captchaToken: verifiedToken,
      });
      localStorage.setItem("playerId", playerId);

      if (res.status === 200) {
        navigate(`/game/${gameId}`);
      }
    } catch (error) {
      console.error("Failed to connect to the game:", error);
    }
  };

  const verifyCaptcha = (value) => {
    console.log("Captcha value:", value);
    setVerifiedToken(value);
  };

  return (
    <section className="w-full h-[100vh] flex flex-col items-center mt-12 max-w-sm mx-auto relative z-0 overflow-hidden">
      <div>
        <img
          src="/suidtitle.png"
          className="w-[420px] h-[180px] object-cover"
        />
      </div>
      {/* <h1 className="text-2xl font-medium text-center mb-8">
        Login to Game-{gameId}
      </h1> */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          placeholder="Enter Your Id"
          className="px-3 py-2 rounded-md outline-none bg-transparent border-2 w-full border-gray-100 text-lg text-white mx-auto"
        />
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter Your Name"
          className="px-3 py-2 rounded-md outline-none bg-transparent border-2 w-full border-gray-100 text-lg text-white mx-auto"
        />
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_GOOGLE_CLIENT_CAPTCHA_KEY} // Use VITE_ prefix for Vite
          onChange={verifyCaptcha}
        />

        <button
          disabled={!verifiedToken}
          className={`w-full py-4 z-4 border-4 text-xl mx-auto border-black bg-[#e83535d0] hover:bg-[#e83535d0]/80 ${
            !verifiedToken ? "cursor-not-allowed " : ""
          }`}
        >
          Continue
        </button>
      </form>
      <div className="absolute bottom-10 z-[-10]">
        <img src="/myimg.png" className="w-full h-full" />
      </div>
    </section>
  );
};

export default Login;
