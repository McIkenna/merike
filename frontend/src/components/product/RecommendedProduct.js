import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Chip,
  IconButton,
  Stack,
  Link,
  ImageList, ImageListItem, ImageListItemBar, ListSubheader
} from '@mui/material';
const RecommendedProduct = ({ recommendedProducts, handleSelect }) => {

 
  return (
    <>
      <Card
        sx={{
          p: 2,
          boxShadow: 1,
          borderRadius: 2,
          justifyContent: 'center',
          alignItems: 'center',
          height: 500,
         cursor: 'pointer'
        }}
     onClick={() => handleSelect('recommended')}
      >
          <ImageList variant='quilted' sx={{ width: '100%', height: 450 }} cols={2}>
            <ImageListItem key="Subheader" cols={2} >
              <ListSubheader sx={{ background: 'none', fontSize: '1.4em', fontWeight: 'bold' }} >Recommended for you</ListSubheader>
            </ImageListItem>
            {recommendedProducts?.map((item) => (
              <ImageListItem key={item?.id}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden'
                }}>
                <img
                  srcSet={`${item?.images[0].url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item?.images[0].url}?w=164&h=164&fit=crop&auto=format`}
                  alt={item?.name}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
      </Card>
    </>
  );

};

export default RecommendedProduct;