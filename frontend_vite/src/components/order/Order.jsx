import React, { useMemo, useState } from 'react';
import {
    Container,
    Paper,
    Box,
    Typography,
    Avatar,
   
    Chip,
    Grid,
    Stack,
    Button,
    Card,
    CardContent,
    IconButton,
    Collapse,
    Alert
} from '@mui/material';
import {
    ShoppingBag,
    LocalShipping,
    CheckCircle,
    Cancel,
    ExpandMore,
    ExpandLess,
    Receipt,
    CalendarToday,
    LocationOn
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useMyOrdersQuery } from '../../api/services/orderApi';
import { styled } from '@mui/material/styles';
import { Divider } from '../../utils/Divider';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(2),
    border: '1px solid',
    borderColor: theme.palette.divider,
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: theme.shadows[4],
        borderColor: theme.palette.primary.main,
    },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
    fontWeight: 600,
    borderRadius: theme.spacing(1),
    textTransform: 'capitalize',
}));

const SummaryBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    border: '1px solid',
    borderColor: theme.palette.divider,
}));

const ItemCard = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1.5),
    backgroundColor: theme.palette.background.paper,
    border: '1px solid',
    borderColor: theme.palette.divider,
    marginBottom: theme.spacing(1.5),
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

// Utility Functions
const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
    }).format(value || 0);
};


const formatShortDate = (iso) => {
    if (!iso) return 'N/A';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

// Status Configuration
const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase() || 'pending';
    
    const configs = {
        pending: {
            label: 'Pending',
            color: 'warning',
            icon: <ShoppingBag fontSize="small" />,
            bgColor: '#fff3e0'
        },
        processing: {
            label: 'Processing',
            color: 'info',
            icon: <Receipt fontSize="small" />,
            bgColor: '#e3f2fd'
        },
        shipped: {
            label: 'Shipped',
            color: 'primary',
            icon: <LocalShipping fontSize="small" />,
            bgColor: '#e8eaf6'
        },
        delivered: {
            label: 'Delivered',
            color: 'success',
            icon: <CheckCircle fontSize="small" />,
            bgColor: '#e8f5e9'
        },
        cancelled: {
            label: 'Cancelled',
            color: 'error',
            icon: <Cancel fontSize="small" />,
            bgColor: '#ffebee'
        },
    };

    return configs[statusLower] || configs.pending;
};

// Order Item Component
const OrderItem = ({ item }) => {
    return (
        <ItemCard>
            <Avatar
                variant="rounded"
                src={item?.image}
                sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'background.default',
                }}
            >
                {!item?.image && item?.name?.slice(0, 2).toUpperCase()}
            </Avatar>
            
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {item?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Quantity: {item?.quantity || 1}
                </Typography>
            </Box>

            <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {formatCurrency(item?.price)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    per item
                </Typography>
            </Box>
        </ItemCard>
    );
};

// Order Card Component
const OrderCard = ({ order }) => {
    const [expanded, setExpanded] = useState(false);
    const statusConfig = getStatusConfig(order?.orderStatus);

    return (
        <StyledCard elevation={0}>
            <CardContent sx={{ p: 3 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 2,
                                bgcolor: statusConfig.bgColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: `${statusConfig.color}.main`,
                            }}
                        >
                            {statusConfig.icon}
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                Order #{order?._id?.slice(-8).toUpperCase()}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CalendarToday sx={{ fontSize: 14, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                    {formatShortDate(order?.createdAt)}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <StatusChip
                        label={statusConfig.label}
                        color={statusConfig.color}
                        icon={statusConfig.icon}
                        size="medium"
                    />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Order Summary - Collapsed by default */}
                <Box sx={{ mb: 2 }}>
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            cursor: 'pointer',
                            py: 1,
                            '&:hover': {
                                bgcolor: 'action.hover',
                                borderRadius: 1,
                            }
                        }}
                        onClick={() => setExpanded(!expanded)}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {order?.orderItem?.length || 0} Item{order?.orderItem?.length !== 1 ? 's' : ''}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                {formatCurrency(order?.totalPrice)}
                            </Typography>
                            <IconButton size="small">
                                {expanded ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        </Box>
                    </Box>

                    <Collapse in={expanded}>
                        <Box sx={{ mt: 2 }}>
                            {/* Items List */}
                            <Box sx={{ mb: 3 }}>
                                {order?.orderItem?.map((item, idx) => (
                                    <OrderItem key={idx} item={item} />
                                ))}
                            </Box>

                            {/* Price Breakdown */}
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={order?.shippingInfo?.address1 !== 'Pending' ? 6 : 12}>
                                    <SummaryBox>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                                            Order Summary
                                        </Typography>

                                        <Stack spacing={1.5}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Subtotal
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {formatCurrency(order?.itemPrice)}
                                                </Typography>
                                            </Box>

                                            {order?.discount > 0 && (
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography variant="body2" color="success.main">
                                                        Discount {order?.promoCode && `(${order.promoCode})`}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                                                        -{formatCurrency(order?.discount)}
                                                    </Typography>
                                                </Box>
                                            )}

                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Shipping
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {formatCurrency(order?.shippingPrice)}
                                                </Typography>
                                            </Box>

                                            {order?.taxPrice > 0 && (
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Tax
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {formatCurrency(order?.taxPrice)}
                                                    </Typography>
                                                </Box>
                                            )}

                                            <Divider />

                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                                    Total
                                                </Typography>
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                                    {formatCurrency(order?.totalPrice)}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </SummaryBox>
                                </Grid>

                                {/* Shipping Information */}
                                {order?.shippingInfo?.address1 !== 'Pending' && (
                                    <Grid item xs={12} md={6}>
                                        <SummaryBox>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                                <LocationOn color="primary" fontSize="small" />
                                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                    Shipping Address
                                                </Typography>
                                            </Box>

                                            <Stack spacing={0.5}>
                                                <Typography variant="body2">
                                                    {order?.shippingInfo?.address1}
                                                </Typography>
                                                {order?.shippingInfo?.address2 && (
                                                    <Typography variant="body2">
                                                        {order.shippingInfo.address2}
                                                    </Typography>
                                                )}
                                                <Typography variant="body2">
                                                    {order?.shippingInfo?.city}, {order?.shippingInfo?.state} {order?.shippingInfo?.postalCode}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {order?.shippingInfo?.country}
                                                </Typography>
                                                {order?.shippingInfo?.phoneNo && (
                                                    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                                                        📞 {order.shippingInfo.phoneNo}
                                                    </Typography>
                                                )}
                                            </Stack>
                                        </SummaryBox>
                                    </Grid>
                                )}
                            </Grid>

                            {/* Payment Info */}
                            {order?.paymentInfo?.status && (
                                <Box sx={{ mt: 2 }}>
                                    <Chip
                                        label={`Payment: ${order.paymentInfo.status}`}
                                        size="small"
                                        color={order.paymentInfo.status === 'Paid' ? 'success' : 'default'}
                                        sx={{ mr: 1 }}
                                    />
                                    {order?.paidAt && (
                                        <Chip
                                            label={`Paid on ${formatShortDate(order.paidAt)}`}
                                            size="small"
                                            variant="outlined"
                                        />
                                    )}
                                </Box>
                            )}
                        </Box>
                    </Collapse>
                </Box>
            </CardContent>
        </StyledCard>
    );
};

// Main Component
const Order = () => {
    const { auth } = useSelector(state => state);
    const { user } = auth;
    const { data: orderData, isLoading } = useMyOrdersQuery(user?._id);

    const orders = useMemo(() => {
        if (!orderData?.orders || orderData.orders.length === 0) return [];
        return orderData.orders;
    }, [orderData]);

    // Empty State
    if (!isLoading && orders.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '50vh',
                        textAlign: 'center',
                    }}
                >
                    <Box
                        sx={{
                            width: 120,
                            height: 120,
                            borderRadius: '50%',
                            bgcolor: 'primary.light',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                        }}
                    >
                        <ShoppingBag sx={{ fontSize: 60, color: 'primary.main' }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                        No Orders Yet
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
                        You haven't placed any orders yet. Start shopping to see your orders here!
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => window.location.href = '/'}
                        sx={{ px: 4 }}
                    >
                        Start Shopping
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    My Orders
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {orders.length} order{orders.length !== 1 ? 's' : ''} found
                </Typography>
            </Box>

            {/* Loading State */}
            {isLoading && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="body1" color="text.secondary">
                        Loading your orders...
                    </Typography>
                </Box>
            )}

            {/* Orders List */}
            {!isLoading && orders.map((order, index) => (
                <OrderCard key={order._id || index} order={order} />
            ))}
        </Container>
    );
};

export default Order;