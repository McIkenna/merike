import React, {useState} from 'react';
import {Box, Rating, Typography} from '@mui/material';

const ReviewRating = () =>{
  const [value, setValue] = useState(2);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Typography component="legend">Read only</Typography>
    </Box>
  );
}

export default ReviewRating