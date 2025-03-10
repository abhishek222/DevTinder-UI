import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { BASE_URL } from "../utils/constant";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  console.log(messages);
  const [newMessage, setNewMessage] = useState({});
  const currentUser = useSelector((store) => store?.user);
  const currentUserId = currentUser?._id;
  useEffect(() => {
    if (!currentUserId || !targetUserId) return;
    const socket = createSocketConnection();
    socket.emit("join_room", { currentUserId, targetUserId });
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUserId, targetUserId]);

  const formatDate = (chatDate) => {
    const date = new Date(chatDate);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    return formattedDate;
  };

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(BASE_URL + `/chat/${targetUserId}`, {
        withCredentials: true,
      });
      const chatHistory = response?.data?.messages.map((msg) => {
        return {
          sender: msg.sender._id,
          senderName: msg.sender.firstName,
          senderPhoto: msg.sender.photoUrl,
          message: msg.message,
          time: formatDate(msg.createdAt),
        };
      });
      setMessages(chatHistory);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };
  useEffect(() => {
    fetchChatHistory();
  }, []);
  const sendMessage = () => {
    if (!currentUser._id || !targetUserId) return;
    const socket = createSocketConnection();
    socket.emit("send_message", {
      currentUserId,
      targetUserId,
      message: newMessage.message,
      time: new Date().toLocaleTimeString(),
      sender: currentUserId,
      senderName: currentUser.name,
      senderPhoto: currentUser.photoUrl,
    });
    setNewMessage((prev) => ({
      ...prev,
      message: "", // Clear message field
      time: new Date().toLocaleTimeString(), // Reset time
    }));
  };
  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col relative">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat ${
            message.sender === currentUserId ? "chat-end" : "chat-start"
          }`}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={message.senderPhoto}
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
          <div className="chat-header">
            {message.senderName}
            <time className="text-xs opacity-50">{message.time}</time>
          </div>
          <div className="chat-bubble">{message.message}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      ))}
      <div className="p-4 border-t border-gray-600 flex items-center gap-2  absolute bottom-0 left-0 right-0">
        <input
          type="text"
          value={newMessage?.message}
          onChange={(e) =>
            setNewMessage({
              sender: currentUser._id,
              senderName: currentUser.firstName,
              message: e.target.value,
              time: new Date().toLocaleTimeString(),
              senderPhoto: currentUser.photoUrl,
            })
          }
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
