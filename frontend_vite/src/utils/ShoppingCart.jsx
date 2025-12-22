import React from 'react'
import Circle from './Circle';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


export default function ShoppingCart({ 
  totalQuantity = 0, 
  cartstyle, 
  iconColor = '#1f2937',
  iconSize = 28,
  style,
  onClick,
  showBadge = true
}) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        background: 'none',
        border: 'none',
        padding: '12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f3f4f6';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.transform = 'scale(1)';
      }}
      aria-label={`Shopping cart with ${totalQuantity} items`}
    >
      <ShoppingCartIcon
        size={iconSize}
        color={iconColor}
        strokeWidth={2}
      />
      {showBadge && <Circle cartstyle={cartstyle} totalQuantity={totalQuantity} />}
    </button>
  );
}
