const PromoCode = require('../models/promoCode');

class PromoCodeValidator {
  static async validatePromoCode(code, userId, cartItems, cartTotal) {
    // Find promo code
    const promoCode = await PromoCode.findOne({ 
      code: code.toUpperCase(),
      isActive: true 
    });

    if (!promoCode) {
      return {
        isValid: false,
        message: 'Invalid promo code'
      };
    }

    // Check date validity
    const now = new Date();
    if (now < promoCode.validFrom) {
      return {
        isValid: false,
        message: 'This promo code is not yet active'
      };
    }

    if (now > promoCode.validUntil) {
      return {
        isValid: false,
        message: 'This promo code has expired'
      };
    }

    // Check usage limit
    if (promoCode.usageLimit && promoCode.usedCount >= promoCode.usageLimit) {
      return {
        isValid: false,
        message: 'This promo code has reached its usage limit'
      };
    }

    // Check minimum purchase amount
    if (cartTotal < promoCode.minPurchaseAmount) {
      return {
        isValid: false,
        message: `Minimum purchase amount of $${promoCode.minPurchaseAmount} required`
      };
    }

    // Check user-specific codes
    if (promoCode.userSpecific.length > 0) {
      if (!promoCode.userSpecific.includes(userId)) {
        return {
          isValid: false,
          message: 'This promo code is not valid for your account'
        };
      }
    }

    // Check if user already used this code
    const alreadyUsed = promoCode.usedBy.some(
      usage => usage.user.toString() === userId.toString()
    );
    
    if (alreadyUsed && promoCode.usageLimit === 1) {
      return {
        isValid: false,
        message: 'You have already used this promo code'
      };
    }

    // Check product/category applicability
    if (promoCode.applicableProducts.length > 0 || promoCode.applicableCategories.length > 0) {
      const isApplicable = this.checkProductApplicability(cartItems, promoCode);
      if (!isApplicable) {
        return {
          isValid: false,
          message: 'This promo code is not applicable to items in your cart'
        };
      }
    }

    // Calculate discount
    const discount = this.calculateDiscount(promoCode, cartTotal);

    return {
      isValid: true,
      promoCode: promoCode,
      discount: discount,
      message: `Promo code applied! You saved $${discount.toFixed(2)}`
    };
  }

  static checkProductApplicability(cartItems, promoCode) {
    // If specific products are set
    if (promoCode.applicableProducts.length > 0) {
      const hasApplicableProduct = cartItems.some(item =>
        promoCode.applicableProducts.includes(item.productId)
      );
      if (hasApplicableProduct) return true;
    }

    // If categories are set
    if (promoCode.applicableCategories.length > 0) {
      const hasApplicableCategory = cartItems.some(item =>
        promoCode.applicableCategories.includes(item.category)
      );
      if (hasApplicableCategory) return true;
    }

    // If both arrays are empty, code applies to all products
    if (promoCode.applicableProducts.length === 0 && 
        promoCode.applicableCategories.length === 0) {
      return true;
    }

    return false;
  }

  static calculateDiscount(promoCode, cartTotal) {
    let discount = 0;

    if (promoCode.discountType === 'percentage') {
      discount = (cartTotal * promoCode.discountValue) / 100;
      
      // Apply max discount cap if set
      if (promoCode.maxDiscountAmount && discount > promoCode.maxDiscountAmount) {
        discount = promoCode.maxDiscountAmount;
      }
    } else if (promoCode.discountType === 'fixed') {
      discount = Math.min(promoCode.discountValue, cartTotal);
    }

    return discount;
  }
}

module.exports = PromoCodeValidator;

