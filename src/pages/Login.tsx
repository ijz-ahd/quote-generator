import React from "react";
import { Form, Formik, Field } from "formik";
import { useState } from "react";

const Login: React.FC<{}> = () => {
  const [error, setError] = useState("");

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
                credentials: "same-origin",
                headers: {
                  "Access-Control-Allow-Origin":
                    "https://quote-generator-drab-nine.vercel.app/",
                  "Access-Control-Expose-Headers": "Set-Cookie",
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "Access-Control-Allow-Credentials": "true",
                },
                body: JSON.stringify(values),
              }
            ).then((res) => res.json());
            console.log(response.error);
            if (response.error) {
              setError(response.error);
              return;
            }
            localStorage.setItem("token", response?.token);
            window.location.href = "/";
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
