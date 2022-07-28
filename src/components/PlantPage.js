import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

// http://localhost:6001/plants

// As a user:

// 1. When the app starts, I can see all plants.

// fetch data in lowest common ancestor among components who need it
// manage data in state
// pass data to component who will render data

// fetch will occur on initial page load aka useEffect

// data is array of plant objects
// lowest common ancestor is PlantPage
// data will render in PlantList as child components PlantCard aka plants.map

// 2. I can add a new plant to the page by submitting the form.

// need a handler function to update the plants array. Adding a new plant is done w/ spread operator
// state handler function (handleAddPlant) is defined where state is defined (PlantPage)
// handler will be passed to component who will handle user input (NewPlantForm)
// NewPlantForm will have handleSubmit event that POSTS and turns result into a JS object to render
// via handleAddPlant

// 3. I can mark a plant as "sold out".

// Toggle in PlantCard. Need to useState

// 4. I can search for plants by their name and see a filtered list of plants.


// Search will update plants array (nondestructively) and setter function will be fired on user input
// input happens in Search, state will be defined in PlantPage, PlantPage needs to pass FILTERED array
// to PlantList (replace plants={plants} with plants={filteredPlants})

// Done in 32 minutes without looking anything up AND adding all these comments

// Adv
// 1. I can update the price of a plant and still see the updated price after refreshing the page.

// update = PATCH request, user input occurs in PlantCard, for changes to render we will pass a handler function
// that sets state by updating an element in plants. PATCH req will be invoked on event in PlantCard


// 2. I can delete a plant and it is still gone when I refresh the page.

// delete = DELETE request, user input occurs in PlantCard, for changes to render we will pass a handler function
// that sets state by removing an element in plants. DELETE req will be invoked on event in PlantCard

// 53 minutes for core + bonus

const PlantPage = () => {
  const [plants, setPlants] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchPlants = async () => {
      let req = await fetch('http://localhost:6001/plants')
      let res = await req.json()
      console.log('data', res)
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

  const handleUpdatePlant = (updatedPlant) => {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return updatedPlant
      } else {
        return plant
      }
    })
    setPlants(updatedPlants)
  }

  const handleRemovePlant = (idToRemove) => {
    const updatedPlants = plants.filter((target) => target.id !== idToRemove)
    setPlants(updatedPlants)
  }

  return (
    <main>
      <NewPlantForm handleAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList 
        plants={filteredPlants}
        handleUpdatePlant={handleUpdatePlant}
        handleRemovePlant={handleRemovePlant}
      />
    </main>
  );
}

// handleUpdatePlant, handleRemovePlant

export default PlantPage;
