import { useParams } from "react-router-dom";
import restaurants from "@/lib/restaurants.json";
import { Button } from "@/components/ui/button";
import { addToCart, removeFromCart } from "@/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./ui/use-toast";
import { useState } from "react";

const Restaurant = () => {

  const {toast} = useToast();
  const [count, setCount] = useState(10);
  const { id } = useParams();
  const res = restaurants.find((res) => res.id === id);
  const {restaurant} = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const handleAddToCart = (mealPack) => {
    const data = {...res, mealPack, toast}
    setCount((prev) => prev - 1);
    dispatch(addToCart(data));
  }

  const handleRemoveFromCart = (mealPack) => {
    const data = {...res, mealPack, toast}
    setCount((prev) => prev + 1);
    dispatch(removeFromCart(data));
  }

  return (
    <div className="m-10 rounded-lg border-2 border-black/20 bg-black/10 p-4 max-w-2xl mx-auto">
      <img src="" alt="No image found" />
      <h1>Name: {res.name}</h1>
      <h2 className="h-10 truncate">Cuisine: {res.category_name}</h2>
      <h3>Rating: {res.star_count}</h3>
      <h3>Note: You can either have one small or one large meal pack.</h3>
      <h4>Available Meal Packs: {count}</h4>
      <div className="mx-auto flex max-w-2xl justify-around rounded-lg border-2 border-black/20 p-4">
        {res?.mealPacks?.map((meal) => (
          <div key={meal.id}>
            <h2>Meal Pack:{meal.size}</h2>
            <p>Serves: {meal.serves}</p>
            <p>Price: {meal.price}</p>
            {restaurant.cart.filter((item) => item.mealPack.id === meal.id).length === 0 ? (
              <Button disabled='' onClick={() => handleAddToCart(meal)} className="bg-green-500 hover:bg-green-700">
                Added to cart
              </Button>
            ) : (
              <Button onClick={() => handleRemoveFromCart(meal)} className="bg-blue-500 hover:bg-blue-700">
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
