import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import Search from "./Search";

function SearchData() {
  const { state } = useLocation();

  console.log(state);

  return (
    <>
      <h1 className="text-center">Search Results</h1>
      <h2 className="text-center my-5">
        There were {state.length} restaurants found{" "}
      </h2>
      <div className="container mx-52 p-4 my-5 items-center">
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3
        "
        >
          {state.map((res) => (
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
            </div>
          ))}
        </div>
        <Link to="/dashboard">
          <Button className="my-10">Back to Dashboard</Button>
        </Link>
      </div>
    </>
  );
}

export default SearchData;
