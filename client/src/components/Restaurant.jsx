import { useParams } from "react-router-dom";
import restaurants from "../../../data/NJData.json";
import { Button } from "@/components/ui/button";
import { addToCart, removeFromCart } from "@/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";

const Restaurant = () => {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const { toast } = useToast();
  const [count, setCount] = useState(10);
  const { id } = useParams();
  const res = restaurants.find((res) => res.id === id);
  const { restaurant } = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const handleAddToCart = (mealPack) => {
    const data = { ...res, mealPack, toast };
    setCount((prev) => prev - 1);
    dispatch(addToCart(data));
  };

  const handleRemoveFromCart = (mealPack) => {
    const data = { ...res, mealPack, toast };
    setCount((prev) => prev + 1);
    dispatch(removeFromCart(data));
  };
  const defaultProps = {
    center: {
      lat: parseFloat(res.geo_coordinates_search?.split(",")[0]),
      lng: parseFloat(res.geo_coordinates_search?.split(",")[1]),
      // lat: 40.71920974,
      // lng: -74.08289272,
    },
    zoom: 11,
  };

  return (
    <div className="m-10 rounded-lg border border-gray-300 p-4 w-full mx-auto text-center ">
      <img
        src="/Image_not_available.png"
        alt="No image found"
        className="mb-2 rounded-md mx-auto"
      />
      <h1 className="text-2xl font-semibold mb-2">Name: {res.Restaurant}</h1>
      <h2 className="truncate mb-2">Cuisine: {res.Cuisine}</h2>
      <h3 className="font-bold">Rating: {res.Star_Count}</h3>
      <h3>Address: {res.Address}</h3>
      <h3 className="mb-4">
        Note: You can either have one small or one large meal pack.
      </h3>
      <h4>Available Meal Packs: {count}</h4>

      <Link to={`http://maps.google.com/?q=${res.Address}`}>
        <div
          style={{
            height: "300px",
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAq5SX_tdNE7lYgBpNOEBUhC98uCd0qayo",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={defaultProps.center.lat}
              lng={defaultProps.center.lng}
              text="Restaurant"
            />
          </GoogleMapReact>
        </div>
      </Link>

      <div className="mx-auto flex max-w-2xl justify-around rounded-lg border border-black/20 p-4 my-8">
        {res?.mealPacks?.map((meal) => (
          <div key={meal.id} className="text-center">
            <h2 className="text-lg font-semibold mb-2">
              Meal Pack: {meal.size}
            </h2>
            <p>Serves: {meal.serves}</p>
            <p>Price: {meal.price}</p>
            {restaurant.cart.filter((item) => item.mealPack.id === meal.id)
              .length === 0 ? (
              <Button
                disabled=""
                onClick={() => handleAddToCart(meal)}
                className="bg-green-500 hover:bg-green-700 mt-2"
              >
                Add to cart
              </Button>
            ) : (
              <Button
                onClick={() => handleRemoveFromCart(meal)}
                className="bg-blue-500 hover:bg-blue-700 mt-2"
              >
                Remove from cart
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurant;
