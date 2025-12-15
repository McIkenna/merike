

import { Box, Stack, Typography, Skeleton } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

// Modern Category Filter Component
export const Category = ({ 
  categories, 
  selectedCategory, 
  handleCategoryChange
}) => {
  return (
    <Box sx={{ width: '100%', py: 1, px: 3,}}>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          overflowX: 'auto',
          pb: 2,
          '&::-webkit-scrollbar': {
            height: '6px'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: '10px'
          }
        }}
      >
        {!categories ? (
          // Loading Skeletons
          <>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton
                key={item}
                variant="text"
                width={80}
                height={30}
                sx={{ flexShrink: 0 }}
              />
            ))}
          </>
        ) : (
          <>
            {/* All Category */}
            <Typography
              onClick={() => handleCategoryChange('all')}
              sx={{
                cursor: 'pointer',
                fontSize: '1rem',
                color: 'text.primary',
                flexShrink: 0,
                whiteSpace: 'nowrap',
                fontWeight: selectedCategory === 'all' ? 700 : 400,
                textDecoration: selectedCategory === 'all' ? 'underline' : 'none',
                textUnderlineOffset: '6px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: grey[600]
                }
              }}
            >
              All
            </Typography>

            {/* Category Items */}
            {categories?.categories?.map((category, index) => (
              <Typography
                key={index}
                onClick={() => handleCategoryChange(category?.categoryName)}
                sx={{
                  cursor: 'pointer',
                  fontSize: '1rem',
                  color: 'text.primary',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  fontWeight: category?.categoryName === selectedCategory ? 700 : 400,
                  textDecoration: category?.categoryName === selectedCategory ? 'underline' : 'none',
                  textUnderlineOffset: '6px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: grey[600]
                  }
                }}
              >
                {category?.categoryName}
              </Typography>
            ))}
          </>
        )}
      </Stack>
    </Box>
  );
};

