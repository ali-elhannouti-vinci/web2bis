import { useEffect, useState } from "react";
import "./App.css";
import Joke from "./type";

function App() {

  const [joke,setJoke] = useState<Joke | undefined>(undefined);

   const fetchJoke = () => {
    fetch("https://v2.jokeapi.dev/joke/Any?type=single").then(
      (jokeRes) => {
        if (!jokeRes.ok) 
          throw new Error(
            `fetch error : ${jokeRes.status} : ${jokeRes.statusText}`
          );
        return jokeRes.json();
      }
    ).then(
      (jokeData) => {
        setJoke({
          joke: jokeData.joke ?? "No joke found",
          category: jokeData.category ?? "Unknown",
        });
      }
    ).catch((e) => {
      console.error(`App Error : `,e);
    })
   }

  useEffect(() => {
    fetchJoke();
    const intervalJokeChange = setInterval(fetchJoke,10000)
    return () => clearInterval(intervalJokeChange);
  },[])

  if (!joke) {
    return <p>Loading...</p>;
  }

  return <div>
    <div>Category :
      {joke.category}
      </div>
    <div>Joke : {joke.joke}</div>
  </div>;
}
export default App;
