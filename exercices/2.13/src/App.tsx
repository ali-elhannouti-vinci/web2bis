import { useEffect, useState } from "react";
import "./App.css";
import Joke from "./type";

function App() {

  const defaultJoke: Joke = {
  error: false,
  category: "Undefined",
  type: "single",
  joke: "Undefined",
  flags: {
    nsfw: false,
    religious: false,
    political: false,
    racist: false,
    sexist: false,
    explicit: false,
  },
  id: 0,
  safe: true,
  lang: "en",
};


  const [joke,setJoke] = useState<Joke>(defaultJoke);

  useEffect(() => {
    fetch("https://v2.jokeapi.dev/joke/Any?type=single").then(
      (jokeRes) => {
        if (!jokeRes.ok) 
          throw new Error(
            `fetch error : ${jokeRes.status} : ${jokeRes.statusText}`
          );
        return jokeRes.json();
      }
    ).then(
      (joke) => {
        setJoke(joke)
      }
    ).catch((e) => {
      console.error(`App Error : `,e);
    })
  },[])

  return <div>
    <div>Category :
      {joke.category}
      </div>
    <div>Joke : {joke.joke}</div>
  </div>;
}
export default App;
