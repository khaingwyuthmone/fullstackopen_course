import { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Button";


function App() {
  const [good,setGood] = useState(0);
  const [neutral,setNeutral] = useState(0);
  const [bad,setBad] = useState(0);

  let average = (good+neutral+bad)/3;
  let percentage = (good/(good+neutral+bad)) * 100;
  percentage  = percentage ? percentage : '';
  
 
  return (
    <div>
      <h2>Give Feedback</h2>

      <Button text="good" handler={() => setGood(good+1)}/>
      <Button text="neutral" handler={() => setNeutral(neutral+1)}/>
      <Button text="bad" handler={() => setBad(bad+1)}/>
      

      <h2>Statistics</h2>
      <Statistics 
        good={good}
        bad={bad}
        neutral={neutral}
        average={average}
        percentage={percentage}
      />
    </div>
  );
}

export default App;
