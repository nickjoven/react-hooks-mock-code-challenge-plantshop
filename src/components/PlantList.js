import React from "react";
import PlantCard from "./PlantCard";

const PlantList = ({plants, handleRemovePlant, handleUpdatePlant}) => {
  return (
    <ul className="cards">
      {plants.map((element, index) => {
        return (
          <PlantCard 
            key={index} 
            id={element.id}
            name={element.name} 
            image={element.image} 
            price={element.price}
            handleRemovePlant={handleRemovePlant}
            handleUpdatePlant={handleUpdatePlant} 
          />
        )
      })}
      </ul>
  );
}

export default PlantList;
