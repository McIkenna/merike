import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack
} from "@mui/material";
import { Facebook, X, Instagram, LinkedIn, Mail, Phone, LocationOn } from '@mui/icons-material';
export default function Footer() {
  const footerSections = [
    {
      title: "Products",
      links: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Reviews", href: "#" },
        { name: "Updates", href: "#" }
      ]
    },
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
        bgcolor: "grey.900",
        color: "grey.300",
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
              color="white"
              gutterBottom
            >
              Your Brand
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, maxWidth: 300 }}>
              Building exceptional digital experiences that inspire and connect
              people around the world.
            </Typography>
            
            {/* Contact Info */}
            <Stack spacing={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Mail size={16} />
                <Typography variant="body2">contact@yourwebsite.com</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Phone size={16} />
                <Typography variant="body2">+1 (555) 123-4567</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <LocationOn size={16} />
                <Typography variant="body2">San Francisco, CA</Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <Grid item xs={6} sm={4} md={2} key={section.title}>
              <Typography
                variant="subtitle1"
                fontWeight="600"
                color="white"
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
              color="white"
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
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  border: "1px solid #555",
                  borderRadius: "4px",
                  backgroundColor: "#1a1a1a",
                  color: "#fff",
                  outline: "none"
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "600",
                  whiteSpace: "nowrap"
                }}
              >
                Subscribe
              </button>
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
          <Typography variant="body2" color="grey.500">
            © {new Date().getFullYear()} Your Brand. All rights reserved.
          </Typography>

          {/* Social Links */}
          <Box display="flex" gap={1}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                href={social.href}
                aria-label={social.label}
                sx={{
                  color: "grey.400",
                  "&:hover": {
                    color: "primary.main",
                    bgcolor: "grey.800"
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
              color="grey.500"
              underline="hover"
              variant="body2"
              sx={{ "&:hover": { color: "primary.main" } }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="grey.500"
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