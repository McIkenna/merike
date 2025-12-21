import React, { useEffect } from 'react';
import { Container, Grid, Paper, Typography, Avatar, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      navigate('/login');
    }
  }, [user?._id, navigate]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Header Section */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 3
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                alt={`${user?.firstName} ${user?.lastName}`}
                src="/path/to/avatar.jpg"
                sx={{ 
                  width: 80, 
                  height: 80,
                  border: '4px solid',
                  borderColor: 'grey.100'
                }}
              />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                  {user?.email}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Grid Layout */}
          <Grid container spacing={3}>
            {/* Personal Information */}
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  height: '100%'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Personal Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    py: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      First Name
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {user?.firstName}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    py: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Last Name
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {user?.lastName}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    py: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Email
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {user?.email}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    py: 1.5
                  }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Phone Number
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      ********
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Account Settings */}
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  height: '100%'
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Account Settings
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    py: 1.5,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Username
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {user?.email}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    py: 1.5
                  }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Password
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      ********
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfilePage;