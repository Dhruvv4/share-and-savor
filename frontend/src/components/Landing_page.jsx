import { Link } from "react-router-dom";
import { Button } from "./../../components/ui/button.jsx";
function Landing_page() {
  return (
    <>
      <h1>Welcome to share and savour</h1>
      <Link to="/signup">
        <Button className="bg-blue-300">Signup</Button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </>
  );
}

export default Landing_page;
