import React from 'react';
import { Box, Container, Typography, Skeleton, Grid, Card, CardContent } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// ============================================================================
// ANIMATIONS
// ============================================================================
const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// ============================================================================
// STYLED COMPONENTS
// ============================================================================
const LoadingContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

const AnimatedBox = styled(Box)({
  animation: `${fadeInUp} 0.6s ease-out`,
});

const SpinnerRing = styled(Box)(({ theme, size = 80, delay = 0 }) => ({
  width: size,
  height: size,
  border: `4px solid ${theme.palette.divider}`,
  borderTop: `4px solid ${theme.palette.primary.main}`,
  borderRadius: '50%',
  animation: `${rotate} 1s linear infinite`,
  animationDelay: `${delay}s`,
}));

const DotsContainer = styled(Box)({
  display: 'flex',
  gap: 12,
  justifyContent: 'center',
  alignItems: 'center',
});

const Dot = styled(Box)(({ theme, delay = 0 }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  animation: `${bounce} 1.4s ease-in-out infinite`,
  animationDelay: `${delay}s`,
}));

const ShimmerSkeleton = styled(Box)(({ theme }) => ({
  background: `linear-gradient(
    90deg,
    ${theme.palette.action.hover} 0%,
    ${theme.palette.action.selected} 50%,
    ${theme.palette.action.hover} 100%
  )`,
  backgroundSize: '1000px 100%',
  animation: `${shimmer} 2s infinite linear`,
  borderRadius: theme.spacing(1),
}));

// ============================================================================
// LOADING VARIANTS
// ============================================================================

// Variant 1: Spinner with Text
export const LoadingSpinner = ({ message = 'Loading products...' }) => {
  return (
    <LoadingContainer>
      <AnimatedBox sx={{ textAlign: 'center' }}>
        <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
          <SpinnerRing size={80} />
          <SpinnerRing 
            size={60} 
            delay={0.1}
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)' 
            }} 
          />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          {message}
        </Typography>
        <DotsContainer>
          <Dot delay={0} />
          <Dot delay={0.2} />
          <Dot delay={0.4} />
        </DotsContainer>
      </AnimatedBox>
    </LoadingContainer>
  );
};

// Variant 2: Product Grid Skeleton
export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={'100vw'} height={50} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={'100vw'} height={40} />
      </Box> */}
      
      <Grid container spacing={2} justify="center" paddingBottom={'20px'}>
        {Array.from({ length: count }).map((_, index) => (
          <Grid size={{md: 2, sm:3 , xs:6  }}key={index}>
            <Card 
              elevation={0}
              sx={{ 
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <ShimmerSkeleton sx={{ height: 400 }} />
              <CardContent>
                <Skeleton variant="text" width={'100vw'} height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width={'100vw'} height={20} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Variant 3: Minimalist Center Loading
export const MinimalistLoading = () => {
  return (
    <LoadingContainer>
      <AnimatedBox sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            animation: `${pulse} 2s ease-in-out infinite`,
            mb: 3,
            margin: '0 auto',
          }}
        />
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          Merikemart
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Loading amazing products...
        </Typography>
      </AnimatedBox>
    </LoadingContainer>
  );
};

// Variant 4: Card List Skeleton
export const ProductListSkeleton = ({ count = 5 }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Skeleton variant="text" width={250} height={48} sx={{ mb: 3 }} />
      
      {Array.from({ length: count }).map((_, index) => (
        <Card 
          key={index}
          elevation={0}
          sx={{ 
            mb: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <ShimmerSkeleton sx={{ width: 120, height: 120, flexShrink: 0 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton variant="text" width="60%" height={28} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="40%" height={32} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

// Variant 5: Progress Bar Loading
export const ProgressLoading = ({ message = 'Loading...' }) => {
  return (
    <LoadingContainer>
      <Box sx={{ width: '100%', maxWidth: 400, px: 3 }}>
        <AnimatedBox sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              mb: 3,
              animation: `${pulse} 2s ease-in-out infinite`,
            }}
          >
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
              M
            </Typography>
          </Box>
          
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            {message}
          </Typography>
          
          <ShimmerSkeleton sx={{ height: 8, borderRadius: 4 }} />
        </AnimatedBox>
      </Box>
    </LoadingContainer>
  );
};

// ============================================================================
// MAIN LOADING COMPONENT WITH VARIANTS
// ============================================================================
const ModernLoader = ({ 
  variant = 'spinner', 
  message = 'Loading...', 
  count = 8 
}) => {
  switch (variant) {
    case 'grid':
      return <ProductGridSkeleton count={count} />;
    case 'list':
      return <ProductListSkeleton count={count} />;
    case 'minimalist':
      return <MinimalistLoading />;
    case 'progress':
      return <ProgressLoading message={message} />;
    case 'spinner':
    default:
      return <LoadingSpinner message={message} />;
  }
};

export default ModernLoader;
