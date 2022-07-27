import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

// data point is an array of objects.
// Deliverable 1: see all plants when the app starts
// Plants want to be rendered as cards in PlantCard which is a child of
// PlantList. Array of plants should be managed in state.
// NewPlantForm and SearchPlants will update the state as well, making
// PlantPage the lowest common ancestor of those components.

const PlantPage = () => {
  const [plants, setPlants] = useState([])

  const handleNewPlant = (newPlant) => {
    const updatedPlants = [...plants, newPlant]
    setPlants(updatedPlants)
  }

  const handleRemovePlant = (idToRemove) => {
    const updatedPlants = plants.filter((target) => target.id !== idToRemove)
    setPlants(updatedPlants)
  }

  const handleUpdatePlant = (updatedPlant) => {
    const updatedPlants = plants.map((element) => {
      if (element.id === updatedPlant.id) {
        return updatedPlant
      } else {
        return element
      }
    })
    setPlants(updatedPlants)
  }

  useEffect(() => {
    const fetchPlants = async () => {
      let req = await fetch('http://localhost:6001/plants')
      let res = await req.json()
      setPlants(res)
    }
    fetchPlants()
  }, [])


  return (
    <main>
      <NewPlantForm handleNewPlant={handleNewPlant} />
      <Search />
      <PlantList plants={plants} />
    </main>
  );
}

export default PlantPage;
