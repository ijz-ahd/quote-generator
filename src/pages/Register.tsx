import React, { useState } from "react";
import { Form, Formik, Field } from "formik";
import { useHistory } from "react-router";
import axios from "../axios";

const Register: React.FC<{}> = () => {
  const [error, setError] = useState() as any;
  const history = useHistory();

  return (
    <div className="register">
      <div className="register__container">
        {error ? (
          <p>{error?.email || error?.password || error?.username}</p>
        ) : (
          <h3>Become a member today!</h3>
        )}
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values) => {
            if (!values.email || !values.username || !values.password) {
              alert("values are required");
            }
            const response: any = await axios(`/api/auth/register`, {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Credentials": "true",
              },
              data: JSON.stringify(values),
              withCredentials: true,
            }).then((res) => res.data);
            if (response?.error) {
              console.log(response.error);
              setError(response?.error);
              return;
            }
            history.push("/login");
          }}
        >
          {() => (
            <Form className="regsiter__contianerForm">
              <Field
                type="email"
                name="email"
                placeholder="Your email"
                required
              />
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
              <button type="submit">Become a member</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
