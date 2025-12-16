import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
  Button
} from "@mui/material";
import { Facebook, X, Instagram, LinkedIn, Mail, Phone, LocationOn } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import tiktokLogo from '../../static/images/tiktok.png'

const SearchButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1.5),
    transition: theme.transitions.create('width'),
    width: '100%',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    '&:focus': {
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.background.paper,
    },
  },
}));

export default function Footer() {
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/aboutUs" },
        { name: "Privacy Policy", href: "/privacyPolicy" },
        { name: "Blog", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/contactus" },
        { name: "Contact Us", href: "/contactus" },
        { name: "FAQs", href: "/faqs" },
        { name: "Terms of Service", href: "/terms" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Facebook fontSize="small" />, href: "https://www.facebook.com/profile.php?id=61584930010482", label: "Facebook" },
    { icon: <X fontSize="small" />, href: "https://x.com/merikemart", label: "X" },
    { icon: <Instagram fontSize="small" />, href: "https://www.instagram.com/merikemart/", label: "Instagram" },
    { icon: <img src={tiktokLogo} style={{ width: '20px' }}/>, href: "https://www.tiktok.com/@merikemart?_r=1&_t=ZP-92FmeMxeDHT", label: "TikTok"}
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: (theme) => theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200],
        color: (theme) => theme.palette.text.primary,
        py: 6,
        mt: "auto"
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color='primary.main'
              gutterBottom
            >
              Merikemart
            </Typography>
            <Typography 
              variant="body2" 
              color="text.primary"
              sx={{ mb: 2, maxWidth: 300, lineHeight: 1.6 }}
            >
              Shop anytime, anywhere, and experience online shopping made simple, reliable, and rewarding with Merikemart today.
            </Typography>
            
            {/* Contact Info */}
            <Stack spacing={1.5}>
              <Box display="flex" alignItems="center" gap={1}>
                <Mail fontSize="small" color="primary" />
                <Typography variant="body2" color="text.primary">
                  merikemart@gmail.com
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Phone fontSize="small" color="primary" />
                <Typography variant="body2" color="text.primary">
                  +1 (912) 541-0818
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <LocationOn fontSize="small" color="primary" />
                <Typography variant="body2" color="text.primary">
                  Chicago, IL
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <Grid item xs={6} sm={4} md={2} key={section.title}>
              <Typography
                variant="subtitle1"
                fontWeight="600"
                color='primary.main'
                gutterBottom
                sx={{ mb: 2 }}
              >
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    color="text.primary"
                    underline="hover"
                    sx={{
                      display: "block",
                      transition: "color 0.2s",
                      fontSize: "0.875rem",
                      "&:hover": { 
                        color: "primary.main",
                        textDecoration: "none"
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Newsletter Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              fontWeight="600"
              color='primary.main'
              gutterBottom
              sx={{ mb: 2 }}
            >
              Stay Updated
            </Typography>
            <Typography 
              variant="body2" 
              color="text.primary"
              sx={{ mb: 2, lineHeight: 1.6 }}
            >
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => e.preventDefault()}
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: { xs: "column", sm: "row" }
              }}
            >
              <StyledInputBase
                type="email"
                placeholder="Enter your email"
                required
                sx={{ flex: 1 }}
              />
              <SearchButton
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  px: 3,
                  py: 1,
                  whiteSpace: 'nowrap',
                  minWidth: { xs: '100%', sm: 'auto' }
                }}
              >
                Subscribe
              </SearchButton>
            </Box>
          </Grid>
        </Grid>

        <Divider 
          sx={{ 
            my: 4, 
            borderColor: (theme) => theme.palette.mode === 'dark' 
              ? theme.palette.grey[800] 
              : theme.palette.grey[300]
          }} 
        />

        {/* Bottom Section */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Typography variant="body2" color='text.primary'>
            © {new Date().getFullYear()} Merikemart - A Subsidiary of Merike LLC. All rights reserved.
          </Typography>

          {/* Social Links */}
          <Box display="flex" gap={1}>
            {socialLinks.map((social) => (
              <IconButton
                target="_"
                key={social.label}
                href={social.href}
                aria-label={social.label}
                sx={{
                  color: 'text.primary',
                  border: 1,
                  borderColor: (theme) => theme.palette.mode === 'dark' 
                    ? theme.palette.grey[700] 
                    : theme.palette.grey[300],
                  "&:hover": {
                    color: "primary.main",
                    borderColor: "primary.main",
                    bgcolor: (theme) => theme.palette.mode === 'dark' 
                      ? theme.palette.grey[800] 
                      : theme.palette.grey[100]
                  }
                }}
                size="small"
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>

          {/* Legal Links */}
          <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
            <Link
              href="/privacy"
              color='text.primary'
              underline="hover"
              variant="body2"
              sx={{ 
                "&:hover": { 
                  color: "primary.main",
                  textDecoration: "none"
                } 
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              color='text.primary'
              underline="hover"
              variant="body2"
              sx={{ 
                "&:hover": { 
                  color: "primary.main",
                  textDecoration: "none"
                } 
              }}
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              color='text.primary'
              underline="hover"
              variant="body2"
              sx={{ 
                "&:hover": { 
                  color: "primary.main",
                  textDecoration: "none"
                } 
              }}
            >
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}