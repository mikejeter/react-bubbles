import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

const Login = props => {
  const classes = useStyles();
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("/api/login", data)
      .then(response => {
        window.localStorage.setItem("token", response.data.payload);
        props.history.push("/bubbles");
      })
      .catch(error => console.log(error));
  };

  return (
      <div className="formContainer">
        <h1>Welcome to the Bubble App!</h1>
        <form
          onSubmit={handleSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-basic"
              onChange={handleChange}
              value={data.username}
              type="text"
              name="username"
              label="Username"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              onChange={handleChange}
              value={data.password}
              type="password"
              name="password"
              label="Password"
              variant="outlined"
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
  );
};

export default Login;