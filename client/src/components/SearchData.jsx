import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";

function SearchData() {
  const { state } = useLocation();

  return (
    <>
      <h1 className="text-3xl font-semibold text-center my-8">
        Search Results
      </h1>
      <h2 className="text-xl font-medium text-center my-5">
        {state.length === 0
          ? "No restaurants found."
          : `There were ${state.length} restaurants found.`}
      </h2>
      <div className="container mx-auto p-4 my-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {state.map((res) => (
            <div
              key={res.id}
              className="border border-solid border-gray-300 rounded p-6 transition transform hover:shadow-lg"
            >
              <img
                src={res.img || "/Image_not_available.png"}
                alt="No image found"
                className="mb-4 rounded-md"
              />
              <h1 className="text-xl font-semibold mb-2">{res.name}</h1>
              <h2 className="text-gray-600 mb-2">Cuisine: {res.cuisine}</h2>
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <span>Rating Count: {res.ratingCount}</span>
                <span>Rating: {res.starCount}</span>
              </div>
              <h4 className="text-gray-600 mb-2">
                Operation hours: Today between {}
              </h4>
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
