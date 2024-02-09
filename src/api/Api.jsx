import { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../components/UserLIst.jsx";
import { useDispatch } from "react-redux";

const Api = () => {
  const [data, setData] = useState([]);

  const apiData = async () => {
    try {
      const response = await axios.get(
        "https://642d4d6dbf8cbecdb4027745.mockapi.io/plane"
      );
      console.log(response.data, "in api.js");
      setData(response.data);
    } catch (error) {
      console.error(error, "errorrr");
    }
  };

  useEffect(() => {
    apiData();
  }, []);

  return (
    <div>
      {data.map((user) => (
        <UserList data={user} key={user.id} />
      ))}
    </div>
  );
};

export default Api;

//

// import { useDispatch } from "react-redux";
// import { fetchData } from "./path-to-your-slice";

// const dispatch = useDispatch();

// useEffect(() => {
//   dispatch(fetchData());
// }, [dispatch]);
