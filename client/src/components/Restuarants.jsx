import React from "react";
// TODO: Rectangular style cards for restuarants with header section for filters and search bar.

const Restuarants = ({ restaurant }) => {
  const {
    name,
    address,
    city,
    state,
    country,
    star_count,
    rating_count,
    category_name,
  } = restaurant;

  return (
    <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md my-4">
      <img
        src="path/to/restaurant-image.jpg"
        alt="Restaurant Image"
        className="w-full h-48 object-cover object-center"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">{address}</p>
        <p className="text-sm text-gray-600">
          {city}, {state} {country}
        </p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">
            {Array.from({ length: star_count }, (_, index) => (
              <svg
                key={index}
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 text-yellow-500"
                viewBox="0 0 24 24"
              >
                <path d="M21 21l-9-1-4.5 7L3 11l6-3-1-9 7.5 7L21 3"></path>
              </svg>
            ))}
          </span>
          <span className="text-gray-600 ml-1">({rating_count} reviews)</span>
        </div>
        <div className="mt-3">
          <p className="text-sm text-gray-700">{category_name}</p>
        </div>
        {/* Add more details like phone, email, website, etc. as needed */}
      </div>
    </div>
  );
};

export default Restuarants;
