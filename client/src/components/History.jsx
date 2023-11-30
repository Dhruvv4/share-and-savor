import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
const History = () => {
  let { user } = useSelector((state) => state.user);
  const apiUrl = "http://localhost:3000/api/orders/history";
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function getHistory() {
      const response = await axios.get(apiUrl + "/" + user.id);
      setHistory(response.data);
    }

    getHistory();
  }, [apiUrl]);

  return (
    <>
      <div>
        <h1>Your order history</h1>
        <div>
          {history?.map((res) => (
            <div key={res.resId}>
              <h1>{res.resId}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default History;
