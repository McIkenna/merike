import React from 'react';
import {Box, Rating, Typography} from '@mui/material';

const ReviewRating = (props) =>{
  const {value} = props
  const rating = value === null ? 0 : value
  // const { val, setVal} = useState(rating)
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating
        name="simple-controlled"
        value={rating}
        readOnly
    
      />
    </Box>
  );
}

export default ReviewRating