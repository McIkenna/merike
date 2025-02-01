import * as React from 'react';
import { Box, Paper, CardMedia, CardContent, Typography, Button, IconButton } from '@mui/material';
// import {AddOutlinedIcon, RemoveOutlinedIcon} from '@mui/icons-material';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { styled } from '@mui/material/styles';
import ReviewRating from './ReviewRating';
import { Link } from 'react-router-dom';
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
  // console.log('props', props)
  const {
    _id,
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
        <Box>
        
        <CardContent sx={{mb: 0 }}>
        <Link to={`product/${_id}`} style={{ textDecoration: 'none' }}>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "250px",
            overflow: "hidden",
            padding: '10px'
          }}>
          <CardMedia
            component="img"
            image={images[0].url}
            sx={{
              width: '250px',
              height: '250px',
              borderRadius: '8px', // Adds rounded corners
              objectFit: 'cover', // Ensures the image covers the area without distortion
              transition: 'transform 0.3s ease-in-out', // Adds a smooth hover effect
              '&:hover': {
                transform: 'scale(1.05)', // Slightly enlarges the image on hover
              },
              
            }}
          />
          </Box>
          
        </Link>
          <Box sx={{ mb: 4}}>
            <Link to={`product/${_id}`} style={{ textDecoration: 'none' }}>
              <Typography variant="h7" sx={{ mb: 1, fontWeight: "bold", color: grey[700] }}>
                {name}
              </Typography>
            </Link>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: grey[800], textAlign: 'left', paddingLeft: '10px'}}>
              $ {price}
            </Typography>
          </Box>
          {/* <Box
            sx={{
              mb: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Box
              sx={{
                display: "flex",
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
            <Button variant="contained" color="primary">
              Add to Cart
            </Button> 
            <Box>
              <IconButton variant="body1" size='large'>
                <AddOutlinedIcon size={2} />
              </IconButton>
              <IconButton variant="body1" size='large'>
                <RemoveOutlinedIcon size={2} />
              </IconButton>
            </Box>
          </Box> */}

          {/* <ReviewRating value={ratings} /> */}
        </CardContent>
        </Box>
      </Item>
    </Box>
  );
}