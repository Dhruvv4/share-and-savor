import React from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Datahook from "./Datahook";
import { Link } from "react-router-dom";
import { useToast } from "./ui/use-toast";
const DashHistory = () => {
  let { user } = useSelector((state) => state.user);
  const { toast } = useToast();

  const history = Datahook({
    url: `http://localhost:3000/api/orders/history/${user.id}`,
  }).slice(0, 3);

  const handleCheckout = async (payload) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/orders/quickcheckout",
        { ...payload, userId: user.id },
        { withCredentials: true, xsrfCookieName: "AuthCookie" },
      );
      toast({
        title: "Order placed successfully ",
        description: `${payload.items.length} items will be ready for pickup soon.`,
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
    <div className="my-10">
      <h1 className="text-center font-bold">Previously Ordered from</h1>
      <div className="container mx-auto p-4 my-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {history?.map((res, idx) => (
            <div>
              <Link key={res?.resId} to={`/restaurants/${res?.resId}`}>
                <div className="border border-solid border-gray-300 rounded p-6 transition transform hover:shadow-lg">
                  <img
                    src={res?.restaurant?.img || "/Image_not_available.png"}
                    alt={res?.restaurant?.name}
                    className="mb-4 rounded-md"
                  />
                  <h1 className="text-xl font-semibold mb-2">
                    {res?.restaurant?.name}
                  </h1>
                  <h2 className="text-gray-600 mb-2">
                    Cuisine: {res?.restaurant?.cuisine}
                  </h2>
                  <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <span>Rating Count: {res?.restaurant?.ratingCount}</span>
                    <span>Rating: {res?.restaurant?.starCount}</span>
                  </div>
                  <h4 className="text-gray-600 mb-2">
                    Operation hours: Today between {}
                  </h4>
                  <h4 className="text-gray-600">
                    Location: {res?.restaurant?.address}
                  </h4>

                  <div className="my-4">
                    <h4 className="text-lg">Previously ordered:</h4>

                    {res?.items?.map((orders) => (
                      <div key={orders?.id} className="my-4">
                        <h2>Meal pack type: ${orders?.size}</h2>
                        <h2 className="font-bold">
                          Order price: ${orders?.price}
                        </h2>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
              <Button onClick={() => handleCheckout(res)}>
                Quick Checkout
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Link to="/history">
        <Button>View Entire History</Button>
      </Link>
    </div>
  );
};

export default DashHistory;
