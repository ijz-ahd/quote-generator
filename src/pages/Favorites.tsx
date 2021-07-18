import React, { useEffect, useState } from "react";

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
      const response: any = await fetch(
        `https://quote-gnr.herokuapp.com/api/favorites/`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin":
              "https://quote-generator-drab-nine.vercel.app/",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      )
        .then((res) => res.json())
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
                  const response: any = await fetch(
                    `https://quote-gnr.herokuapp.com/api/favorites/delete/${fav.id}`,
                    {
                      method: "DELETE",
                      credentials: "include",
                      headers: {
                        "Access-Control-Allow-Credentials": "true",
                      },
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
