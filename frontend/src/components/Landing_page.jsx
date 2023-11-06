import { Link } from "react-router-dom";

function Landing_page() {
  return (
    <>
      <h1>Welcome to share and savour</h1>
      <Link to="/signup">
        <button className="bg-blue-300">Signup</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </>
  );
}

export default Landing_page;
