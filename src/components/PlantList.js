import React from "react";
import PlantCard from "./PlantCard";

// include passed prop in parameter
// TAKE IN THE ADVANCED DELIVERABLE PROPS AND KEEP PASSING THEM
const PlantList = ({plants, handleRemovePlant, handleUpdatePlant}) => {
  return (
    <ul className="cards">
      {/* render PlantCards components in here 
       we have an array. We will .map over the array and return <PlantCard */}
       {plants.map((element, index) => {
        // destructure element into keys
         const { id, name, image, price } = element 
        return (
          // pass properties of element by key name to PlantCard
          // * JUMP TO PLANT CARD *
          <PlantCard 
            key={index}
            id={id}
            name={name}
            image={image}
            price={price}
            handleRemovePlant={handleRemovePlant}
            handleUpdatePlant={handleUpdatePlant} // LOOK AT THE PASSED PROPS NOW * JUMP TO PLANTCARD *
          />
        )
       })}
      
    </ul>
  );
}

export default PlantList;
