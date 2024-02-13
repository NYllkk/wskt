import { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../components/UserLIst.jsx";
import { useDispatch } from "react-redux";

const Api = ({ searchTerm }) => {
  const [data, setData] = useState([]);
  const handleSearch = () => {
    console.log("clicked handleSearched");
  };
  const apiData = async () => {
    try {
      const response = await axios.get(
        "https://642d4d6dbf8cbecdb4027745.mockapi.io/plane"
      );
      searchTerm;
      console.log(response.data, "in api.js");
      setData(response.data);
    } catch (error) {
      console.error(error, "errorrr");
    }
  };
  useEffect(() => {
    apiData();
  }, []);
  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredData, "in here with filter data");
  return (
    <div>
      {filteredData.map((user) => (
        <UserList data={user} key={user.id} onClick={handleSearch} />
      ))}
    </div>
  );
};

export default Api;
