import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.on("regulatory-update", (message) => {
      setNotifications((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="notifications">
      <h4>Real-Time Updates</h4>
      <ul>
        {notifications.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
