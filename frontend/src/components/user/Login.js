import React from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { withStyles } from "@mui/styles";
import { useMediaQuery } from "@mui/material";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
                  label="Email"
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
                />
              </Grid>

              <Grid item md={12} xs={8}>
                <TextField
                  label="Password"
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
                />
              </Grid>
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
