import React, { useMemo } from 'react'
import { Box, Container, Grid, Typography } from '@mui/material';
import BoxCard from '../../utils/BoxCard.jsx';
import { useSelector } from 'react-redux';
import {  useLocation } from 'react-router-dom';
export const SelectHome = () => {

    const stateStore  = useSelector((state) => state.stateStore)
    const {recommendedProducts, cartInspiredProducts, productRecentlyBought, favorites, totalPrice, totalQuantity, cartItems} = stateStore
    // const [title, setTitle] = useState('');
    const location = useLocation();

    const productsToShow = useMemo(() => {
      if (location.pathname === '/recommended') {
        return {
          product: recommendedProducts,
          title: 'Recommended Products'

        };
      } else if (location.pathname === '/cart-inspired') {
        return {
          product: cartInspiredProducts,
          title: 'Cart Inspired Products'

        }
      } else if (location.pathname === '/recently-bought') {
        // Logic for recently bought products can be added here
        return {
          product: productRecentlyBought,
          title: 'Recently Bought Products'
        }; // Placeholder
      }
      return [];
    }, [location.pathname, recommendedProducts, cartInspiredProducts, productRecentlyBought]);


    return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Section Header */}
      {productsToShow?.title && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="700" color="text.primary">
            {productsToShow?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {productsToShow?.product?.length || 0} products found
          </Typography>
        </Box>
      )}

      {/* Product Grid - 5 items per row */}
      <Grid container spacing={3}>
        {productsToShow?.product?.map((product) => (
          <Grid 
            size={{ xs:12,     // 1 column on extra small screens
            sm:6,      // 2 columns on small screens
            md:4,       // 3 columns on medium screens
            lg:2.4 }}
                // 5 columns on large screens (12/5 = 2.4)
            key={product._id}
          >
            <BoxCard 
            product={product}
            favorites={favorites} 
            totalPrice={totalPrice}
            totalQuantity={totalQuantity} 
            cartItems={cartItems}
            />
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {(!productsToShow?.product || productsToShow?.product.length === 0) && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 2
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters or search terms
          </Typography>
        </Box>
      )}
    </Container>
  )
}
