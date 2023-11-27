import { useParams } from "react-router-dom";

const Checkout = () => {
  const { id } = useParams();

  return <div>Checkout</div>;
};

export default Checkout;
