// must import useState and useEffect
import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const PlantPage =() => {
  // states to manage go here. plants is for the data from the server, searchTerm is for a text input that will be used to filter the displayed data
  const [plants, setPlants] = useState([])
  const [searchTerm, setSearchTerm] = ([])

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

  return (
    <main>
      <NewPlantForm />
      <Search />
      <PlantList plants={plants} />
    </main>
  );
}

export default PlantPage;
