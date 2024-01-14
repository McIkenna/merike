import React from 'react'
import Circle from './Circle';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

  
export default function ShoppingCart(props) {
    
  return (
    <div style={{ position: "relative", ...props.style, margin: '20px 40px  20px 40px'}}>
    <ShoppingCartIcon
      style={{
        color: '#FB3D3D',
        fontSize: '36px'
      }}
    />
     <Circle cartstyle={props.cartstyle} />
   
  </div>
  )
}
