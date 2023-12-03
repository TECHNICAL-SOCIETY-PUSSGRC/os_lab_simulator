import { OSAlgorithms } from "./data";
import { useEffect, useState } from "react";
import "../styles/Home_fly.css";

const Home_fly = () => {
  const [curAlgos, setCurAlgos] = useState(OSAlgorithms)
  useEffect(() => console.log(curAlgos), [curAlgos])
  return (
    <>
      <div className="void" id="void">
        <div className="crop">
          <ul className="saste-nashe" id="card-list" style={{ "--count": curAlgos.length }}>
            {curAlgos.map(({name, description}, index) => {
              return (
                <li 
                  key={index}
                  className="saste-nashe-li"
                  style={{
                    animationDelay: `calc((var(--rotate-speed)/var(--count)) * ${-index}s)`
                  }}
                >
                  <div 
                    className="saste-nashe-card"
                    style={{
                      animationDelay: `calc((var(--rotate-speed)/var(--count)) * ${-index}s)`
                    }}
                  >
                    <div>
                      <span className="model-name"> {name} </span>
                      <span> {description} </span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="last-circle"></div>
          <div className="second-circle"></div>
        </div>
        <div className="mask"></div>
        <div className="center-circle">
          <h3>Operating <br /> System <br /> Algorithm</h3>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Home_fly;
