import { Link } from "react-router-dom";
import restaurants from "./../../../data/restaurants.json";

function Dashboard() {
  console.log(restaurants);
  return (
    <>
      <h1 className="text-center">Welcome to the dashboard</h1>
      <div className="container mx-10 p-4 my-10">
        <div className="grid grid-cols-3 gap-4">
          {restaurants.map((res) => (
            <div key={res.id}>
              <img src="" alt="No image found" />
              <h1>Name: {res.name}</h1>
              <h2>Cuisine: {res.category_name}</h2>
              <h3>Rating: {res.star_count}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
