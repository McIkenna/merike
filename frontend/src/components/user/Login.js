import React, {useState, useEffect} from 'react'
import {Button, TextField, Link, Grid, Typography} from "@mui/material";
import { withStyles } from "@mui/styles";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useLoginUserMutation } from '../../api/services/userApi';
import { useNavigate } from "react-router";
// const TextField = withStyles({
//   root: {
//     "& label.Mui-focused": {
//       color: "white"
//     },

//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         borderColor: "blue"
//       },
//       "&:hover fieldset": {
//         borderColor: "white"
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "blue"
//       }
//     }
//   }
// })(TextField);

export default function Login() {
  const mediaLessthanmd = useMediaQuery("min-width : 900px");
  const emptyState = {
    email: "",
    password: "",
  }
  const [state, setState] = useState(emptyState);
  // const alert = useAlert()
  const [error, setError] = useState('');
  useDispatch()
  const [loginUser, {isLoading, isError, isSuccess, ...props}] = useLoginUserMutation()
  const navigate = useNavigate()
  // const { isAuthenticated, error, loading} = useSelector(state => state.auth)
  console.log('props -->', props)

  useEffect(() => {
    if(isSuccess){
      navigate('/')
    }
    if(isError){
      setError('')
    }
  })

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
      console.log('response ->', response);
    }).catch((error) => {
      const {data} = error;
      setError(data?.message)
      // console.log('error', error)
    });
    
   
  };

  return (
    <>
      <form style={{ marginTop: "5vh" }} onSubmit={handleSubmit}>
        <div style={{ display: "flex" }}>
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
          <div style={{ flex: "6" }}>
            <Typography component="h1" variant="h5" sx={{ mb: "20" }}>
              SIGN IN
            </Typography>

            <Grid
              container
              spacing={2}
              style={{
                display: mediaLessthanmd && "flex",
                alignItems: mediaLessthanmd && "center",
                justifyContent: mediaLessthanmd && "center"
              }}
            >
              <Grid item md={12} xs={8}>
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
              </Grid>

              <Grid item md={12} xs={8}>
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
              </Grid>
              <span style={{ color: 'red'}}>{error ? error : ''}</span>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                "Log In"
              </Button>
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
          </div>
        </div>
      </form>
    </>
  );
}
