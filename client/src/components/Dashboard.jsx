import { Link } from "react-router-dom";
import restaurants from "./../../../data/NJData.json";
import { Button } from "./ui/button";
import Search from "./Search";
function Dashboard() {
  return (
    <>
      <h1 className="text-center">
        Save Meals from your favorite restaurants !
      </h1>
      <Search></Search>
      <div className="container mx-52 p-4 my-5 items-center">
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 
        "
        >
          {restaurants.map((res) => (
            <div
              key={res.id}
              className="border-2 border-solid border-gray-300 p-4"
            >
              <img src="/Image_not_available.png" alt="No image found" />
              <h1>Name: {res.Restaurant}</h1>
              <h2>Cuisine: {res.Cuisine}</h2>
              <h3>Rating Count: {res.Rating_Count}</h3>
              <h3>Rating: {res.Star_Count}</h3>
              <h4>Operation hours: Today between {}</h4>
              <h4>Location: {res.Address}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
