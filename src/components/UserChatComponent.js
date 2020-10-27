import React from "react";
import ChatComponent from "./ChatComponent";

const UserChatComponent = (props) => {
  return (
    <>
      <div>
        <h1>Customer Help</h1>
      </div>
      <ChatComponent role="user" />
    </>
  );
};

export default UserChatComponent;
