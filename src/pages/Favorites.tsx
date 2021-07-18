import React, { useEffect, useState } from "react";
import axios from "../axios";

interface IState {
  quotes: {
    id: number;
    title: string;
    author: string;
  }[];
}

const Favorites: React.FC<{}> = () => {
  const [favorite, setFavorite] = useState<IState["quotes"]>([]);

  useEffect(() => {
    async function fetchFavorites() {
      const response: any = await axios(`/api/favorites/`, {
        method: "get",
        headers: new Headers({
          "Access-Control-Allow-Credentials": "true",
        }),
        withCredentials: true,
      })
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          setFavorite(data);
        });

      if (response?.error) {
        alert(response?.error);
        return;
      }
    }

    fetchFavorites();
  }, []);

  console.log(favorite);

  return (
    <div className="favorites">
      <h3>Your favorite quote's</h3>
      {!favorite ? (
        <></>
      ) : (
        favorite?.map((fav, index) => (
          <div key={index} className="favorites__container">
            <h4>" {fav.title} "</h4>
            <div className="favorites__containerBottom">
              <button
                onClick={async () => {
                  const response: any = await axios(
                    `/api/favorites/delete/${fav.id}`,
                    {
                      method: "delete",
                      headers: {
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Expose-Headers": "Set-Cookie",
                      },
                      withCredentials: true,
                    }
                  ).then((res) => {
                    console.log(res);
                    window.location.reload();
                  });

                  if (response?.error) {
                    alert(response?.error);
                  }
                }}
              >
                remove
              </button>
              <p>- {fav.author}</p>
            </div>
          </div>
        ))
      )}
      <br />
    </div>
  );
};

export default Favorites;
