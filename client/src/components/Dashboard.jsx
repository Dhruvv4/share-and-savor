import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <>
      <h1>Welcome to the dashboard</h1>
      <Link to="/signup">
        <button>Signup</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </>
  );
}

export default Dashboard;
