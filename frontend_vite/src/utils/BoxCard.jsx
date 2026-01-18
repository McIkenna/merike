import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Rating,
  Chip
} from '@mui/material';
import {
  FavoriteBorder,
  Favorite,
  ShoppingCartOutlined,
  Visibility
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { setFavorites } from '../api/actions';
import { useDispatch } from 'react-redux';
import { AddItemToCart } from '../components/cart/cartUtils/AddItemToCart';
import { useNavigate } from 'react-router-dom';
import { CartInspiredProduct } from '../components/cart/cartUtils/CartInspiredProduct';
const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  border: '1px solid',
  borderColor: theme.palette.divider,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
    borderColor: theme.palette.primary.main,
    '& .product-image': {
      transform: 'scale(1.1)',
    },
    '& .quick-actions': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    '& .overlay': {
      opacity: 1,
    },
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: '100%', // 1:1 Aspect Ratio
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
}));

const ProductImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  padding: '16px',
  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
});

const QuickActions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 16,
  right: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  opacity: 0,
  transform: 'translateY(10px)',
  transition: 'all 0.3s ease',
  zIndex: 2,
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transform: 'scale(1.1)',
  },
  transition: 'all 0.2s ease',
}));

const PriceTag = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'baseline',
  gap: theme.spacing(0.5),
  padding: theme.spacing(0.5, 1.5),
  backgroundColor: theme.palette.success.light,
  borderRadius: theme.spacing(3),
  marginTop: theme.spacing(1),
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  left: 12,
  backgroundColor: theme.palette.background.paper,
  fontWeight: 600,
  fontSize: '0.75rem',
  height: 28,
  zIndex: 1,
  backdropFilter: 'blur(10px)',
  boxShadow: theme.shadows[1],
}));

const Overlay = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  pointerEvents: 'none',
}));


export default function BoxCard(props) {
  // const [isFavorite, setIsFavorite] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, favorites, totalPrice, totalQuantity, cartItems, setSnackbarMessage, setOpenSnackbar , setSeverity, cartInspiredProducts} = props

  const {
    _id,
    category,
    name,
    numOfReviews,
    images,
    image,
    price,
    ratings,
    stock
  } = product;

  const isFavorite = (prod_id) => {
    if (favorites.find(id => id === prod_id)) {
      let ids = favorites.filter(id => id !== prod_id);
      dispatch(setFavorites(ids))
      localStorage.setItem('favorites', JSON.stringify(ids))

    } else {
      let ids = [...favorites, prod_id];
      dispatch(setFavorites(ids))
      localStorage.setItem('favorites', JSON.stringify(ids))
    }

  }
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isFavorite(_id);

  };



  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick view functionality
  };

  const handleAddToCart = async () => {
    const success = await AddItemToCart(
      product,
      1,
      cartItems,
      dispatch,
      setOpenSnackbar,
      setSnackbarMessage,
      setSeverity,
      totalPrice,
      totalQuantity);

    if (success) {
      CartInspiredProduct(product, cartInspiredProducts, dispatch)
      setTimeout(() => {
        navigate("/cart")
      }, 1000);
      clearTimeout()
    }

    // navigate("/cart")

  }


  return (
    <StyledCard elevation={0}>
      <Link
        to={`/product/${_id}`}
        style={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Image Container */}
        <ImageContainer>
          <Overlay className="overlay" />

          {/* Category Badge */}
          <CategoryChip
            label={category}
            size="small"
            color="primary"
            variant="outlined"
          />

          {/* Stock Badge */}
          {stock !== undefined && stock < 5 && stock > 0 && (
            <Chip
              label={`Only ${stock} left`}
              size="small"
              color="warning"
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                fontWeight: 600,
                fontSize: '0.7rem',
                height: 24,
                zIndex: 1,
              }}
            />
          )}

          {/* Product Image */}
          <ProductImage
            className="product-image"
            src={images?.[0]?.url ?? image}
            alt={name}
            loading="lazy"
          />

          {/* Quick Actions */}
          <QuickActions className="quick-actions">
            <ActionButton
              size="small"
              onClick={handleFavoriteClick}
              aria-label="add to favorites"
            >
              {favorites.find((id) => id === _id) ? (
                <Favorite fontSize="small" color="error" />
              ) : (
                <FavoriteBorder fontSize="small" />
              )}
            </ActionButton>
            <ActionButton
              size="small"
              onClick={handleQuickView}
              aria-label="quick view"
            >
              <Visibility fontSize="small" />
            </ActionButton>
          </QuickActions>
        </ImageContainer>

        {/* Card Content */}
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            '&:last-child': { pb: 2 }
          }}
        >
          {/* Product Name */}
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: 48,
              lineHeight: 1.5,
              transition: 'color 0.2s ease',
              '&:hover': {
                color: 'primary.main',
              }
            }}
          >
            {name}
          </Typography>

          {/* Rating */}
          {ratings !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Rating
                value={ratings}
                precision={0.5}
                size="small"
                readOnly
                sx={{ fontSize: '1rem' }}
              />
              {numOfReviews !== undefined && (
                <Typography variant="caption" color="text.secondary">
                  ({numOfReviews})
                </Typography>
              )}
            </Box>
          )}

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Price */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
            <PriceTag>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: 'success.dark',
                  lineHeight: 1,
                }}
              >
                ${price}
              </Typography>
            </PriceTag>

            {/* Add to Cart Icon */}
            <IconButton
              size="small"
              sx={{
                color: 'primary.main',
                border: '2px solid',
                borderColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease',
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart()
                // Add to cart functionality
              }}
            >
              <ShoppingCartOutlined fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Link>
    </StyledCard>
  );
}