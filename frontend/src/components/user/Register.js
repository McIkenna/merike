import React, { useState, useEffect } from "react";
import {
  Button, Box, Grid, Link,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Container
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router";
import { useCreateUserMutation } from "../../api/services/userApi";
import { red } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../../api/actions";

const theme = createTheme();


export default function Register() {
  const dispatch = useDispatch();
  const mediaLessthanmd = useMediaQuery(theme.breakpoints.down("md"));
  const emptyState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  }
  const [userData, setUserData] = useState(emptyState);
  const { auth } = useSelector(state => state);
  const { user, token } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      navigate('/')
    }
  }, [user?._id, navigate])

  const [createUser, { isLoading, isError, isSuccess, ...props }] = useCreateUserMutation()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setError((prevState) => ({
      ...prevState,
      [name]: {
        error: false,
        errorMessage: ''
      }
    }));
  };
  const errorStatus = {
    firstName: {
      error: false,
      errorMessage: ''
    },
    lastName: {
      error: false,
      errorMessage: ''
    },
    email: {
      error: false,
      errorMessage: ''
    },
    password: {
      error: false,
      errorMessage: ''
    },
    confirmPassword: {
      error: false,
      errorMessage: ''
    }
  }
  const [error, setError] = useState(errorStatus);
  const [errorMessages, setErrorMessages] = useState('');


  const validate = () => {
    const requiredFields = ["firstName", "lastName", "email", "password", "confirmPassword"];
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!userData[field]) {
        setError((prevState) => ({
          ...prevState,
          [field]: {
            error: true,
            errorMessage: "This field is required"
          }
        }));
        isValid = false;
      }
    });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userData.email)) {
      setError((prevState) => ({
        ...prevState,
        email: {
          error: true,
          errorMessage: "Invalid email address"
        }
      }));
      isValid = false;
    }

    if (userData.password !== userData.confirmPassword) {
      setError((prevState) => ({
        ...prevState,
        confirmPassword: {
          error: true,
          errorMessage: "Password does not match"
        }
      }));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    console.log(userData)
    if (isValid) {

      const reqBody = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password
      };
      createUser(reqBody).unwrap().then((res) => {
        // console.log('res', res)
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        dispatch(setToken(res.token))
        dispatch(setUser(res.user))
      }).catch((err) => {
        setErrorMessages(err.data.message)
        // console.log('error', err.data.message);
      })
    } else {
      console.log('error')
    }
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main">
          <Box sx={{ display: "flex", pt: '20px' }}>
            {!mediaLessthanmd && (
              <Grid container style={{ flex: "6" }}>
                <img
                  src="/signin.png"
                  alt=""
                  style={{
                    height: "90%",
                    width: "90%",
                    backgroundSize: "cover",
                    opacity: "1"
                  }}
                />
              </Grid>
            )}
            <Box sx={{ flex: "6" }}>
              <Box>
                <Typography component="h1" variant="h5" sx={{ mb: "20" }}>
                  SIGN UP
                </Typography>
              </Box>

              <Grid
                container
                spacing={2}
                style={{
                  display: mediaLessthanmd && "flex",
                  alignItems: mediaLessthanmd && "center",
                  justifyContent: mediaLessthanmd && "center"
                }}
              >
                <Box sx={{ display: "flex", width: "100%", padding: "40px 0 10px 0" }}>
                  <TextField
                    name='firstName'
                    label="FirstName"
                    value={userData.firstName}
                    variant="outlined"
                    fullWidth
                    required
                    autoFocus
                    InputLabelProps={{
                      style: {
                        color: "black"
                      }
                    }}
                    InputProps={{
                      style: {
                        color: "black"
                      }
                    }}
                    type="text"
                    onChange={handleChange}
                    error={error.firstName.error}
                    helperText={error.firstName.errorMessage}
                  />
                </Box>
                <Box sx={{ display: "flex", width: "100%", padding: "10px 0 10px 0" }}>
                  <TextField
                    name='lastName'
                    label="LastName"
                    variant="outlined"
                    value={userData.lastName}
                    fullWidth
                    required
                    autoFocus
                    InputLabelProps={{
                      style: {
                        color: "black"
                      }
                    }}
                    InputProps={{
                      style: {
                        color: "black"
                      }
                    }}
                    type="text"
                    onChange={handleChange}
                    error={error.lastName.error}
                    helperText={error.lastName.errorMessage}
                  />
                </Box>
                <Box sx={{ display: "flex", width: "100%", padding: "10px 0 10px 0" }}>
                  <TextField
                    name="email"
                    label="Email"
                    value={userData.email}
                    variant="outlined"
                    fullWidth
                    required
                    autoFocus
                    InputLabelProps={{
                      style: {
                        color: "black"
                      }
                    }}
                    InputProps={{
                      style: {
                        color: "black"
                      }
                    }}
                    type="email"
                    onChange={handleChange}
                    error={error.email.error}
                    helperText={error.email.errorMessage}
                  />
                </Box>
                <Box sx={{ display: "flex", width: "100%", padding: "10px 0 10px 0" }}>
                  <TextField
                    name="password"
                    label="Password"
                    value={userData.password}
                    variant="outlined"
                    fullWidth
                    required
                    autoFocus
                    InputLabelProps={{
                      style: {
                        color: "black"
                      }
                    }}
                    InputProps={{
                      style: {
                        color: "black"
                      }
                    }}
                    type="password"
                    onChange={handleChange}
                    error={error.password.error}
                    helperText={error.password.errorMessage}
                  />
                </Box>
                <Box sx={{ display: "flex", width: "100%", padding: "10px 0 10px 0" }}>
                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    variant="outlined"
                    value={userData.confirmPassword}
                    fullWidth
                    required
                    autoFocus
                    InputLabelProps={{
                      style: {
                        color: "black"
                      }
                    }}
                    InputProps={{
                      style: {
                        color: "black"
                      }
                    }}
                    type="password"
                    onChange={handleChange}
                    error={error.confirmPassword.error}
                    helperText={error.confirmPassword.errorMessage}
                  />
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, borderRadius: '20px' }}
                  onClick={handleSubmit}

                >
                  <Typography variant="h6" sx={{ color: "white" }}>
                    Sign Up
                  </Typography>
                </Button>
                <Box>
                <Typography variant="subtitle1" sx={{color: red['500']}}>{errorMessages}</Typography>
              </Box>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
