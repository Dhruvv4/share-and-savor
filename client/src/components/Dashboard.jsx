import restaurants from "./../../../data/NJData.json";
import Search from "./Search";

function Dashboard() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-center my-8">
        Save Meals from your favorite restaurants!
      </h1>
      <Search />
      <h1 className="my-10">Previously ordered from </h1>
      <div></div>
      <div className="container mx-auto p-4 my-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {restaurants.map((res) => (
            <Link to={`/restaurants/${res.id}`}>
              <div
                key={res.id}
                className="border border-solid border-gray-300 rounded p-6 transition transform hover:shadow-lg"
              >
                <img
                  src="/Image_not_available.png"
                  alt="No image found"
                  className="mb-4 rounded-md"
                />
                <h1 className="text-xl font-semibold mb-2">{res.Restaurant}</h1>
                <h2 className="text-gray-600 mb-2">Cuisine: {res.Cuisine}</h2>
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <span>Rating Count: {res.Rating_Count}</span>
                  <span>Rating: {res.Star_Count}</span>
                </div>
                <h4 className="text-gray-600 mb-2">
                  Operation hours: Today between {}
                </h4>
                <h4 className="text-gray-600">Location: {res.Address}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
