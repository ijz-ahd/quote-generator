import React, { useState } from "react";
import { Form, Formik, Field } from "formik";
import { useHistory } from "react-router";

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
            const response: any = await fetch(
              `https://quote-gnr.herokuapp.com/api/auth/register`,
              {
                method: "POST",
                credentials: "include",
                headers: {
                  "Access-Control-Allow-Origin":
                    "https://quote-generator-drab-nine.vercel.app/",
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "Access-Control-Allow-Credentials": "true",
                  "Access-Control-Expose-Headers": "Set-Cookie",
                },
                body: JSON.stringify(values),
              }
            ).then((data) => data.json());
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
