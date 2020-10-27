import React from "react";
import "./Chat.css";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import UserChatComponent from "../../components/UserChatComponent";
import AdminChatComponent from "../../components/AdminChatComponent";

const ChatPage = (props) => {
  return (
    <>
      <HeaderComponent history={props.history} role={props.role} />
      <div className="chat-wrapper">
        <div className="chat-container">
          {props.role === "user" ? (
            <UserChatComponent />
          ) : (
            <AdminChatComponent {...props} />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
