import {
  OSAlgorithms,
  graphAlgo,
  dpAlgo,
  btAlgo,
  searchingAlgo,
  sortingALgo,
  aiAlgo,
} from "./data";
import { useEffect, useState } from "react";
import "../styles/Home_fly.css";
import Footer from "./Footer";

const Home_fly = () => {
  const [curAlgos, setCurAlgos] = useState(OSAlgorithms);
  const [ptext, setPtext] = useState("Operating System Algorithms");

  const handleCaptureText = (id) => {
    const paragraph = document.getElementById(id);
    if (paragraph) {
      const text = paragraph.innerText;
      setPtext(text);
    }
  };

  // const handleAlgoName=(algoname)=>{
  //   setCurAlgos(algoname)
  // }

  return (
    <div className="home-fly-main">
      <div className="void" id="void">
        <div className="crop">
          <ul
            className="saste-nashe"
            id="card-list"
            style={{ "--count": curAlgos.length }}
          >
            {curAlgos.map(({ name, description }, index) => {
              return (
                <li
                  key={index}
                  className="saste-nashe-li"
                  style={{
                    animationDelay: `calc((var(--rotate-speed)/var(--count)) * ${-index}s)`,
                  }}
                >
                  <div
                    className="saste-nashe-card"
                    style={{
                      animationDelay: `calc((var(--rotate-speed)/var(--count)) * ${-index}s)`,
                    }}
                  >
                    <div className="saste-desc">
                      <span className="model-name"> {name} </span>
                      <span> {description} </span>
                      <br />
                      <button>Read Full Docs</button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="last-circle"></div>
          <div className="second-circle"></div>
        </div>
        <div className="mask"></div>
        <div className="center-circle">
          <h3 className="center-circle-text">{ptext}</h3>
        </div>
        <div></div>
      </div>

      <div className="sidebar">
        <h1 className="side-upper-heading">Select Your Categary</h1>
        <div className="side-nav-container">
          <div className="side-nav">
            <p
              className="side-side-text"
              id="graphAlgo"
              onClick={() => {
                handleCaptureText(`graphAlgo`);
                setCurAlgos(graphAlgo);
              }}
            >
              Graph Algorithms
            </p>

            <p
              className="side-side-text"
              id="sortAlgo"
              onClick={() => {
                handleCaptureText("sortAlgo");
                setCurAlgos(sortingALgo);
              }}
            >
              Sorting Algorithms
            </p>

            <p
              className="side-side-text"
              id="searchAlgo"
              onClick={() => {
                handleCaptureText("searchAlgo");
                setCurAlgos(searchingAlgo);
              }}
            >
              Searching Algorithms
            </p>

            <p
              className="side-side-text"
              id="btAlgo"
              onClick={() => {
                handleCaptureText("btAlgo");
                setCurAlgos(btAlgo);
              }}
            >
              Backtracking Algorithms
            </p>

            <p
              className="side-side-text"
              id="osAlgo"
              onClick={() => {
                handleCaptureText("osAlgo");
                setCurAlgos(OSAlgorithms);
              }}
            >
              Operating System Algorithms
            </p>
            <p
              className="side-side-text"
              id="AIalgo"
              onClick={() => {
                handleCaptureText("AIalgo");
                setCurAlgos(aiAlgo);
              }}
            >
              Artificial Inteligence Algorithms
            </p>

            <p
              className="side-side-text"
              id="dpAlgo"
              onClick={() => {
                handleCaptureText("dpAlgo");
                setCurAlgos(dpAlgo);
              }}
            >
              Dynamic Programming Algorithms
            </p>
          </div>
        </div>

        <script src="https://use.fontawesome.com/c9d2b81f44.js"></script>
      </div>
      <Footer />
    </div>
  );
};

export default Home_fly;
