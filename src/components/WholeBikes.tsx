import React from "react";
import { StoreItem } from "./StoreItem"; // Import StoreItem component

const WholeBikes = () => {
  return (
    <div>
      <h2>Whole Bikes</h2>
      <StoreItem id={1} name="Mountain Bike" price={500} imgUrl="mountain_bike.jpg" category="wholeBikes" />
      <StoreItem id={2} name="Road Bike" price={700} imgUrl="road_bike.jpg" category="wholeBikes" />
      {/* Add more StoreItem components for Whole Bikes as needed */}
    </div>
  );
}

export default WholeBikes;
