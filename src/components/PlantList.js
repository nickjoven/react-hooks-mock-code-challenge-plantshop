import React from "react";
import PlantCard from "./PlantCard";

const PlantList = ({plants}) => {
  return (
    <ul className="cards">
      {plants.map((element, index) => {
        return (
          <PlantCard 
            key={index} 
            name={element.name} 
            image={element.image} 
            price={element.price} 
          />
        )
      })}
      </ul>
  );
}

export default PlantList;
