import React, {useState, useEffect} from 'react'
import {Button, TextField, Link, Grid, Typography, Box} from "@mui/material";
import { withStyles } from "@mui/styles";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useLoginUserMutation } from '../../api/services/userApi';
import { useNavigate } from "react-router";
import { red } from "@mui/material/colors";
import { setToken, setUser } from '../../api/actions';

export default function Login() {
  const mediaLessthanmd = useMediaQuery("min-width : 900px");
  const emptyState = {
    email: "",
    password: "",
  }
  const [state, setState] = useState(emptyState);
  // const alert = useAlert()
  const [error, setError] = useState('');
  const dispatch = useDispatch()
  const [loginUser, {isLoading, isError, isSuccess, ...props}] = useLoginUserMutation()
  const navigate = useNavigate()
  const {auth} = useSelector(state => state)
  const {user, token} = auth

  useEffect(() => {
    if(user?._id && token) {
      navigate('/')
      setState(emptyState)
      setError('')
    }
  }, [user?._id, token, navigate])

  const handleStateChange = (e) => {
    const {name, value} = e.target;
    setError('')
    setState({
      ...state,
      [name]: value
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqBody = state
    loginUser(reqBody).unwrap().then((response) => {
      localStorage.setItem('token', response?.token)
      localStorage.setItem('user', JSON.stringify(response?.user))
      dispatch(setToken(response?.token))
      dispatch(setUser(response?.user))
    }).catch((error) => {
      setError(error?.data?.message)
    });
    
   
  };

  console.log('error', error)
  return (
    <>
      <form style={{ marginTop: "5vh" }} onSubmit={handleSubmit}>
        <Box style={{ display: "flex" }}>
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
          <Box style={{ flex: "6" }}>
            <Box style={{ textAlign: "left", paddingBottom: "20px" }}>
            <Typography component="h1" variant="h5" sx={{ mb: "20" }}>
              SIGN IN
            </Typography>
            </Box>
            

            <Grid
              container
              spacing={2}
              style={{
                display: mediaLessthanmd && "flex",
                alignItems: mediaLessthanmd && "left",
                justifyContent: mediaLessthanmd && "left"
              }}
            >
              <Grid item md={12} xs={8}>
                <Box sx={{pb: '20px'}}>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  autoFocus
                  onChange={handleStateChange}
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
                />
                </Box>
                <Box sx={{pb: '10px'}}>
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  autoFocus
                  onChange={handleStateChange}
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
                />
                </Box>
                <Typography variant="subtitle1" sx={{color: red['500']}}>{error}</Typography>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2, p:'10px', borderRadius: '20px', alignItems: 'center', justifyContent: 'center'}}
              >
                <Typography varaint='h1'>Log In</Typography>
              </Button>
              
              </Grid>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </form>
    </>
  );
}
