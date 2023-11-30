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
      <div className="m-10 rounded-lg border border-gray-300 p-4 w-full mx-auto text-center ">
        <img
          src="/Image_not_available.png"
          alt="No image found"
          className="mb-2 rounded-md mx-auto"
        />
        <h1 className="text-2xl font-semibold mb-2">Name: {res?.name}</h1>
        <h2 className="truncate mb-2">Cuisine: {res?.cuisine}</h2>
        <h3 className="font-bold">Rating: {res?.starCount}</h3>
        <h3>Address: {res?.address}</h3>
        <h3 className="mb-4">
          Note: You can either have one small or one large meal pack.
        </h3>
        <h4>Available Meal Packs: 10</h4>

        <div
          style={{
            height: "300px",
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
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
        <div className="mx-auto max-w-2xl border border-black/20 p-4 my-8 rounded-lg flex flex-col gap-4">
          <div className="flex justify-around">
            {res?.mealPacks?.map((meal) => (
              <div key={meal.id} className="text-center">
                <h2 className="text-lg font-semibold mb-2 first-letter:uppercase">
                  {meal.size} Meal Pack
                </h2>
                <p>Serves: {meal?.serves}</p>
                <p>Price: {meal?.price}</p>
                {restaurant.cart.filter((item) => item.id === meal.id)
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

          {restaurant.cart.length > 0 && restaurant.order.id === res.id && (
            <Link to={`/checkout/${id}`}>
              <Button>Go to Checkout</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Restaurant;
