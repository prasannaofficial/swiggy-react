import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { backendLink } from "../constants";

const ChatComponent = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef();
  const chatAreaRef = useRef(null);
  const inputBoxRef = useRef(null);

  useEffect(() => {
    let query = {
      token: localStorage.getItem("token"),
    };
    console.log(props);
    if (props.to) {
      query.to = props.to;
      // console.log(props.to);
    }
    socketRef.current = io.connect(backendLink, {
      query,
    });
    socketRef.current.emit("receive messages");
    socketRef.current.on("initial messages", (messageObjArray) => {
      setMessages((oldMsgs) => [...oldMsgs, ...messageObjArray]);
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    });
    socketRef.current.on("message", (messageObj) => {
      // console.log(messageObj);
      receivedMessage(messageObj);
    });
  }, []);

  const receivedMessage = (message) => {
    setMessages((oldMsgs) => [...oldMsgs, message]);
    // console.log(chatAreaRef.current);
    // console.log("hello");
    chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
  };

  const sendMessage = () => {
    if (message === "") {
      return;
    }
    socketRef.current.emit("send message", message);
    setMessage("");
    inputBoxRef.current.focus();
  };
  return (
    <>
      <div className="chat-area" ref={chatAreaRef}>
        {messages.map((message) => {
          if (message.role === props.role) {
            return (
              <div className="my-message-row">
                <div className="my-message">{message.message}</div>
              </div>
            );
          } else {
            return (
              <div className="others-message-row">
                <div className="others-message">{message.message}</div>
              </div>
            );
          }
        })}
      </div>
      <input
        id="msg"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Say something..."
        required
        autocomplete="off"
        className="input-box"
        ref={inputBoxRef}
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.keyCode === 13) {
            sendMessage();
          }
        }}
      />
      <button onClick={sendMessage} className="send-button">
        <ion-icon name="send-sharp"></ion-icon>
      </button>
    </>
  );
};

export default ChatComponent;
