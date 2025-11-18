import * as React from 'react';
import { Box, Paper, CardMedia, CardContent, Typography, Button, IconButton } from '@mui/material';
// import {AddOutlinedIcon, RemoveOutlinedIcon} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
    image,
    price,
    ratings
  } = props?.product

  return (
    <Box
    >
      <Item elevation={0}>
        <Box>
        
        <CardContent sx={{mb: 0 }}>
        <Link to={`/product/${_id}`} style={{ textDecoration: 'none' }}>
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
            image={images?.[0]?.url ?? image}
            sx={{
              width: '180px',
              height: '180px',
              objectFit: 'contain', // Ensures the image covers the area without distortion
              p:2,
              transition: 'transform 0.3s ease-in-out', // Adds a smooth hover effect
              '&:hover': {
                transform: 'scale(1.05)', // Slightly enlarges the image on hover
              },
              
            }}
          />
          </Box>
          
        </Link>
          <Box sx={{ mb: 4}}>
            <Link to={`/product/${_id}`} style={{ textDecoration: 'none' }}>
              <Typography 
              variant="body1"
            sx={{
              fontWeight: 600,
              color: 'primary.main',
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: 48,
              lineHeight: 1.5,
              '&:hover': {
                color: 'text.primary',
                textDecoration: 'underline',
              }
            }}>
                {name}
              </Typography>
            </Link>
            <Typography 
            variant="h6"
            fontWeight="700"
            color="text.primary">
              $ {price}
            </Typography>
          </Box>
        </CardContent>
        </Box>
      </Item>
    </Box>
  );
}