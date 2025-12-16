import React, { useState } from 'react';
import { 
    Container, 
    Box, 
    Typography, 
    Paper, 
    Accordion, 
    AccordionSummary, 
    AccordionDetails,
    Divider,
    List,
    ListItem,
    ListItemText,
    Chip,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { 
    ExpandMore, 
    Security, 
    VerifiedUser,
    Lock,
    Visibility,
    Share,
    Cookie,
    Delete,
    Email
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { AgGridReact } from 'ag-grid-react';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
}));


const IconWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    marginBottom: 1,
}));

export const PrivacyPolicy = () => {
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const lastUpdated = "January 1, 2025";
    const effectiveDate = "January 1, 2025";

    const dataCollectionTable = [
        { 
            category: 'Account Information', 
            examples: 'Name, email, password, phone number, date of birth',
            purpose: 'Account creation, authentication, communication'
        },
        { 
            category: 'Payment Information', 
            examples: 'Credit card details, billing address, transaction history',
            purpose: 'Process payments, prevent fraud, maintain records'
        },
        { 
            category: 'Shipping Information', 
            examples: 'Delivery address, shipping preferences, contact details',
            purpose: 'Order fulfillment, delivery tracking'
        },
        { 
            category: 'Device & Usage Data', 
            examples: 'IP address, browser type, device info, browsing behavior',
            purpose: 'Improve user experience, security, analytics'
        },
        { 
            category: 'Communication Data', 
            examples: 'Email correspondence, chat messages, customer service interactions',
            purpose: 'Customer support, service improvement'
        },
    ];

    const header = [
        {

                headerName: 'Category',
                field: 'category',
                flex: 0.5
            },
            {

                headerName: 'Examples',
                field: 'examples',
                flex: 1
            },
            {

                headerName: 'Purpose',
                field: 'purpose',
                flex: 1
            }

    ]

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <IconWrapper sx={{ justifyContent: 'center' }}>
                        <Security fontSize="large" color='primary.main' />
                        <Typography variant='h3' sx={{ fontWeight: 700 }}>
                            Privacy Policy
                        </Typography>
                    </IconWrapper>
                    <Typography variant='body1' color="text.secondary" sx={{ mb: 2 }}>
                        Merikemart - A Subsidiary of Merike LLC
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Chip 
                            label={`Last Updated: ${lastUpdated}`} 
                            
                            variant="outlined" 
                            sx={{
                                color:"primary.main" 
                            }}
                        />
                        <Chip 
                            label={`Effective Date: ${effectiveDate}`} 
                            sx={{
                                color:"primary.main" 
                            }}
                            variant="outlined" 
                        />
                    </Box>
                    <Divider sx={{ maxWidth: 100, mx: 'auto', height: 3, bgcolor: 'primary.main', borderRadius: 2, mt: 2 }} />
                </Box>

                {/* Introduction */}
                <StyledPaper elevation={2}>
                    <Alert severity="info" sx={{ mb: 3 }}>
                        Your privacy is important to us. This Privacy Policy explains how Merikemart collects, uses, discloses, and safeguards your information when you visit our website or use our services.
                    </Alert>
                    <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
                        Merikemart, a subsidiary of Merike LLC, is committed to protecting your personal information and your right to privacy. This Privacy Policy describes our practices regarding the collection, use, and disclosure of your information through our online shopping platform, website, mobile application, and related services (collectively, the "Platform").
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.8, fontWeight: 500 }}>
                        By using our Platform, you consent to the data practices described in this Privacy Policy. If you do not agree with this policy, please discontinue use of our Platform immediately.
                    </Typography>
                </StyledPaper>

                {/* Accordion Sections */}
                <Box sx={{ mb: 4 }}>
                    {/* Section 1 - Information We Collect */}
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <IconWrapper>
                                <Visibility color="primary.main" />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    1. Information We Collect
                                </Typography>
                            </IconWrapper>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                                We collect several types of information to provide and improve our services:
                            </Typography>
                            
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
                                A. Information You Provide Directly
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText 
                                        primary="Account Registration"
                                        secondary="When you create an account, we collect your name, email address, phone number, password, and optionally your date of birth."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Purchase Information"
                                        secondary="When you make a purchase, we collect billing and shipping addresses, payment method details, and transaction information."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Communication Data"
                                        secondary="Information you provide when contacting customer support, leaving reviews, or communicating with us through any channel."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="User-Generated Content"
                                        secondary="Product reviews, ratings, photos, comments, and other content you submit to our Platform."
                                    />
                                </ListItem>
                            </List>

                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
                                B. Information Collected Automatically
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText 
                                        primary="Device Information"
                                        secondary="IP address, browser type, operating system, device identifiers, and mobile network information."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Usage Data"
                                        secondary="Pages visited, time spent on pages, links clicked, search queries, referring/exit pages, and browsing behavior."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Location Data"
                                        secondary="Approximate location based on IP address, and precise location if you grant permission through your device settings."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Cookies and Tracking Technologies"
                                        secondary="We use cookies, web beacons, pixels, and similar technologies to track activity and store certain information."
                                    />
                                </ListItem>
                            </List>

                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3, mb: 2 }}>
                                C. Data Collection Summary
                            </Typography>
                            <TableContainer component={Paper} >
                                {/* <Table size="small">
                                    <TableHead>
                                        <TableRow >
                                            <TableCell sx={{ fontWeight: 600, color: 'text.primary'}}>Category</TableCell>
                                            <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Examples</TableCell>
                                            <TableCell sx={{ fontWeight: 600 , color: 'text.primary'}}>Purpose</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataCollectionTable.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{color: 'text.primary'}}>{row.category}</TableCell>
                                                <TableCell sx={{color: 'text.primary'}}>{row.examples}</TableCell>
                                                <TableCell sx={{color: 'text.primary'}}>{row.purpose}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table> */}

                                <Box>
                                                    <div className="ag-theme-quartz" style={{ height: '30vh', width: '100%'}}>
                                                        <AgGridReact
                                                            rowData={dataCollectionTable}
                                                            columnDefs={header}
                                                            rowHeight={50}
                                                        />
                                                    </div>
                                
                                                </Box>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 2 - How We Use Your Information */}
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <IconWrapper>
                                <VerifiedUser color="primary.main" />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    2. How We Use Your Information
                                </Typography>
                            </IconWrapper>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                                We use the information we collect for various purposes:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText 
                                        primary="Order Processing & Fulfillment"
                                        secondary="To process your orders, arrange shipping, send order confirmations, and provide customer support."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Account Management"
                                        secondary="To create and maintain your account, authenticate your identity, and manage your preferences."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Communication"
                                        secondary="To send transactional emails, order updates, promotional materials, newsletters, and respond to your inquiries."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Personalization"
                                        secondary="To customize your shopping experience, recommend products, and display relevant content and advertisements."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Analytics & Improvement"
                                        secondary="To analyze usage patterns, improve our Platform, develop new features, and enhance user experience."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Fraud Prevention & Security"
                                        secondary="To detect, prevent, and investigate fraudulent activities, security incidents, and violations of our Terms of Service."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Legal Compliance"
                                        secondary="To comply with legal obligations, enforce our policies, and protect our rights and those of others."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Marketing & Advertising"
                                        secondary="To send promotional offers, conduct marketing campaigns, and display targeted advertisements (with your consent where required)."
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 3 - How We Share Your Information */}
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <IconWrapper>
                                <Share color="primary.main" />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    3. How We Share Your Information
                                </Typography>
                            </IconWrapper>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                                We may share your information in the following circumstances:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText 
                                        primary="Service Providers"
                                        secondary="We share information with third-party vendors who perform services on our behalf, including payment processors, shipping companies, email service providers, and analytics platforms. These providers are contractually obligated to protect your information."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Merike LLC"
                                        secondary="As a subsidiary of Merike LLC, we may share information with our parent company for business operations, analytics, and consolidated reporting."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Business Transfers"
                                        secondary="If Merikemart is involved in a merger, acquisition, asset sale, or bankruptcy, your information may be transferred as part of that transaction."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Legal Requirements"
                                        secondary="We may disclose your information to comply with legal obligations, court orders, government requests, or to protect our rights, property, or safety."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="With Your Consent"
                                        secondary="We may share your information for any other purpose with your explicit consent."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Aggregated Data"
                                        secondary="We may share aggregated or de-identified information that cannot reasonably be used to identify you."
                                    />
                                </ListItem>
                            </List>
                            <Alert severity="warning" sx={{ mt: 2 }}>
                                We do not sell your personal information to third parties for their marketing purposes.
                            </Alert>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 4 - Cookies and Tracking */}
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <IconWrapper>
                                <Cookie color="primary.main" />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    4. Cookies and Tracking Technologies
                                </Typography>
                            </IconWrapper>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                                We use cookies and similar tracking technologies to enhance your experience on our Platform:
                            </Typography>
                            
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
                                Types of Cookies We Use:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText 
                                        primary="Essential Cookies"
                                        secondary="Required for the Platform to function properly, including authentication, security, and shopping cart functionality."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Performance Cookies"
                                        secondary="Help us understand how visitors interact with our Platform by collecting anonymous usage statistics."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Functionality Cookies"
                                        secondary="Remember your preferences, settings, and personalization choices to enhance your experience."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Advertising Cookies"
                                        secondary="Used to deliver relevant advertisements and track campaign effectiveness."
                                    />
                                </ListItem>
                            </List>

                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
                                Managing Cookies:
                            </Typography>
                            <Typography variant="body2" sx={{ lineHeight: 1.8, mb: 1 }}>
                                You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our Platform. Most browsers allow you to:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="• View and delete cookies" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Block all or third-party cookies" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Clear cookies when closing your browser" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Opt out of interest-based advertising" />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 5 - Data Security */}
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <IconWrapper>
                                <Lock color="primary.main" />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    5. Data Security
                                </Typography>
                            </IconWrapper>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                                We implement appropriate technical and organizational security measures to protect your personal information:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText 
                                        primary="Encryption"
                                        secondary="We use SSL/TLS encryption to protect data transmitted between your device and our servers. Payment information is encrypted using industry-standard protocols."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Access Controls"
                                        secondary="We restrict access to personal information to authorized employees and service providers who need it to perform their duties."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Security Monitoring"
                                        secondary="We regularly monitor our systems for potential vulnerabilities and conduct security audits."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Data Minimization"
                                        secondary="We only collect and retain information necessary for the purposes stated in this Privacy Policy."
                                    />
                                </ListItem>
                            </List>
                            <Alert severity="warning" sx={{ mt: 2 }}>
                                While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. You are responsible for maintaining the confidentiality of your account credentials.
                            </Alert>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 6 - Your Privacy Rights */}
                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                6. Your Privacy Rights
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                                Depending on your location, you may have the following rights regarding your personal information:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText 
                                        primary="Access"
                                        secondary="You have the right to request access to the personal information we hold about you."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Correction"
                                        secondary="You can request that we correct inaccurate or incomplete information."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Deletion"
                                        secondary="You can request deletion of your personal information, subject to certain legal exceptions."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Opt-Out"
                                        secondary="You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails or updating your account preferences."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Data Portability"
                                        secondary="You may request a copy of your data in a structured, machine-readable format."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Restrict Processing"
                                        secondary="You can request that we limit how we use your information in certain circumstances."
                                    />
                                </ListItem>
                            </List>
                            <Typography variant="body2" sx={{ mt: 2, lineHeight: 1.8 }}>
                                To exercise these rights, please contact us at privacy@merikemart.com. We will respond to your request within 30 days.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 7 - Data Retention */}
                    <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <IconWrapper>
                                <Delete color="primary.main" />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    7. Data Retention
                                </Typography>
                            </IconWrapper>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText 
                                        primary="Active Accounts"
                                        secondary="Information associated with active accounts is retained for the duration of your account."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Transaction Records"
                                        secondary="Purchase and transaction data is retained for accounting, tax, and legal compliance purposes (typically 7 years)."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Closed Accounts"
                                        secondary="After account closure, we may retain certain information for fraud prevention, legal compliance, and dispute resolution."
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText 
                                        primary="Marketing Data"
                                        secondary="We retain marketing data until you opt out or for a reasonable period based on our legitimate interests."
                                    />
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 8 - Children's Privacy */}
                    <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                8. Children's Privacy
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                                Our Platform is not intended for children under 13 years of age (or 16 in some jurisdictions). We do not knowingly collect personal information from children under these age limits.
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                If we discover that we have collected information from a child under the applicable age limit without parental consent, we will delete that information immediately. If you believe we have collected information from a child, please contact us at merikemart@gmail.com.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 9 - Third-Party Links */}
                    <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                9. Third-Party Links and Services
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                                Our Platform may contain links to third-party websites, applications, or services that are not operated by us. This Privacy Policy does not apply to third-party platforms.
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                We are not responsible for the privacy practices of third parties. We encourage you to review the privacy policies of any third-party sites you visit or services you use.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 10 - International Data Transfers */}
                    <Accordion expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                10. International Data Transfers
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your jurisdiction.
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                When we transfer your information internationally, we implement appropriate safeguards, such as standard contractual clauses, to ensure your information receives adequate protection.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    {/* Section 11 - Changes to Privacy Policy */}
                    <Accordion expanded={expanded === 'panel11'} onChange={handleChange('panel11')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                11. Changes to This Privacy Policy
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors.
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                                We will notify you of material changes by:
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="• Posting the updated Privacy Policy on our Platform with a new 'Last Updated' date" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Sending an email notification to your registered email address" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="• Displaying a prominent notice on our Platform" />
                                </ListItem>
                            </List>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                Your continued use of our Platform after changes become effective constitutes your acceptance of the updated Privacy Policy.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
        </Container>
        </Box>
    )
}