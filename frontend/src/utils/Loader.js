import * as React from 'react';
import {CircularProgress, Box, Container} from '@mui/material';
import { styled } from '@mui/material/styles';
const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
    textAlign: 'center',
    padding: '50vh',
  }));
export default function Loader() {
  return (
    <Box sx={{ height: '100vh', width: '100vw'}}>
      <StyledCircularProgress />
    </Box>

  );
}