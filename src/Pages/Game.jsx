import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WebSocketSingleton from "../utils/websocketSingleton";
import { FaStopwatch } from "react-icons/fa";
import { RiCircleLine, RiSquareLine, RiTriangleLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
// import Cookie from "js-cookie"

const Game = () => {
  const { gameId } = useParams();
  const [points, setPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Example countdown time
  const [isClicked, setIsClicked] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const wsSingleton = new WebSocketSingleton();
    const ws = wsSingleton.getConnection();

    if (ws) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        try {
          if (data.type === "display-round-points") {
            setPoints(data.points);
          } else if (data.type === "round-start") {
            setTimeLeft(30);
            toast.success("Round started!");
            setGameOver(false);
            setIsClicked(false);
          } else if (data.type === "tick") {
            setTimeLeft(data.remainingTime);
          } else if (data.type === "round-end") {
            setTimeLeft(0);
            toast.success("Round ended!");
            setIsClicked(true); // Disable buttons after round ends
            setGameOver(true); // Set game over state
          } else if (
            data.type === "notice" &&
            data.message === "Points Calculated"
          ) {
            // setPoints(data.newPoints);
            setIsClicked(true); // Disable buttons after points are calculated
          } else {
            console.log(data.message);
          }
        } catch (error) {
          toast.error(error.message);
          console.error("Error parsing WebSocket message:", error);
          console.log("Received message:", event.data);
        }
      };

      ws.onopen = () => {
        console.log("WebSocket is open now.");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = (event) => {
        console.log("WebSocket is closed now.", event.code);
        if (event.code === 1006) {
          // Too Many Requests
          toast.error(
            "You have exceeded the connection limit. Please try again later."
          );
        } else if (event.code === 1005) {
          // Too Many Requests
          toast.error(
            "You have exceeded the messaging limit. Please try again later."
          );
        }
      };

      // Cleanup function when the component unmounts
      /* return () => {
        // Only close the WebSocket if it should be terminated
        // if the singleton pattern requires persistence, omit this
        ws.close();
      }; */
    }
  }, []);

  const handleChoice = (choice) => {
    const ws = wsSingleton.getConnection();

    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log("Received choice:", choice);
      ws.send(
        JSON.stringify({
          type: "submit",
          move: choice,
          gameId: parseInt(gameId),
          userId: localStorage.getItem("playerId"),
        })
      );
      setIsClicked(true); // Disable buttons after making a choice
    }
  };

  return (
    <section className="w-full h-full max-w-sm mx-auto flex flex-col gap-8 relative z-0">
      {/* <div className="absolute bottom-[-100%] mx-auto z-[-10]">
        <img
          src="/pinksquid.png"
          className="w-[440px] h-[440px] object-cover"
        />
      </div> */}
      <div className="absolute bottom-[-97%] z-[-12]">
        <img
          src="/myimg.png"
          alt="bg-image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center justify-between w-[90%] mx-auto pt-4 pb-3">
        {/* <div className="bg-black/30 py-1 px-5 rounded-full text-lg flex items-center justify-center gap-2">
          <RiCopperCoinLine />
          {points}
        </div> */}
        <div className="bg-white/30 py-1 px-5 rounded-full text-lg flex items-center justify-center gap-2">
          <FaStopwatch />
          {timeLeft > 0 ? timeLeft : "Round Over"}
        </div>
      </div>
      <div className="flex mt-[10vh] text-2xl items-center justify-center gap-2 text-black">
        <RiTriangleLine size={70} className="text-white" />
        <RiSquareLine size={70} className="text-white" />
        <RiCircleLine size={70} className="text-white" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 pt-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleChoice("share");
          }}
          disabled={isClicked || gameOver}
          className={`w-[80%] py-4 border-4 text-xl font-bold border-white-100 bg-[#e83535d0] hover:bg-[#e83535d0]/80 ${
            isClicked || gameOver ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          SHARE
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleChoice("steal");
          }}
          disabled={isClicked || gameOver}
          className={`w-[80%] py-4 border-4 text-xl font-bold border-white-100 bg-[#e83535d0] hover:bg-[#e83535d0]/80 ${
            isClicked || gameOver ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          STEAL
        </button>
      </div>
    </section>
  );
};

export default Game;
