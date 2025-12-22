import { Link } from 'react-router-dom'

const StyledLink = ({ to, children, ...props }) => {
  return (
    <Link
    //   component={RouterLink}
      to={to}
      underline="hover"
      variant="body2"
      style={{
        color: 'text.primary',
        '&:hover': {
          color: 'primary.main',
          textDecoration: 'none',
        },
      }}
      {...props}
    >
      {children}
    </Link>
  )
}

export default StyledLink