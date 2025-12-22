import React, { useState } from 'react';
import { 
    Container, 
    Box, 
    Typography, 
    TextField,
    Accordion, 
    AccordionSummary, 
    AccordionDetails,
    Chip,
    InputAdornment,
    Grid,
    Card,
    CardContent
} from '@mui/material';
import { 
    ExpandMore, 
    Search, 
    HelpOutline,
    ShoppingBag,
    LocalShipping,
    Payment,
    Replay,
    AccountCircle,
    ContactSupport
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Divider } from '../../utils/Divider';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[6],
    },
}));

const CategoryIcon = styled(Box)(({ theme }) => ({
    width: 60,
    height: 60,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    margin: '0 auto',
    marginBottom: theme.spacing(2),
}));

export const FAQs = () => {
    const [expanded, setExpanded] = useState('panel1');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const categories = [
        { id: 'general', name: 'General', icon: <HelpOutline fontSize="large" />, color: '#044CAB' },
        { id: 'orders', name: 'Orders', icon: <ShoppingBag fontSize="large" />, color: '#FB3D3D' },
        { id: 'shipping', name: 'Shipping', icon: <LocalShipping fontSize="large" />, color: '#116530' },
        { id: 'payment', name: 'Payment', icon: <Payment fontSize="large" />, color: '#FB3D3D' },
        { id: 'returns', name: 'Returns', icon: <Replay fontSize="large" />, color: '#044CAB' },
        { id: 'account', name: 'Account', icon: <AccountCircle fontSize="large" />, color: '#116530' },
    ];

    const faqs = [
        // General Questions
        {
            category: 'general',
            question: 'What is Merikemart?',
            answer: 'Merikemart is a fast-growing online shopping platform dedicated to making everyday shopping simple, affordable, and reliable. We are a proud subsidiary of Merike LLC, offering quality products across a wide range of categories, from daily essentials to trending items.'
        },
        {
            category: 'general',
            question: 'Who owns Merikemart?',
            answer: 'Merikemart is a subsidiary of Merike LLC. We are built on a strong foundation of innovation, trust, and customer-first values backed by the experience and vision of our parent company.'
        },
        {
            category: 'general',
            question: 'Is shopping on Merikemart safe?',
            answer: 'Yes! We use modern technology, secure payment systems, and SSL encryption to protect your personal and financial information. We are committed to transparency, security, and responsive customer support.'
        },
        {
            category: 'general',
            question: 'What products can I find on Merikemart?',
            answer: 'We offer a wide variety of products including daily essentials, electronics, home goods, fashion, beauty products, and trending items. Our marketplace is carefully curated to ensure value, variety, and satisfaction with every purchase.'
        },
        
        // Account Questions
        {
            category: 'account',
            question: 'Do I need an account to shop?',
            answer: 'While you can browse our products without an account, you need to create an account to place orders, track shipments, and access your order history. Creating an account is free and takes just a few minutes.'
        },
        {
            category: 'account',
            question: 'How do I create an account?',
            answer: 'Click on the "Register" button in the top right corner of the website, fill in your email address, create a password, and provide your basic information. You\'ll receive a confirmation email to verify your account.'
        },
        {
            category: 'account',
            question: 'I forgot my password. What should I do?',
            answer: 'Click on "Login" and then select "Forgot Password." Enter your email address, and we\'ll send you instructions to reset your password.'
        },
        {
            category: 'account',
            question: 'Can I change my account information?',
            answer: 'Yes! Log in to your account, go to "Account Settings" or "Profile," and you can update your email, password, shipping addresses, and other personal information.'
        },
        {
            category: 'account',
            question: 'How do I delete my account?',
            answer: 'To delete your account, please contact our customer support team at support@merikemart.com. We\'ll process your request within 5-7 business days.'
        },

        // Orders Questions
        {
            category: 'orders',
            question: 'How do I place an order?',
            answer: 'Browse our products, add items to your cart, proceed to checkout, enter your shipping information, select a payment method, and confirm your order. You\'ll receive an order confirmation email with your order details.'
        },
        {
            category: 'orders',
            question: 'Can I modify or cancel my order?',
            answer: 'You can modify or cancel your order within 1 hour of placing it by contacting customer support immediately. Once your order is processed and shipped, modifications are no longer possible, but you can return items according to our return policy.'
        },
        {
            category: 'orders',
            question: 'How do I track my order?',
            answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also log in to your account and view your order status in the "Orders" section. Click on the specific order to see detailed tracking information.'
        },
        {
            category: 'orders',
            question: 'What if an item is out of stock?',
            answer: 'If an item is out of stock, we\'ll notify you immediately and offer alternatives. You can choose to wait for a restock, select a similar product, or cancel that item from your order with a full refund.'
        },
        {
            category: 'orders',
            question: 'Do you offer gift wrapping?',
            answer: 'Yes! During checkout, you can select the gift wrapping option for eligible items. Additional charges may apply depending on the product.'
        },

        // Payment Questions
        {
            category: 'payment',
            question: 'What payment methods do you accept?',
            answer: 'We accept major credit cards (Visa, Mastercard, American Express, Discover), debit cards, PayPal, and other secure payment methods. All payments are processed through encrypted, secure payment gateways.'
        },
        {
            category: 'payment',
            question: 'Is it safe to use my credit card on Merikemart?',
            answer: 'Absolutely! We use industry-standard SSL encryption and secure payment processors to protect your financial information. We never store your complete credit card details on our servers.'
        },
        {
            category: 'payment',
            question: 'When will I be charged?',
            answer: 'Your payment method will be charged when your order is confirmed and processed, typically within a few hours of placing your order.'
        },
        {
            category: 'payment',
            question: 'Can I use multiple payment methods for one order?',
            answer: 'Currently, we accept one payment method per order. If you need to split payment, please contact our customer support team for assistance.'
        },
        {
            category: 'payment',
            question: 'Do you charge sales tax?',
            answer: 'Yes, applicable sales tax will be calculated at checkout based on your shipping address and local tax laws.'
        },

        // Shipping Questions
        {
            category: 'shipping',
            question: 'How long does shipping take?',
            answer: 'Standard shipping typically takes 5-7 business days. Expedited shipping options (2-3 day and overnight) are available at checkout. Delivery times may vary based on your location and product availability.'
        },
        {
            category: 'shipping',
            question: 'How much does shipping cost?',
            answer: 'Shipping costs are calculated at checkout based on your location, the weight and dimensions of your order, and your selected shipping method. We occasionally offer free shipping promotions—check our homepage for current offers!'
        },
        {
            category: 'shipping',
            question: 'Do you ship internationally?',
            answer: 'Yes! We ship to many countries worldwide. International shipping costs and delivery times vary by destination. You are responsible for any customs duties, taxes, or fees imposed by your country.'
        },
        {
            category: 'shipping',
            question: 'Can I change my shipping address after placing an order?',
            answer: 'If your order hasn\'t shipped yet, contact customer support immediately, and we\'ll try to update your shipping address. Once shipped, address changes are not possible.'
        },
        {
            category: 'shipping',
            question: 'What if my package is lost or stolen?',
            answer: 'If your tracking shows the package was delivered but you didn\'t receive it, first check with neighbors and your building management. Then contact us within 48 hours, and we\'ll investigate and work with the carrier to resolve the issue.'
        },

        // Returns Questions
        {
            category: 'returns',
            question: 'What is your return policy?',
            answer: 'Most items can be returned within 30 days of delivery for a refund or exchange. Items must be unused, in original condition with tags and packaging intact. Some items like perishables, personalized products, and intimate items are non-returnable.'
        },
        {
            category: 'returns',
            question: 'How do I return an item?',
            answer: 'Log in to your account, go to "Orders," select the order containing the item you want to return, and click "Return Item." Follow the instructions to print a return label. Pack the item securely and ship it back to us.'
        },
        {
            category: 'returns',
            question: 'Who pays for return shipping?',
            answer: 'For standard returns, you are responsible for return shipping costs. However, if the item is defective, damaged, or we made an error, we\'ll provide a prepaid return label at no cost to you.'
        },
        {
            category: 'returns',
            question: 'How long does it take to receive my refund?',
            answer: 'Once we receive and inspect your returned item, refunds are processed within 7-10 business days to your original payment method. Depending on your bank or credit card company, it may take an additional 3-5 business days to appear in your account.'
        },
        {
            category: 'returns',
            question: 'What if I received a damaged or defective item?',
            answer: 'We sincerely apologize! Contact us within 48 hours of delivery with photos of the damage. We\'ll arrange for a replacement or full refund, including return shipping costs.'
        },
        {
            category: 'returns',
            question: 'Can I exchange an item instead of returning it?',
            answer: 'Yes! When initiating a return, select "Exchange" and choose your preferred replacement item (size, color, or different product). We\'ll process the exchange once we receive your original item.'
        },
    ];

    const filteredFAQs = faqs.filter(faq => {
        const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
                        <HelpOutline fontSize="large" color="primary" />
                        <Typography variant='h3' sx={{ fontWeight: 700 }}>
                            Frequently Asked Questions
                        </Typography>
                    </Box>
                    <Typography variant='body1' color="text.secondary" sx={{ mb: 3, maxWidth: 700, mx: 'auto' }}>
                        Find answers to common questions about Merikemart. Can't find what you're looking for? Contact our support team!
                    </Typography>
                    <Divider sx={{ maxWidth: 100, mx: 'auto', height: 3, bgcolor: 'primary.main', borderRadius: 2 }} />
                </Box>

                {/* Search Bar */}
                <Box sx={{ mb: 5 }}>
                    <TextField
                        fullWidth
                        placeholder="Search for answers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search color="primary" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            maxWidth: 600,
                            mx: 'auto',
                            display: 'block',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                            }
                        }}
                    />
                </Box>

                {/* Category Cards */}
                <Box sx={{ mb: 5 }}>
                    <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 600, mb: 3 }}>
                        Browse by Category
                    </Typography>
                    <Grid container spacing={2} sx={{mb: 4 }}>
                        <Grid size={{ xs:6, sm:4, md:2}}>
                            <StyledCard 
                                elevation={selectedCategory === 'all' ? 6 : 2}
                                onClick={() => setSelectedCategory('all')}
                                sx={{ 
                                    bgcolor: selectedCategory === 'all' ? 'primary.light' : 'background.paper',
                                }}
                            >
                                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                                    <CategoryIcon>
                                        <HelpOutline fontSize="large" />
                                    </CategoryIcon>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        All
                                    </Typography>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                        {categories.map((category) => (
                            <Grid size={{ xs:6, sm:4, md:2}} key={category.id}>
                                <StyledCard 
                                    elevation={selectedCategory === category.id ? 6 : 2}
                                    onClick={() => setSelectedCategory(category.id)}
                                    sx={{ 
                                        bgcolor: selectedCategory === category.id ? 'primary.light' : 'background.paper',
                                    }}
                                >
                                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                                        <CategoryIcon sx={{ bgcolor: category.color + '20', color: category.color }}>
                                            {category.icon}
                                        </CategoryIcon>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                            {category.name}
                                        </Typography>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Results Count */}
                {searchQuery && (
                    <Box sx={{ mb: 2 }}>
                        <Chip 
                            label={`${filteredFAQs.length} result${filteredFAQs.length !== 1 ? 's' : ''} found`}
                            color="primary"
                            variant="outlined"
                        />
                    </Box>
                )}

                {/* FAQ Accordions */}
                <Box sx={{ mb: 4 }}>
                    {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((faq, index) => (
                            <Accordion 
                                key={index}
                                expanded={expanded === `panel${index}`} 
                                onChange={handleChange(`panel${index}`)}
                                sx={{ mb: 1 }}
                            >
                                <AccordionSummary 
                                    expandIcon={<ExpandMore />}
                                    sx={{
                                        '&:hover': {
                                            bgcolor: 'action.hover',
                                        }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 600, flex: 1 }}>
                                            {faq.question}
                                        </Typography>
                                        <Chip 
                                            label={categories.find(c => c.id === faq.category)?.name || faq.category}
                                            size="small"
                                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                                        />
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails sx={{ pt: 2 }}>
                                    <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                                        {faq.answer}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 6 }}>
                            <Search sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary">
                                No results found for "{searchQuery}"
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Try different keywords or browse by category
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* Contact Support Section */}
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
                    <ContactSupport sx={{ fontSize: 48, mb: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                        Still Have Questions?
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
                        Our customer support team is here to help! Contact us via email, phone, or live chat.
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>Email</Typography>
                            <Typography variant="body2">merikemart@gmail.com</Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' }, bgcolor: 'rgba(255,255,255,0.3)' }} />
                        <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>Phone</Typography>
                            <Typography variant="body2">1-912-541-0818</Typography>
                        </Box>
                        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' }, bgcolor: 'rgba(255,255,255,0.3)' }} />
                        <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>Hours</Typography>
                            <Typography variant="body2">Mon-Fri: 9AM-5PM CST</Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}