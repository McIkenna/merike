import React from 'react'
import Circle from './Circle';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { green, red, grey } from '@mui/material/colors';

  
export default function ShoppingCart(props) {
  const {totalQuantity, cartstyle} = props;
    
  return (
    <div style={{ position: "relative", ...props.style, margin: '20px 40px  20px 40px'}}>
    <ShoppingCartIcon
      style={{
        color: grey[800],
        fontSize: '36px'
      }}
    />
     <Circle cartstyle={cartstyle} totalQuantity={totalQuantity}/>
   
  </div>
  )
}
