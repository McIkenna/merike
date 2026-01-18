import { Box } from "@mui/material";

const Circle = ({ totalQuantity, cartstyle }) => {
  if (!totalQuantity || totalQuantity === 0) return null;
  
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        bgcolor: 'secondary.dark',
        color: 'text.primary',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: '600',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        ...cartstyle
      }}
    >
      {totalQuantity > 99 ? '99+' : totalQuantity}
    </Box>
  );
};
export default Circle;