import React from "react";
import TopBar from "../Components/TopBar";
import Game from "react-dinosaur-game";
import Resources from "../Resources.js";
import DinoScript from "../DinoScript.js";
import DinoStyle from "../DinoStyle.js";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "../Styles/Dino.css";

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
        <h1>Awww...Don't Cry</h1>
        <h2>It's just a 404 error!</h2>
        <h4>
          The link you followed may be broken, or the page may have been
          removed.
        </h4>
        
        <Link to="/UserHome">Back to home</Link>
      </div>
    );
  }
}

export default ChromeDinoComponent;

