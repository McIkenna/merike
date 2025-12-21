import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Alert,
    Snackbar,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Paper
} from '@mui/material';
import {
    Mail,
    Phone,
    LocationOn,
    AccessTime,
    Send,
    ContactSupport,
    Chat,
    QuestionAnswer
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Divider } from '../../utils/Divider';

const ContactCard = styled(Card)(({ theme }) => ({
    height: '100%',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme.shadows[8],
    },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    width: 70,
    height: 70,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    margin: '0 auto',
    marginBottom: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
}));

export const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const contactMethods = [
        {
            icon: <Mail fontSize="large" />,
            title: 'Email Us',
            description: 'Send us an email anytime',
            detail: 'merikemart@gmail.com',
            secondaryDetail: 'Response within 24 hours',
            color: 'primary.main'
        },
        {
            icon: <Phone fontSize="large" />,
            title: 'Call Us',
            description: 'Mon-Fri, 9AM-6PM EST',
            detail: '+1 (912) 541-0818',
            color: 'secondary.main'
        },
        {
            icon: <LocationOn fontSize="large" />,
            title: 'Visit Us',
            description: 'Corporate Office',
            detail: 'Chicago, IL',
            secondaryDetail: 'United States',
            color: 'success.main'
        },
        {
            icon: <Chat fontSize="large" />,
            title: 'Live Chat',
            description: 'Chat with our team',
            detail: 'Available 24/7',
            secondaryDetail: 'Instant support',
            color: 'neutral.main'
        }
    ];

    const categories = [
        'General Inquiry',
        'Order Issues',
        'Shipping & Delivery',
        'Returns & Refunds',
        'Payment Issues',
        'Product Questions',
        'Technical Support',
        'Partnership Opportunities',
        'Feedback & Suggestions',
        'Other'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (formData.phone) {
            const phone = formData.phone.trim();
            // Allow an optional leading +, digits, spaces, hyphens, parentheses and dots.
            // Require a reasonable number of digits (7-20) to avoid short/garbage values.
            const allowed = /^\+?[0-9\s\-().]+$/;
            const digits = phone.replace(/\D/g, '');
            if (!allowed.test(phone) || digits.length < 7 || digits.length > 20) {
                newErrors.phone = 'Phone number is invalid';
            }
        }

        if (!formData.category) {
            newErrors.category = 'Please select a category';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Simulate form submission
            console.log('Form submitted:', formData);

            setSnackbarMessage('Thank you for contacting us! We\'ll get back to you within 24 hours.');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                category: '',
                message: ''
            });
        } else {
            setSnackbarMessage('Please fill in all required fields correctly.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
                        <ContactSupport fontSize="large" color="primary" />
                        <Typography variant='h3' sx={{ fontWeight: 700 }}>
                            Contact Us
                        </Typography>
                    </Box>
                    <Typography variant='body1' color="text.secondary" sx={{ mb: 2, maxWidth: 700, mx: 'auto' }}>
                        Have questions or need assistance? We're here to help! Reach out to us through any of the methods below.
                    </Typography>
                    <Box sx={{ mx: 'auto', height: 3, bgcolor: 'primary.main', borderRadius: 2 }} >
                        <Divider />
                    </Box>

                </Box>

                {/* Contact Methods */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    {contactMethods.map((method, index) => (
                        <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                            <ContactCard elevation={3}>
                                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                    <IconWrapper sx={{ bgcolor: method.color }}>
                                        {method.icon}
                                    </IconWrapper>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        {method.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        {method.description}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main', mb: 0.5 }}>
                                        {method.detail}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {method.secondaryDetail}
                                    </Typography>
                                </CardContent>
                            </ContactCard>
                        </Grid>
                    ))}
                </Grid>

                {/* Contact Form and Info Section */}
                <Grid container spacing={4}>
                    {/* Contact Form */}
                    <Grid item size={{ xs: 12, md: 7 }}>
                        <Paper elevation={3} sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <QuestionAnswer color="primary" />
                                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                    Send Us a Message
                                </Typography>
                            </Box>

                            <Box component="form" onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item size={{ xs: 12, md: 6 }}>
                                        <StyledTextField
                                            fullWidth
                                            label="Full Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            required
                                        />
                                    </Grid>
                                    <Grid item size={{ xs: 12, md: 6 }}>
                                        <StyledTextField
                                            fullWidth
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            error={!!errors.email}
                                            helperText={errors.email}
                                            required
                                        />
                                    </Grid>
                                    <Grid item size={{ xs: 12, md: 6 }}>
                                        <StyledTextField
                                            fullWidth
                                            label="Phone Number (Optional)"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            error={!!errors.phone}
                                            helperText={errors.phone}
                                        />
                                    </Grid>
                                    <Grid item size={{ xs: 12, md: 6 }}>
                                        <FormControl fullWidth error={!!errors.category} required>
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                label="Category"
                                            >
                                                {categories.map((cat, idx) => (
                                                    <MenuItem key={idx} value={cat}>
                                                        {cat}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors.category && (
                                                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                                                    {errors.category}
                                                </Typography>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item size={{ xs: 12 }}>
                                        <StyledTextField
                                            fullWidth
                                            label="Subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item size={{ xs: 12 }}>
                                        <StyledTextField
                                            fullWidth
                                            label="Message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            error={!!errors.message}
                                            helperText={errors.message || 'Minimum 10 characters'}
                                            multiline
                                            rows={5}
                                            required
                                        />
                                    </Grid>
                                    <Grid item size={{ xs: 12 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            startIcon={<Send />}
                                            sx={{
                                                py: 1.5,
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            Send Message
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Additional Info */}
                    <Grid item size={{ xs: 12, md: 5 }}>
                        <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                                Business Hours
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <AccessTime color="primary" />
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        Customer Support
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Monday - Friday: 9:00 AM - 6:00 PM EST
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Saturday - Sunday: 10:00 AM - 4:00 PM EST
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Divider />
                            </Box>

                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                Our team typically responds to inquiries within 24 hours during business days. For urgent matters, please call us directly.
                            </Typography>
                        </Paper>

                        <Paper elevation={3} sx={{ p: 4, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                Need Immediate Help?
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
                                Check out our FAQ page for quick answers to common questions, or use our live chat feature for instant support.
                            </Typography>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    bgcolor: 'background.paper',
                                    color: 'primary.main',
                                    '&:hover': {
                                        bgcolor: 'grey.100'
                                    }
                                }}
                                href="/faqs"
                            >
                                Visit FAQ Page
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Additional Info Section */}
                {/* <Box sx={{ mt: 6, p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                        Other Ways to Reach Us
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                                    General Inquiries
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    info@merikemart.com
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                                    Social Media Platforms
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    partners@merikemart.com
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box> */}
            </Container>

            {/* Snackbar for notifications */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}