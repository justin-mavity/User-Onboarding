import React, { useState, useEffect } from "react";
import User from "./User";
import UserForm from "./UserForm";

import * as yup from "yup";
import schema from "./validation/formSchema";
import "./App.css";

const initialFormValues = {
  username: "",
  email: "",
  password: "",
  agree: false,
};

const initalFormErrors = {
  username: "",
  email: "",
  password: "",
};
const initialUsers = [];
const initialDisabled = true;

export default function App() {
  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initalFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const postNewUser = (newUser) => {
    setUsers([...users, newUser]);
    setFormValues(initialFormValues);
  };

  const inputChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formSubmit = () => {
    const newUser = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms,
    };
    postNewUser(newUser);
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Onbroading</h1>
      </header>
      <div className="form-container">
        <UserForm
          values={formValues}
          change={inputChange}
          submit={formSubmit}
          disabled={disabled}
          errors={formErrors}
        />
      </div>
      {users.map((user) => {
        return <User key={user.id} details={user} />;
      })}
    </div>
  );
}
