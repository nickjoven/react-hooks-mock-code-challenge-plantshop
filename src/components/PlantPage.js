import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const PlantPage = () => {
  const [plants, setPlants] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchPlants = async () => {
      let req = await fetch('http://localhost:6001/plants')
      let res = await req.json()
      setPlants(res)
    }
    fetchPlants()
  }, [])

  const handleAddPlant = (newPlant) => {
    const updatedPlants = [...plants, newPlant]
    setPlants(updatedPlants)
  }

  const filteredPlants = plants.filter((plant) => {
    return (
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  })

  const handleRemovePlant = (idToRemove) => {
    const updatedPlants = plants.filter((target) => target.id !== idToRemove)
    setPlants(updatedPlants)
  }

  const handleUpdatePlant = (plantToUpdate) => {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === plantToUpdate.id) {
        return plantToUpdate
      } else {
        return plant
      }
    })
    setPlants(updatedPlants)
  }

  return (
    <main>
      <NewPlantForm handleAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList 
        plants={filteredPlants} 
        handleRemovePlant={handleRemovePlant}
        handleUpdatePlant={handleUpdatePlant}
      />
    </main>
  );
}

export default PlantPage;
