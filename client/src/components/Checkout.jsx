import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  let {
    restaurant: { order },
  } = useSelector((state) => state.cart.value);
  let { user } = useSelector((state) => state.user);

  if (order?.id !== id) {
    throw new Response("Not Found", { status: 404 });
  }

  const handleCheckout = async (payload) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/orders",
        { ...payload, userId: user.id },
        { withCredentials: true, xsrfCookieName: "AuthCookie" },
      );
      toast({
        title: "Order placed successfully ",
        description: `${order.cart.length} items will be ready for pickup soon.`,
        status: "success",
        duration: 2500,
        className:
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      });
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="max-w-xl border-2 border-black/20 rounded-lg mx-auto p-4">
      <header className="font-bold text-xl text-center mb-8">
        Checkout - {order.name}
      </header>

      <div className="text-center">
        {order?.cart.map((cartItem) => (
          <div key={cartItem.id} className="grid grid-cols-2">
            <span className="first-letter:uppercase">{cartItem.size} Pack</span>

            <span> ${cartItem.price}</span>
          </div>
        ))}
        <div className="grid grid-cols-2 border-t border-black/20 pt-3 mt-3">
          <span>Total </span>
          <span>${order?.cart?.reduce((a, c) => a + c?.price, 0)}</span>
        </div>
        <div className="flex justify-around mt-10">
          <Link to={`/restaurants/${id}`}>
            <Button variant={"outline"}>Back to Restaurant</Button>
          </Link>
          <Button onClick={() => handleCheckout(order)}>Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
