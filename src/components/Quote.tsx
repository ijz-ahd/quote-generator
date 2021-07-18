import React, { useState } from "react";
import { useHistory } from "react-router";
import { IState as IProps } from "../App";

interface IState {
  quote: {
    text: string;
    author: string;
  };
}

const Quote: React.FC<IProps> = ({ quotes }) => {
  const history = useHistory();

  let initialQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const [quote, setQuote] = useState<IState["quote"]>();
  let randomQuote = {
    title: quote?.text || initialQuote?.text,
    author: quote?.author || initialQuote?.author || "anonymous",
  };

  const addToFavorite = async () => {
    if (localStorage.getItem("token")) {
      const response: any = await fetch(
        `https://quote-gnr.herokuapp.com/api/favorites/add`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin":
              "https://quote-generator-drab-nine.vercel.app/",
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
          body: JSON.stringify(randomQuote),
        }
      );
      if (response?.error) {
        alert(response?.error);
      }
      alert("Quote added to your favorites");
    } else {
      history.push("/login");
    }
  };

  return quotes ? (
    <div className="quote">
      <div className="quote__container">
        <h3>" {randomQuote.title} "</h3>
        <div className="quote__containerBottom">
          <div className="quote__containerBottom__buttons">
            <button
              className="quote__containerBottom__buttonsFav"
              onClick={addToFavorite}
            >
              Add to favorite's
            </button>
            <button
              className="quote__containerBottom__buttonsNext"
              onClick={() =>
                setQuote(quotes[Math.floor(Math.random() * quotes.length)])
              }
            >
              Next Quote
            </button>
          </div>
          <p>- {randomQuote.author}</p>
        </div>
      </div>
    </div>
  ) : (
    <h3>Loading the quote that could make your day!</h3>
  );
};

export default Quote;
