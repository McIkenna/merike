import React from 'react'
import { Grid, Paper, Box, Typography, Container, Card, CardContent } from '@mui/material';
import { Divider } from '../../utils/Divider';
import { styled } from '@mui/material/styles';
import { Store, LocalShipping, Security, Star } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme.shadows[8],
    },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    width: 60,
    height: 60,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(2),
}));

const SectionCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: theme.shadows[6],
    },
}));

export const AboutUs = () => {
    const features = [
        {
            icon: <Store fontSize="large" />,
            title: "Wide Selection",
            description: "Quality products across diverse categories, all in one convenient marketplace"
        },
        {
            icon: <LocalShipping fontSize="large" />,
            title: "Fast Delivery",
            description: "Efficient logistics ensuring your orders arrive quickly and safely"
        },
        {
            icon: <Security fontSize="large" />,
            title: "Secure Payments",
            description: "Modern technology and secure payment systems for peace of mind"
        },
        {
            icon: <Star fontSize="large" />,
            title: "Customer First",
            description: "Responsive support and commitment to your satisfaction"
        }
    ];

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
            <Container maxWidth="lg">
                {/* Hero Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant='h3'
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            background: 'linear-gradient(45deg, #044CAB 30%, #FB3D3D 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        About Merikemart
                    </Typography>
                    <Typography
                        variant='h6'
                        color="text.secondary"
                        sx={{ maxWidth: 700, mx: 'auto', mb: 1 }}
                    >
                        A Proud Subsidiary of Merike LLC
                    </Typography>
                    <Box sx={{ mx: 'auto', height: 3, bgcolor: 'primary.main', borderRadius: 2 }} >
                        <Divider />
                    </Box>


                </Box>

                {/* Main Content Sections */}
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    <Grid item size={{xs:12}}>
                        <SectionCard elevation={2}>
                            <CardContent>
                                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                                    Who We Are
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.primary' }}>
                                    Merikemart is a fast-growing online shopping platform dedicated to making everyday shopping simple, affordable, and reliable. As a proud subsidiary of Merike LLC, we are built on a strong foundation of innovation, trust, and customer-first values.
                                </Typography>
                            </CardContent>
                        </SectionCard>
                    </Grid>

                    <Grid item size={{xs:12}}>
                        <SectionCard elevation={2}>
                            <CardContent>
                                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                                    Our Mission
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.primary' }}>
                                    Our mission is to connect customers with quality products across a wide range of categories, all in one convenient place. From daily essentials to trending items, we carefully curate our marketplace to ensure value, variety, and satisfaction with every purchase.
                                </Typography>
                            </CardContent>
                        </SectionCard>
                    </Grid>

                    <Grid item size={{xs:12}}>
                        <SectionCard elevation={2}>
                            <CardContent>
                                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                                    Our Commitment
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.primary' }}>
                                    Backed by the experience and vision of Merike LLC, Merikemart leverages modern technology, secure payment systems, and efficient logistics to deliver a seamless shopping experience. We are committed to transparency, fast delivery, and responsive customer support.
                                </Typography>
                            </CardContent>
                        </SectionCard>
                    </Grid>
                </Grid>

                {/* Features Grid */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 600, mb: 4 }}>
                        Why Choose Us
                    </Typography>
                    <Grid container spacing={3}>
                        {features.map((feature, index) => (
                            <Grid item size={{xs:12, sm:6, md:3 }} key={index}>
                                <StyledCard elevation={3}>
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <IconWrapper sx={{ mx: 'auto' }}>
                                            {feature.icon}
                                        </IconWrapper>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Closing Statement */}
                <Box
                    sx={{
                        textAlign: 'center',
                        p: 4,
                        borderRadius: 3,
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        boxShadow: 3,
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                        Shop with Confidence
                    </Typography>
                    <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.8 }}>
                        At Merikemart, we believe shopping should be easy, enjoyable, and accessible to everyone. We continue to grow, innovate, and improve—so you can shop with confidence, anytime and anywhere.
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}