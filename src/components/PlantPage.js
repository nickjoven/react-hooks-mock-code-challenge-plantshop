// must import useState and useEffect
import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const PlantPage =() => {
  // states to manage go here. plants is for the data from the server, searchTerm is for a text input that will be used to filter the displayed data
  const [plants, setPlants] = useState([])
  // USE STATE ACTUALLY
  const [searchTerm, setSearchTerm] = useState('')

  // begin with useEffect hook to load initial data
  useEffect(() => {
    const fetchPlants = async () => {
      let req = await fetch('http://localhost:6001/plants')
      let res = await req.json()
      setPlants(res)
      // console.log('plants', res) // confirm data in console
    }
    fetchPlants()
  }, [])

  // For deliverable 1, we need the data to render. The desintation for the data is PlantCard, which is a child
  // of PlantList. The reason we don't fetch data in PlantList is because we have other components that need
  // to update the data, and PlantPage is the lowest common ancestor of these components.
  // Pass the data as a prop to PlantList. * JUMP TO PLANTLIST *

  // The page renders with the plant objects, that's the first deliverable.

  // 2. I can add a new plant to the page by submitting the form.

  // The form is going to need a handler function (that uses the setter function for plants) 
  // in order to add a new plant to the array. The fetch request will occur in NewPlantForm, but
  // we need to pass the handler here since the state is managed here.

  const handleAddPlant = (newPlant) => {
    const updatedPlants = [...plants, newPlant]
    setPlants(updatedPlants)
  }

  // The above function is standard for adding an array element. Now make sure we pass it as a prop
  // and then * JUMP TO NEWPLANTFORM *

  // * BACK FROM PLANTFORM * It's time for deliverable 3.

  // 3. I can mark a plant as "sold out".
  // Ok, this one should be quick. The in stock button is in the PlantCard component. It can manage that state
  // itself, no prop passing necessary. The database doesn't even track if things are in stock or not.
  // * JUMP TO PLANT CARD *

  // Stock toggles, time for deliverable 4:

  // 4. I can search for plants by their name and see a filtered list of plants.

  // this implies we will use a filter method and pass a filtered array instead of plants to PlantList
  // the state for searchTerm is ^ up there

  // set up filtered array, pass state+setter to Search, * JUMP TO SEARCH *
  const searchedPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  // If the filter works, that is all of the core deliverables.

  // Let's work on the advanced.

  // 1. I can update the price of a plant and still see the updated price after refreshing the page.
  // PATCH REQUEST
  // 2. I can delete a plant and it is still gone when I refresh the page.
  // DELETE REQUEST

  // NOTE THAT THE HTML ELEMENTS FOR THIS INTERACTIVITY DON'T EXIST. Also
  // NOTE THAT THE HANDLER FUNCTIONS FOR THESE INTERACTIONS WILL NEED TO BE PASSED 
  // ALL THE WAY FROM HERE

  // START BY MAKING THE HANDLERS

  const handleRemovePlant = (idToRemove) => {
    const updatedPlants = plants.filter(target => target.id !== idToRemove)
    setPlants(updatedPlants)
  }

  const handleUpdatePlant = (updatePlant) => {
    const updatedPlants = plants.map((element) => {
      if (element.id === updatePlant.id) {
        return updatePlant
      } else {
        return element
      }
    })
    setPlants(updatedPlants)
  }

  // PASS THE HANDLERS TO PLANTLIST * JUMP TO PLANTLIST *

  return (
    <main>
      <NewPlantForm handleAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList plants={searchedPlants} handleRemovePlant={handleRemovePlant} handleUpdatePlant={handleUpdatePlant} />
    </main>
  );
}

export default PlantPage;
