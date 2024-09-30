import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";

const Home = () => {
  const [activeGames, setActiveGames] = useState([
    // {
    //   gameId: "test",
    // },
  ]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchGames = async () => {
    try {
      // Need to create a route which can retrun the active games currently using this endpoint
      const res = await axiosInstance.get("/user/get-active-games");
      setActiveGames(res.data.games);
      localStorage.setItem("token", res.data.token);
      console.log(res.data.token);
    } catch (error) {
      setError("Failed to fetch active games. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  if (isLoading) {
    return (
      <section className="w-full h-full max-w-sm mx-auto flex flex-col items-center justify-center pt-32 gap-8">
        <p>Loading active games...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full h-full max-w-sm mx-auto flex flex-col items-center justify-center pt-32 gap-8">
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="w-full h-full max-w-sm mx-auto flex flex-col items-center justify-center pt-10 gap-8 relative z-[0]">
      <div className="absolute top-5 z-[-10]">
        <img src="/suidtitle.png" alt="logo" />
      </div>
      <div className="mt-36 flex flex-col gap-8">
        <h1 className="text-3xl">Active Games</h1>
        <div className="flex flex-col gap-4 items-center justify-center">
          {activeGames.length > 0 ? (
            activeGames.map((game) => (
              <Link
                key={game.gameId}
                to={`/login/${game.gameId}`}
                className="block"
              >
                <h2 className="text-3xl text-center mb-4">
                  Game-{game.gameId}
                </h2>
                <button className="w-[100%] py-4 border-4 px-4 text-xl border-white bg-[#e83535d0] hover:bg-[#e83535d0]/80 ">
                  Proceed to Game
                </button>
              </Link>
            ))
          ) : (
            <p>No active games available at the moment.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
