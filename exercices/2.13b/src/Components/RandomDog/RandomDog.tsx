import { useEffect, useState } from "react";

function RandomDog( {dogKey} : randomDogProps) {
    const [dog,setDog] = useState<RandomDog>({
        message: "Undefined dog url",
        status: "error"
    })

    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/image/random").then(
            (dogRes) => {
                if (!dogRes.ok) {
                    throw new Error(`Error while fetching dog; status code : ${dogRes.status},status : ${dogRes.statusText}`);
                }
                return dogRes.json()
            }
        ).then(
            (dog) => {
                setDog(dog);
            }
        )
    },[dogKey])
  return <div>
    <img src={dog.message} alt="Random dog image" />
  </div>;
}

interface randomDogProps {
    dogKey:boolean
}

interface RandomDog {
    message: string;
    status: string;
  }

export default RandomDog;
