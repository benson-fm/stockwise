import stocks from "../assets/stocks.jpg";
import Typewriter from "typewriter-effect";
import Transition from "../../lib/transition";
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tracker'); // Replace with your route
  };

  return (
    <>
      <div className="w-full min-h-dvh bg-black flex justify-center items-center">
        <Transition>
          <div className="py-20 px-36 flex flex-col gap-20 h-full">
            <p className="font-inter text-white tracking-wide font-bold text-lg basis-1/6">
              stock<span className="text-accentOne">wise</span>
            </p>
            <div className="text-white font-bold font-inter basis-5/6 justify-between items-center gap-20 lg:gap-0 flex flex-row w-full">
              <div className="h-full flex flex-col gap-14 basis-1/2">
                <div className="flex flex-col text-4xl 2xl:text-6xl 3xl:text-7xl gap-3">
                  <p>
                    Real-time Insights, <br />
                    <span className="text-accentTwo font-inter">
                      <Typewriter
                        options={{
                          strings: [
                            "AI Driven Analysis",
                            "Transform Strategy",
                            "Maximize Returns",
                            "Analyze Sentiments",
                          ],
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </span>
                  </p>
                </div>
                <Transition transitionDuration={1.5}>
                  <p className="font-thin hidden lg:block lg:text-2xl xl:text-3xl 3xl:text-5xl">
                    Real-time AI-powered stock sentiment insights for{" "}
                    <span className="font-bold text-accentTwo">wiser </span>
                    investments.
                  </p>
                </Transition>
                <Transition transitionDuration={2}>
                  <div className="flex flex-row justify-start items-center gap-6">
                    <button className="btn btn-outline btn-accent" onClick={handleClick}>App</button>
                    <button className="btn btn-outline btn-accent" onClick={() => window.location.href = 'https://github.com/benson-fm/stockwise'}>
                      Github
                    </button>
                  </div>
                </Transition>
              </div>
              <div className="h-full w-1/2 items-center justify-center">
                <img src={stocks} className="h-auto min-w-full rounded-xl" />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
}
