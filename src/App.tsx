import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Quote from "./components/Quote";
import Header from "./components/Header";
import Register from "./pages/Register";
import "./App.css";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";

export interface IState {
  quotes: {
    text: string;
    author: string;
  }[];
}

function App() {
  const [quotes, setQuotes] = useState<IState["quotes"]>([]);

  useEffect(() => {
    if (!localStorage.getItem("cache")) {
      const fetchQuotes = async () => {
        await fetch("https://type.fit/api/quotes")
          .then((response) => response.json())
          .then((data) => {
            setQuotes(data);
            localStorage.setItem("cache", JSON.stringify(data));
          });
      };

      fetchQuotes();
    }

    setQuotes(JSON.parse(localStorage.getItem("cache")!));
  }, []);

  return (
    <Router>
      <div className="app">
        {/* app header  */}
        <Header />

        {/* register route  */}

        <Route exact path="/register">
          {!localStorage.getItem("token") ? <Register /> : <Redirect to="/" />}
        </Route>
        {/* login route  */}
        <Route exact path="/login">
          {!localStorage.getItem("token") ? <Login /> : <Redirect to="/" />}
        </Route>

        <Route exact path="/favorites">
          {localStorage.getItem("token") ? <Favorites /> : <Redirect to="/" />}
        </Route>

        {/* app body  */}
        <Route exact path="/">
          {quotes && <Quote quotes={quotes} />}
        </Route>
      </div>
    </Router>
  );
}

export default App;
