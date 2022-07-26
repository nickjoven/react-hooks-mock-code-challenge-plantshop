import React, { useState, useEffect } from "react";
import PlantCard from "./PlantCard";


let PLANTS = []

function PlantList() {
  const [myPlants, setMyPlants] = useState([])

  const handleAddPlants = (newPlants) => {
    PLANTS = [...myPlants, newPlants]
  }

  const fetchPlants = () => {
    fetch('http://localhost:6001/plants')
    .then(req => req.json())
    .then(res => {
      console.log(res)
      res.forEach((element) => {
          PLANTS.push(element)
      })
      setMyPlants(PLANTS)
    })
  }

  useEffect(fetchPlants, [])
  
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
