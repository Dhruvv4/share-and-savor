import { useParams } from "react-router-dom";
import restaurants from "../../../data/NJData.json";
import { Button } from "@/components/ui/button";
import { addToCart, clearCart, removeFromCart } from "@/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const Restaurant = () => {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const [dialogState, setDialogState] = useState({
    open: false,
    mealPack: null,
  });

  const { toast } = useToast();
  const { id } = useParams();
  const res = restaurants.find((res) => res.id === id);
  const { restaurant } = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const handleAddToCart = (mealPack) => {
    const data = { ...res, mealPack, toast };
    if (restaurant.cart.length !== 0 && restaurant.order.id !== id) {
      setDialogState((prev) => ({ ...prev, open: true, mealPack }));
      return;
    }
    dispatch(addToCart(data));
  };

  const handleResetAndAddToCart = () => {
    const data = { ...res, mealPack: dialogState.mealPack, toast };
    dispatch(clearCart());
    dispatch(addToCart(data));
  };

  const handleRemoveFromCart = (mealPack) => {
    const data = { ...res, mealPack, toast };
    dispatch(removeFromCart(data));
  };
  const defaultProps = {
    center: {
      lat: parseFloat(res?.geoCoordinatesSearch?.split(",")[0]),
      lng: parseFloat(res?.geoCoordinatesSearch?.split(",")[1]),
    },
    zoom: 11,
  };

  console.log(res);

  return (
    <>
      <Dialog
        open={dialogState.open}
        onOpenChange={(value) =>
          setDialogState((prev) => ({ ...prev, open: value }))
        }
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              You already have items from {restaurant?.order?.name}
            </DialogTitle>
            <DialogDescription>
              If you want to add items from {res?.name}, you will lose your
              items from {restaurant?.order?.name}. Do you want to continue?
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2"></div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" onClick={handleResetAndAddToCart}>
                Continue
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-2 gap-8 m-10 p-4">
        <div className="mx-auto my-20">
          <h1 className="text-6xl font-semibold mb-2 text-gray-800">
            Name: {res?.name}
          </h1>
          <h2 className="text-4xl truncate mb-2 text-gray-600">
            Cuisine: {res?.cuisine}
          </h2>
          <h3 className="text-2xl font-bold">Rating: {res?.starCount}</h3>
          <h3 className="text-2xl text-gray-700">Address: {res?.address}</h3>
          <h3 className="text-2xl text-gray-700">ZipCode: {res?.zipCode}</h3>
        </div>
        <div className="mx-auto border border-gray-300 rounded-xl shadow-2xl">
          <img
            src={res?.img || "/Image_not_available.png"}
            alt={res?.name}
            className="mx-14 mb-2 rounded-md"
          />
        </div>

        <div className="text-center">
          <h3 className="mb-4 text-xl text-gray-700 font-bold">
            Note: You can either have one small or one large meal pack.
          </h3>
          <div className=" p-8 border border-gray-200 rounded-lg">
            <div className="flex flex-row justify-center items-center gap-8 px-10 mx-auto space-x-8">
              {res?.mealPacks?.map((meal) =>
                meal?.availableItems > 0 ? (
                  <div key={meal.id} className="text-center">
                    <h2 className="text-lg font-semibold mb-2 first-letter:uppercase text-gray-800">
                      {meal.size} Meal Pack
                    </h2>
                    <p>
                      Available for Pick Up: {meal.availableItems}{" "}
                      {meal.availableItems > 1 ? "packs" : "pack"}
                    </p>
                    <p className="text-gray-600">Serves: {meal?.serves}</p>
                    <p className="text-gray-600">Price: {meal?.price}</p>
                    {restaurant.cart.filter((item) => item.id === meal.id)
                      .length === 0 ? (
                      <Button
                        disabled=""
                        onClick={() => handleAddToCart(meal)}
                        className="mt-2"
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleRemoveFromCart(meal)}
                        className="mt-2"
                      >
                        Remove from Cart
                      </Button>
                    )}
                  </div>
                ) : (
                  ""
                ),
              )}
            </div>
            {restaurant.cart.length > 0 && restaurant.order.id === res.id && (
              <div className="mt-4">
                <Link to={`/checkout/${id}`}>
                  <Button className="text-white">Go to Checkout</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div style={{ height: "350px", width: "85%" }} className="mx-auto">
          <Link to={`http://maps.google.com/?q=${res?.address}`}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
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
          </Link>
        </div>
      </div>

      <div className="">
        <h1 className="text-center text-3xl">Hear from our Customers</h1>
      </div>
    </>
  );
};

export default Restaurant;
