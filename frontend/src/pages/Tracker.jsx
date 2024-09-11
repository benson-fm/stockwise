import React, { useState } from "react";
import StockSentimentLogo from "../assets/logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import Transition from "../../lib/transition";

export default function Tracker() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sentimentOverview, setSentimentOverview] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
    action: "",
  });
  const [sentimentDescription, setSentimentDescription] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // Replace with your route
  };

  const handleSearch = async () => {
    setLoading(true); // Set loading to true when request starts
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/stocks/parse/${searchTerm}`
      );
      const data = response.data;

      // Update state with fetched data
      setSentimentOverview({
        positive: data.positive,
        neutral: data.neutral,
        negative: data.negative,
        action: data.action,
      });
      setSentimentDescription(data.description);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false when request finishes
    }
  };

  return (
    <div className="w-full min-h-dvh bg-[#111827] flex justify-center items-center flex-col gap-2">
      {/* Back Button Container */}
      <div className="w-full px-20 flex justify-start">
        <button
          onClick={handleClick}
          className="flex items-center gap-2 text-white"
        >
          <GoArrowLeft size={20} color="white" />
          <p className="font-inter text-lg">Back</p>
        </button>
      </div>

      {/* Logo and Title Section */}
      <Transition transitionDuration={0.5}>
        <div className="flex flex-col justify-center items-center pb-10">
          <StockSentimentLogo />
          <p className="font-inter text-white tracking-wide font-bold text-3xl">
            stock<span className="text-accentOne">wise</span>
          </p>
          <p className="font-thin text-xl text-white">
            AI-Driven Stock Sentiment Tracking
          </p>
        </div>
      </Transition>

      {/* Search Section */}
      <Transition transitionDuration={0.5}>
        <div className="flex flex-col py-20 px-36 h-full bg-[#111827] rounded-2xl text-white font-inter gap-10 border-accentOne border-2">
          <Transition transitionDuration={0.75}>
            <div className="flex flex-row w-full items-center gap-2">
              <div>
                <p className="font-bold text-2xl">Stock Sentiment Tracker</p>
                <p className="text-[#9ca3af]">
                  Track the sentiment for your favorite stocks
                </p>
              </div>
            </div>
          </Transition>

          {/* Search Input */}
          <Transition transitionDuration={1}>
            <div className="flex flex-row gap-5">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full bg-[#1f2937]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-accent"
                onClick={handleSearch}
                disabled={loading}
              >
                Search
              </button>
            </div>
          </Transition>

          {/* Conditional Rendering for Loading or Results */}
          <Transition transitionDuration={1.25}>
            {loading ? (
              <div className="w-full flex justify-center items-center h-64">
                <div className="text-white text-xl">Loading...</div>
              </div>
            ) : (
              <div className="flex flex-row gap-10">
                {/* Sentiment Overview */}
                <div className="card bg-[#1f2937] w-96 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-accentTwo">
                      Sentiment Overview
                    </h2>
                    <div className="flex flex-col gap-3 font-bold h-full">
                      <div className="w-full flex flex-row justify-between">
                        <p>Positive</p>
                        <p className="text-[#22c55e] text-end">
                          {sentimentOverview.positive}%
                        </p>
                      </div>
                      <div className="w-full flex flex-row justify-between">
                        <p>Neutral</p>
                        <p className="text-[#d6d3d1] text-end">
                          {sentimentOverview.neutral}%
                        </p>
                      </div>
                      <div className="w-full flex flex-row justify-between">
                        <p>Negative</p>
                        <p className="text-[#ef4444] text-end">
                          {sentimentOverview.negative}%
                        </p>
                      </div>
                      <div className="w-full flex-1 flex justify-center items-center">
                        <div className="h-5/6 w-1/2 rounded-lg bg-accentOne flex justify-center items-center text-center">
                          <p className="text-white text-4xl">
                            {sentimentOverview.action}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sentiment Description */}
                <div className="card bg-[#1f2937] w-96 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-accentTwo">
                      Sentiment Description
                    </h2>
                    <p>{sentimentDescription}</p>
                  </div>
                </div>
              </div>
            )}
          </Transition>
        </div>
      </Transition>
    </div>
  );
}
