import { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../components/UserLIst.jsx";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
const Api = ({ searchTerm, onClick }) => {
  const [data, setData] = useState([]);
  const [forward, setforward] = useState();
  const { id } = useParams();
  // console.log(id, "getting id in Api ");

  const apiData = async () => {
    try {
      const response = await axios.get(
        "https://642d4d6dbf8cbecdb4027745.mockapi.io/plane"
      );
      searchTerm;
      // console.log(response.data, "in api.js");
      setData(response.data);
    } catch (error) {
      console.error(error, "errorrr");
    }
  };
  useEffect(() => {
    apiData();
  }, []);
  const navigate = useNavigate();
  const handleItemClick = (user) => {
    navigate(`/side/${user.id}`);
    setforward(user.name);
    localStorage.setItem("NAMEEEEE", JSON.stringify(user.name));
    // console.log(user.name, "here getting id ");
  };
  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // console.log(filteredData, "in here with filter data");
  return (
    <>
      <div>
        {/* forward: {forward} */}
        {filteredData.map((user) => (
          <div key={user.id}>
            <UserList data={user} onClick={() => handleItemClick(user)} />
          </div>
        ))}
      </div>
      <div>{/* <Header val={forward} /> */}</div>
    </>
  );
};

export default Api;
