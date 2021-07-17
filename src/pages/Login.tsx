import React from "react";
import { Form, Formik, Field } from "formik";
import { useHistory } from "react-router";
import { useState } from "react";

const Login: React.FC<{}> = () => {
  const [error, setError] = useState("");
  const history = useHistory();

  return (
    <div className="register">
      <div className="register__container">
        {error ? <p>{error}</p> : <h3>Welcome back!</h3>}
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values) => {
            if (!values.username || !values.password) {
              alert("values are required");
            }
            const response = await fetch(
              `https://quote-gnr.herokuapp.com/api/auth/login`,
              {
                method: "POST",
                credentials: "include",
                headers: {
                  "Access-Control-Allow-Origin": "http://localhost:3000",
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "Access-Control-Allow-Credentials": "true",
                },
                body: JSON.stringify(values),
              }
            ).then((res) => res.json());
            console.log(response.error);
            if (response.error) {
              setError(response.error || response.error.message);
              return;
            }
            localStorage.setItem("token", response?.token);
            history.push("/");
            window.location.reload();
          }}
        >
          {() => (
            <Form className="regsiter__contianerForm">
              <Field
                type="text"
                name="username"
                placeholder="Your username"
                required
              />
              <Field
                type="password"
                name="password"
                placeholder="Your password"
                required
              />
              <button type="submit">Sign In</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;