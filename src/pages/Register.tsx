import React from "react";
import { Form, Formik, Field } from "formik";
import { useHistory } from "react-router";

const Register: React.FC<{}> = () => {
  const history = useHistory();

  return (
    <div className="register">
      <div className="register__container">
        <h3>Become a member today!</h3>
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
                  "Access-Control-Allow-Origin": "http://localhost:3000",
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "Access-Control-Allow-Credentials": "true",
                },
                body: JSON.stringify(values),
              }
            ).then((data) => data.json());
            if (response?.error) {
              alert(response?.error);
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
