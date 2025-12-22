const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY)
class StripeCouponManager {
  // Create a coupon in Stripe based on your promo code
  static async createStripeCoupon(promoCode) {
    try {
      let couponData = {};

      if (promoCode.discountType === 'percentage') {
        couponData = {
          percent_off: promoCode.discountValue,
          duration: 'once', // 'once', 'forever', or 'repeating'
          name: promoCode.code,
          metadata: {
            promoCodeId: promoCode._id.toString(),
            description: promoCode.description
          }
        };

        // Add max redemptions if usage limit exists
        if (promoCode.usageLimit) {
          couponData.max_redemptions = promoCode.usageLimit;
        }
      } else if (promoCode.discountType === 'fixed') {
        couponData = {
          amount_off: Math.round(promoCode.discountValue * 100), // Convert to cents
          currency: 'usd',
          duration: 'once',
          name: promoCode.code,
          metadata: {
            promoCodeId: promoCode._id.toString(),
            description: promoCode.description
          }
        };

        if (promoCode.usageLimit) {
          couponData.max_redemptions = promoCode.usageLimit;
        }
      }

      const coupon = await stripe.coupons.create(couponData);
      return coupon;
    } catch (error) {
      console.error('Error creating Stripe coupon:', error);
      throw error;
    }
  }

  // Get or create Stripe coupon for promo code
  static async getOrCreateCoupon(promoCode) {
    try {
      // Check if coupon already exists in Stripe
      if (promoCode.stripeCouponId) {
        try {
          const coupon = await stripe.coupons.retrieve(promoCode.stripeCouponId);
          if (coupon && coupon.valid) {
            return coupon;
          }
        } catch (error) {
          // Coupon doesn't exist, create new one
        }
      }

      // Create new coupon
      return await this.createStripeCoupon(promoCode);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StripeCouponManager;
