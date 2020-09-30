import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const MostLiked = ({votes, anecdotes}) => {
    let i = votes.indexOf(Math.max(...votes))
    console.log("Suurin arvo kohdassa", i)
    if (i===0){
      return(
        <p>no votes yet</p>
      )
    }
    return(
      <div>
        <p>{anecdotes[i]}</p>
        <p>has {votes[i]} votes</p>
      </div>
    )
}

const Likes = ({selected, votes}) => <p>has {votes[selected]} votes</p>

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(Math.floor(Math.random()*anecdotes.length))
  const firstAnecdote = Array.apply(null, Array(anecdotes.length)).map(function() { return 0 })
  const [votes, setVotes] =useState(firstAnecdote)

  const handleClickAnecddote = () => setSelected(Math.floor(Math.random()*anecdotes.length))
  const handleClickLike = () => {
    const copy = [...votes]
    copy[selected]+=1
    setVotes(copy)
  }

  return(
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Likes selected={selected} votes={votes}/>
      <Button onClick={handleClickAnecddote} text="random anecdote" />
      <Button onClick={handleClickLike} text="vote" />

      <h1>Anecdote with most votes</h1>
      <MostLiked votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
