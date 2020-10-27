import React, { useState, useEffect } from "react";
import ChatComponent from "./ChatComponent";
import { backendLink } from "../constants";

const AdminChatComponent = (props) => {
  const [personEmail, setPersonEmail] = useState("");
  const [personList, setPersonList] = useState([]);
  const [personChanged, setPersonChanged] = useState(false);
  const fetchUsersList = async () => {
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    const response = await fetch(backendLink + "/api/admin/userslist/", {
      method: "GET",
      headers: myHeaders,
    });
    const json = await response.json();
    if (json.verifiedUser === false) {
      localStorage.setItem("token", "");
      props.history.push("/");
      return;
    }
    setPersonList(json.users);
    console.log(json);
  };
  const selectHandler = (e) => {
    setPersonChanged(false);
    console.log(e.target.value);
    setPersonEmail(e.target.value);
  };
  useEffect(() => {
    fetchUsersList();
  }, []);

  useEffect(() => {
    console.log(personEmail);
    if (personEmail) setPersonChanged(true);
  }, [personEmail]);
  return (
    <>
      <div class="select">
        <select onChange={selectHandler}>
          <option value="">Select the customer to chat</option>
          {personList.map((el) => {
            return <option value={el.email}>{el.email + " " + el.name}</option>;
          })}
        </select>
        <div class="select__arrow"></div>
      </div>

      {personChanged ? <ChatComponent role="admin" to={personEmail} /> : <></>}
    </>
  );
};

export default AdminChatComponent;
