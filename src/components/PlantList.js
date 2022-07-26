import React, { useState, useEffect } from "react";
import PlantCard from "./PlantCard";


function PlantList() {
  const [myPlants, setMyPlants] = useState([])

  const fetchPlants = async () => {
  }
  
  
  
  useEffect(() => {
    const fetchPlants = async () => {
      let req = await fetch('http://localhost:6001/plants')
      let res = await req.json()
      // console.log(res)
      setMyPlants(res)
    }
    fetchPlants();
  }, [])
  
  return (
    <ul className="cards">
      {myPlants.map((element, index) => {
        return (
          <PlantCard key={index} name={element.name} image={element.image} price={element.price} />
        )
      })}
    </ul>
  );
}

export default PlantList;
