import { useState } from "react";
import Grid from "./Grid";
import "./App.css";
import { Fragment } from "react";

function App() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStartClick = () => {
    setIsStarted(true);
  };

  const handleResetClick = () => {
    window.location.reload();
  };

  return (
    <Fragment>
      <button onClick={handleStartClick}>Start</button>
      <button onClick={handleResetClick}>Reset</button>
      <Grid className="grid" isStarted={isStarted}></Grid>
    </Fragment>
  );
}

export default App;
