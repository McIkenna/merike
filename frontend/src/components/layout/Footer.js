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
  Input,
  backdropClasses
} from "@mui/material";
import { Facebook, X, Instagram, LinkedIn, Mail, Phone, LocationOn, Margin } from '@mui/icons-material';
import { colors } from "../../utils/Themes";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


  const SearchButton = styled(IconButton)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.dark,
        padding: 'none',
        Margin: 'none'
      },
  }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
export default function Footer() {
  const footerSections = [
    // {
    //   title: "Products",
    //   links: [
    //     { name: "Features", href: "#" },
    //     { name: "Pricing", href: "#" },
    //     { name: "Reviews", href: "#" },
    //     { name: "Updates", href: "#" }
    //   ]
    // },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
        { name: "Blog", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Terms of Service", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
    { icon: <X size={20} />, href: "#", label: "X" },
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
    { icon: <LinkedIn size={20} />, href: "#", label: "LinkedIn" }
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.dark',
        color: "background.paper",
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
              color='primary.light'
              gutterBottom
            >
              Merikemart
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, maxWidth: 300 }}>
              Shop anytime, anywhere, and experience online shopping made simple, reliable, and rewarding with Merikemart today.
            </Typography>
            
            {/* Contact Info */}
            <Stack spacing={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Mail size={16} />
                <Typography variant="body2">merikellc@gmail.com</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Phone size={16} />
                <Typography variant="body2">+1 (912) 541-0818</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <LocationOn size={16} />
                <Typography variant="body2">Chicago, IL</Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <Grid item xs={6} sm={4} md={2} key={section.title}>
              <Typography
                variant="subtitle1"
                fontWeight="600"
                color='primary.light'
                gutterBottom
              >
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    color="inherit"
                    underline="hover"
                    sx={{
                      display: "block",
                      transition: "color 0.2s",
                      "&:hover": { color: "primary.main" }
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Newsletter Section */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="subtitle1"
              fontWeight="600"
               color='primary.light'
              gutterBottom
            >
              Stay Updated
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe to our newsletter for the latest updates.
            </Typography>
            <Box
              component="form"
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: { xs: "column", sm: "row" }
              }}
            >
              <StyledInputBase
                type="email"
                placeholder="Enter your email"
                sx={{ ml: 1, flex: 1,   
                  color: 'text.primary', border: '1px solid', 
                  borderColor: 'background.main', borderRadius: '4px' }}
              />
              <SearchButton
                type="submit"
                sx={{
                  backgroundColor: 'primary.dark',
                  color: 'primary.light',
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "1rem",
                   border: '1px solid',
                  borderColor: 'background.main'

                }}
              >
                Subscribe
              </SearchButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "grey.800" }} />

        {/* Bottom Section */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Typography variant="body2" color='secondary.light'>
            © {new Date().getFullYear()} Merike. All rights reserved.
          </Typography>

          {/* Social Links */}
          <Box display="flex" gap={1}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                href={social.href}
                aria-label={social.label}
                sx={{
                  color:'secondary.light',
                  "&:hover": {
                    color: "primary.main",
                    bgcolor: 'background.dark'
                  }
                }}
                size="small"
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>

          {/* Legal Links */}
          <Box display="flex" gap={2}>
            <Link
              href="#"
              color='secondary.light'
              underline="hover"
              variant="body2"
              sx={{ "&:hover": { color: "primary.main" } }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color='secondary.light'
              underline="hover"
              variant="body2"
              sx={{ "&:hover": { color: "primary.main" } }}
            >
              Terms
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}