import React from "react";
import TopBar from "../Components/TopBar";
import Game from "react-dinosaur-game";
import Resources from "../Resources.js";
import DinoScript from "../DinoScript.js";
import DinoStyle from "../DinoStyle.js";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "../Styles/Dino.css";
import Sadness from "../Images/Sadness.png";

class ChromeDinoComponent extends React.Component {
  appendDinoScript() {
    let dinoScriptContainer = document.createElement("script");
    dinoScriptContainer.appendChild(document.createTextNode(DinoScript));
    this.startDiv.appendChild(dinoScriptContainer);
  }

  appendRunnerScript() {
    let runnerScriptContainer = document.createElement("script");
    runnerScriptContainer.appendChild(
      document.createTextNode(`new Runner('.interstitial-wrapper');`)
    );

    this.endDiv.appendChild(runnerScriptContainer);
  }

  componentDidMount() {
    this.appendDinoScript();

    this.appendRunnerScript();
  }

  render() {
    return (
      <div ref={(el) => (this.startDiv = el)}>
        <style>{DinoStyle}</style>
        <div id="main-frame-error" className="interstitial-wrapper">
          <Resources />

          <div ref={(el) => (this.endDiv = el)}></div>
        </div>
        {/* here */}
        <div style ={{marginTop: 100, marginLeft: 400}}>  
          <div style={{ float: "left" }}>
            <img src={Sadness} style={{ height: 300, width: 300 }}></img>
          </div>
          <div>
            <h2>Awww...Don't Cry</h2>
            <h3>It's just a 404 error!</h3>
            <p></p>
            <h4>
              What you're looking for may have been 
            </h4>
            <h4>
            replaced in Long Term Memory
            </h4>
            <Link to="/UserHome">Back to home</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ChromeDinoComponent;
