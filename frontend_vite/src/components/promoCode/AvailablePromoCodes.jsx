import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Button
} from '@mui/material';
import { LocalOffer, CalendarToday } from '@mui/icons-material';
import { useGetActivePromoCodesQuery } from '../../../api/services/promoCodeApi';
import { Divider } from '../../utils/Divider';

const AvailablePromoCodes = ({ onSelectCode }) => {
  const { data, isLoading } = useGetActivePromoCodesQuery();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!data?.promoCodes || data.promoCodes.length === 0) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Available Offers
      </Typography>
      <Grid container spacing={2}>
        {data.promoCodes.map((promo) => (
          <Grid xs={12} sm={6} md={4} key={promo._id}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocalOffer color="primary" sx={{ mr: 1 }} />
                  <Chip
                    label={promo.code}
                    color="primary"
                    size="small"
                    sx={{ fontWeight: 700 }}
                  />
                </Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {promo.description}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarToday sx={{ fontSize: 14, mr: 0.5 }} />
                  Valid until {new Date(promo.validUntil).toLocaleDateString()}
                </Typography>
                <Box sx={{ my: 1 }}>
                  <Divider />
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  onClick={() => onSelectCode(promo.code)}
                  sx={{ textTransform: 'none' }}
                >
                  Use Code
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AvailablePromoCodes;