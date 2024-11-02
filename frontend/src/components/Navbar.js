import React, { useState, useEffect } from "react";
import Button from "./Button";

export default function Navbar(props) {
  const [user, setUser] = useState({});

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="ml-auto">
      {user.role && <Button text={`${capitalize(user.role)} Mode`} />}
    </div>
  );
}
