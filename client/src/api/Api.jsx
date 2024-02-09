import { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../components/UserLIst.jsx";
import { useDispatch } from "react-redux";

const Api = () => {
  // const dispatch = useDispatch();

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://642d4d6dbf8cbecdb4027745.mockapi.io/plane")
      .then((res) => {
        console.log(res.data, "in api.js");
        setData(res.data);
      })
      .catch((err) => {
        console.log(err, "errorrr");
      });
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
