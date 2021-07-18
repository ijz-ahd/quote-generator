import React, { ReactNode } from "react";
import { useHistory } from "react-router";
import axios from "../axios";

const Header: React.FC<{}> = () => {
  const history = useHistory();

  let token = localStorage.getItem("token");
  let render: ReactNode;
  if (!token) {
    render = (
      <>
        <p
          className="app__headerButtons__login"
          onClick={() => history.push("/login")}
        >
          Login
        </p>
        <button
          className="app__headerButtons__register"
          onClick={() => history.push("/register")}
        >
          Be a member!
        </button>
      </>
    );
  } else {
    render = (
      <>
        <p
          className="app__headerButtons__login"
          onClick={async () => {
            await axios(`/api/auth/logout`, {
              headers: {
                "Access-Control-Expose-Headers": "Set-Cookie",
              },
              withCredentials: true,
            }).then(() => {
              localStorage.removeItem("token");
            });
            window.location.reload();
            history.push("/");
          }}
        >
          Logout
        </p>
        <button
          className="app__headerButtons__register"
          onClick={() => history.push("/favorites")}
        >
          My Favorites
        </button>
      </>
    );
  }

  return (
    <header className="app__header">
      <span onClick={() => history.push("/")}>Get quotes!</span>
      <div className="app__headerButtons">{render}</div>
    </header>
  );
};

export default Header;
