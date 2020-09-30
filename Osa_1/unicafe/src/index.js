import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const StatisticLine = (props) =>{
  if(props.text==="positive"){
    return(
      <tr>
        <td>{props.text}</td>
        <td>{Math.round(props.value*10)/10}%</td>
      </tr>
    )
  }

  return(
    <tr>
      <td>{props.text}</td>
      <td>{Math.round(props.value*10)/10}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if(props.good===0 && props.neutral===0 && props.bad===0){
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return(
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="average" value={(props.good-props.bad)/(props.good+props.neutral+props.bad)} />
          <StatisticLine text="positive" value={props.good/(props.good+props.neutral+props.bad)*100} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const App = () =>{
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () =>setGood(good+1)
  const handleNeutralClick = () =>setNeutral(neutral+1)
  const handleBadClick = () =>setBad(bad+1)

  return(
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
