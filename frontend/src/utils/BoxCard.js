import * as React from 'react';
import {Box, Paper, CardMedia, CardContent, Typography, Button, IconButton} from '@mui/material';
// import {AddOutlinedIcon, RemoveOutlinedIcon} from '@mui/icons-material';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { styled } from '@mui/material/styles';
import ReviewRating from './ReviewRating';
import {
    grey,
    lightGreen,
    lime,
    green,
    cyan,
    teal,
    red,
    purple,
    deepPurple,
    indigo,
    blue,
    orange,
    pink,
    amber,
    brown,
    blueGrey,
    deepOrange
  } from "@mui/material/colors";
export default function BoxCard(props) {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
console.log('props', props)
const {
    category,
    name,
    description,
    numOfReviews,
    images,
    price,
    ratings
} = props?.product

  return (
    <Box
    >
      <Item elevation={0}>
              <CardMedia
                component="img"
                image={images[0].url}
              />
              <CardContent sx={{ p: 3, mb: 0 }}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                   {name}
                  </Typography>
                  <Typography variant="h6" sx={{fontWeight: "bold" }}>
                     $ {price}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mb: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      pt: 1,
                      pb: 1,
                      pr: 3,
                      pl: 3,
                      bgcolor: grey[100],
                      borderRadius: 2
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", fontSize: "17px" }}
                    >
                      1
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton variant="body1" size='large'>
                      <AddOutlinedIcon size={2} />
                    </IconButton>
                    <IconButton variant="body1" size='large'>
                      <RemoveOutlinedIcon size={2} />
                    </IconButton>
                  </Box>
                </Box>
                <Button>
                    Add to Cart
                </Button>
                <ReviewRating value={ratings}/>
              </CardContent>
      </Item>
    </Box>
  );
}