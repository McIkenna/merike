import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
    Chip
} from '@mui/material';
import { Divider } from '../../utils/Divider';
import { ExpandMore, Gavel, ShoppingCart, Security, LocalShipping, Payment } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1),
}));

export const TermsOfService = () => {
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const lastUpdated = "January 1, 2025";

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <IconWrapper sx={{ justifyContent: 'center' }}>
                        <Gavel fontSize="large" color="primary" />
                        <Typography variant='h3' sx={{ fontWeight: 700 }}>
                            Terms of Service
                        </Typography>
                    </IconWrapper>
                    <Typography variant='body1' color="text.secondary" sx={{ mb: 2 }}>
                        Merikemart - A Subsidiary of Merike LLC
                    </Typography>
                    <Chip
                        label={`Last Updated: ${lastUpdated}`}
                        color="primary"
                        variant="outlined"
                    />
                    <Box sx={{  mx: 'auto', height: 3, bgcolor: 'primary.main', borderRadius: 2, mt: 2 }}>
                        <Divider />
                    </Box>

                </Box>

                {/* Introduction */}
                <StyledPaper elevation={2}>
                    <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                        Welcome to Merikemart! These Terms of Service ("Terms") govern your access to and use of the Merikemart website, mobile application, and related services (collectively, the "Platform"). By accessing or using our Platform, you agree to be bound by these Terms.
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.8, fontWeight: 500 }}>
                        Please read these Terms carefully before using our services. If you do not agree with any part of these Terms, you may not use our Platform.
                    </Typography>
                </StyledPaper>

                {/* Accordion Sections */}
                <Box sx={{ mb: 4 }}>
                    {/* Section 1 */}
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <IconWrapper>
                                <ShoppingCart color="primary" />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    1. Account Registration and Use
                                </Typography>
                            </IconWrapper>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Eligibility"
                                        secondary="You must be at least 18 years old or have parental/guardian consent to create an account and use our services."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Account Security"
                                        secondary="You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Accurate Information"
                                        secondary="You agree to provide accurate, current, and complete information during registration and to update such information as necessary."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Account Termination"
                                        secondary="We reserve the right to suspend or terminate your account if you violate these Terms or engage in fraudulent or illegal activities."
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 2 */}
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <IconWrapper>
                                <Payment color="primary" />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    2. Orders and Payments
                                </Typography>
                            </IconWrapper>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Product Availability"
                                        secondary="All products are subject to availability. We reserve the right to limit quantities or discontinue products at any time without prior notice."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Pricing"
                                        secondary="Prices are listed in USD and are subject to change without notice. We strive to provide accurate pricing, but errors may occur. If a pricing error is discovered, we will notify you and give you the option to proceed at the correct price or cancel your order."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Payment Methods"
                                        secondary="We accept various payment methods including credit/debit cards and other secure payment options. Payment must be received before order processing."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Order Confirmation"
                                        secondary="Receipt of an order confirmation does not constitute acceptance of your order. We reserve the right to refuse or cancel any order for any reason, including product unavailability, pricing errors, or suspected fraud."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Taxes and Fees"
                                        secondary="You are responsible for any applicable taxes, duties, or fees associated with your purchase."
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 3 */}
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <IconWrapper>
                                <LocalShipping color="primary" />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    3. Shipping and Delivery
                                </Typography>
                            </IconWrapper>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Shipping Timeframes"
                                        secondary="We aim to process and ship orders promptly. Delivery times vary based on your location and the shipping method selected. Estimated delivery times are not guaranteed."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Shipping Costs"
                                        secondary="Shipping costs are calculated at checkout based on your location and the weight/dimensions of your order."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Delivery Address"
                                        secondary="You are responsible for providing accurate delivery information. We are not liable for delays or non-delivery due to incorrect addresses."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Risk of Loss"
                                        secondary="Risk of loss and title for items purchased pass to you upon delivery to the carrier."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="International Shipping"
                                        secondary="For international orders, you are responsible for compliance with local laws and any customs duties or import taxes."
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 4 */}
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <IconWrapper>
                                <Security color="primary" />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    4. Returns and Refunds
                                </Typography>
                            </IconWrapper>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Return Policy"
                                        secondary="Most items can be returned within 30 days of delivery for a refund or exchange. Items must be in original condition with tags and packaging intact."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Non-Returnable Items"
                                        secondary="Certain items, including perishables, personalized products, and intimate items, are non-returnable for health and safety reasons."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Return Process"
                                        secondary="To initiate a return, contact our customer support team. You may be responsible for return shipping costs unless the item is defective or we made an error."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Refund Processing"
                                        secondary="Refunds will be processed to the original payment method within 7-10 business days after we receive and inspect the returned item."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Damaged or Defective Items"
                                        secondary="If you receive a damaged or defective item, contact us within 48 hours of delivery. We will arrange for a replacement or full refund at no cost to you."
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 5 */}
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                5. Intellectual Property
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                                All content on the Merikemart Platform, including text, graphics, logos, images, videos, and software, is the property of Merikemart or Merike LLC and is protected by copyright, trademark, and other intellectual property laws.
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Limited License"
                                        secondary="We grant you a limited, non-exclusive, non-transferable license to access and use our Platform for personal, non-commercial purposes."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Restrictions"
                                        secondary="You may not copy, modify, distribute, sell, or exploit any content from our Platform without our express written permission."
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 6 */}
                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                6. User Conduct and Prohibited Activities
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                                You agree not to:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="• Violate any applicable laws or regulations" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Engage in fraudulent or deceptive practices" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Use our Platform to transmit harmful code, viruses, or malware" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Interfere with the proper functioning of our Platform" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Attempt to gain unauthorized access to our systems or user accounts" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Use automated systems (bots, scrapers) without permission" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Harass, abuse, or harm other users" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Resell products for commercial purposes without authorization" />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 7 */}
                    <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                7. Privacy and Data Protection
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                                Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                By using our Platform, you consent to our collection and use of your information as described in the Privacy Policy.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 8 */}
                    <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                8. Disclaimers and Limitation of Liability
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="As-Is Basis"
                                        secondary='Our Platform and products are provided "as is" without warranties of any kind, either express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.'
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="No Guarantee"
                                        secondary="We do not guarantee that our Platform will be uninterrupted, error-free, or secure, or that defects will be corrected."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Limitation of Liability"
                                        secondary="To the maximum extent permitted by law, Merikemart and Merike LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Platform or products."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Maximum Liability"
                                        secondary="Our total liability to you for any claims arising from your use of our Platform shall not exceed the amount you paid for the product or service in question, or $100, whichever is greater."
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 9 */}
                    <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                9. Indemnification
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                You agree to indemnify, defend, and hold harmless Merikemart, Merike LLC, and our respective officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="• Your use of our Platform" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Your violation of these Terms" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Your violation of any rights of third parties" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Your breach of any applicable laws or regulations" />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 10 */}
                    <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                10. Modifications to Terms
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                                We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on our Platform and updating the "Last Updated" date.
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                Your continued use of our Platform after such modifications constitutes your acceptance of the updated Terms. We encourage you to review these Terms periodically.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 11 */}
                    <Accordion expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                11. Dispute Resolution and Governing Law
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Governing Law"
                                        secondary="These Terms shall be governed by and construed in accordance with the laws of the United States and the state where Merike LLC is incorporated, without regard to conflict of law principles."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Dispute Resolution"
                                        secondary="Any disputes arising from these Terms or your use of our Platform shall first be attempted to be resolved through good faith negotiations. If negotiations fail, disputes may be resolved through binding arbitration or in the courts of appropriate jurisdiction."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Class Action Waiver"
                                        secondary="You agree that any disputes will be resolved on an individual basis and waive your right to participate in class action lawsuits."
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 12 */}
                    <Accordion expanded={expanded === 'panel12'} onChange={handleChange('panel12')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                12. Contact Information
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                                If you have questions or concerns about these Terms of Service, please contact us:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Merikemart Customer Support"
                                        secondary="A Subsidiary of Merike LLC"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Email"
                                        secondary="merikemart@gmail.com"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Phone"
                                        secondary="1-912-541-0818"
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                </Box>

                {/* Footer Notice */}
                <StyledPaper elevation={3} sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                    <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 500 }}>
                        By using Merikemart, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                    </Typography>
                </StyledPaper>
            </Container>
        </Box>
    );
}