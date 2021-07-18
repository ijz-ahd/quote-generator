import React from "react";
import { Form, Formik, Field } from "formik";
import { useState } from "react";
import axios from "../axios";

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
            const response = await axios(`/api/auth/login`, {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Credentials": "true",
              },
              data: JSON.stringify(values),
              withCredentials: true,
            }).then((res) => res.data);
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
