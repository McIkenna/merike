import React, {useEffect} from 'react';
import { Container, Grid, Paper, Typography, Avatar, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const UserProfilePage = () => {

    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?._id) {
            navigate('/login');
        }
    }, [user?._id]);
  return (
    <Container >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: '20px', display:'flex', justifyContent:'space-between'}}>
            <Avatar
              alt="User Name"
              src="/path/to/avatar.jpg"
            />
            <Typography variant="h5" >
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body1" >
              {user?.email}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', display:'flex', justifyContent:'space-between', flexDirection: 'column'}} >
            <Typography variant="h6">Personal Information</Typography>
            <Box mt={2} style={{ padding: '20px', justifyContent:'space-evenly',}} >
              <Typography variant="body1" sx={{p: '10px'}}><strong>First Name:</strong> {user?.firstName}</Typography>
              <Typography variant="body1" sx={{p: '10px'}}><strong>Last Name:</strong> {user?.lastName}</Typography>
              <Typography variant="body1" sx={{p: '10px'}}><strong>Email:</strong> {user?.email}</Typography>
              <Typography variant="body1" sx={{p: '10px'}}><strong>Phone Number:</strong> ********</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper >
            <Typography variant="h6">Account Settings</Typography>
            <Box mt={2}>
              <Typography variant="body1"><strong>Username:</strong> {user?.email}</Typography>
              <Typography variant="body1"><strong>Password:</strong> ********</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfilePage;