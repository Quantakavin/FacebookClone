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
      <>
        <TopBar></TopBar>
        <div ref={(el) => (this.startDiv = el)}>
          <style>{DinoStyle}</style>
          <div id="main-frame-error" className="interstitial-wrapper">
            <Resources />

            <div ref={(el) => (this.endDiv = el)}></div>
          </div>
          {/* here */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{ marginTop: 60, display: "flex", flexDirection: "row" }}
            >
              <div style={{ alignSelf: "flex-end" }}>
                <img src={Sadness} style={{ height: 300, width: 300 }}></img>
              </div>
              <div style={{ marginTop: 30 }}>
                <h2>Awww...Don't Cry</h2>
                <p></p>
                <p></p>
                <p></p>
                <h3>It's just a 404 error!</h3>
                <p></p>
                <p></p>
                <p></p>
                <p></p>

                <h6>What you're looking for may have been</h6>
                <h6>replaced in Long Term Memory</h6>
                <Link to="/UserHome">Back to home</Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ChromeDinoComponent;
