import { useEffect, useState } from "react";

function RandomDog() {
    const [dog,setDog] = useState<RandomDog>({
        message: "Undefined dog url",
        status: "error"
    })

    const fetchDog = async () => {
        try {
            const response = await fetch("https://dog.ceo/api/breeds/image/random");

            if (!response.ok) {
                throw new Error(`Error while fetching dog; status code : ${response.status},status : ${response.statusText}`);
            }
            const responseJson = await response.json();

            setDog(responseJson);
        
        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        fetchDog();
        const fetchNewDog = setInterval(fetchDog,5000)
        return () => clearInterval(fetchNewDog);
    },[])
  return <div>
    <img src={dog.message} alt="Random dog image" />
  </div>;
}

interface RandomDog {
    message: string;
    status: string;
  }

export default RandomDog;
