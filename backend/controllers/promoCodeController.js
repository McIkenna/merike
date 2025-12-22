const PromoCode = require('../models/promoCode');
const PromoCodeValidator = require('../utils/PromoCodeValidator');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
// Validate Promo Code
exports.validatePromoCode = async (req, res) => {
  try {
    const { code, cartItems, cartTotal } = req.body;
    const userId = req.user._id;

    const validation = await PromoCodeValidator.validatePromoCode(
      code,
      userId,
      cartItems,
      cartTotal
    );

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message
      });
    }

    res.status(200).json({
      success: true,
      message: validation.message,
      discount: validation.discount,
      promoCode: {
        code: validation.promoCode.code,
        discountType: validation.promoCode.discountType,
        discountValue: validation.promoCode.discountValue
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error validating promo code',
      error: error.message
    });
  }
};

// Apply Promo Code to Order
exports.applyPromoCode = async (req, res) => {
  try {
    const { code, orderId, orderAmount } = req.body;
    const userId = req.user._id;

    const promoCode = await PromoCode.findOne({ 
      code: code.toUpperCase() 
    });

    if (!promoCode) {
      return res.status(404).json({
        success: false,
        message: 'Promo code not found'
      });
    }

    // Update usage count
    promoCode.usedCount += 1;
    promoCode.usedBy.push({
      user: userId,
      usedAt: new Date(),
      orderAmount: orderAmount
    });

    await promoCode.save();

    res.status(200).json({
      success: true,
      message: 'Promo code applied successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error applying promo code',
      error: error.message
    });
  }
};

// Get All Active Promo Codes (Public)
exports.getActivePromoCodes = async (req, res) => {
  try {
    const now = new Date();
    
    const promoCodes = await PromoCode.find({
      isActive: true,
      validFrom: { $lte: now },
      validUntil: { $gte: now },
      userSpecific: { $size: 0 } // Only public codes
    }).select('code description discountType discountValue minPurchaseAmount validUntil');

    res.status(200).json({
      success: true,
      count: promoCodes.length,
      promoCodes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching promo codes',
      error: error.message
    });
  }
};


exports.getAllPromoCode = catchAsyncErrors(async (req, res, next) => {
    try {
        // Fetch all products from the database
        const promos = await PromoCode.find();


        // Send the response with all products and the total count
        res.status(200).json({
            success: true,
            promos
        });
    } catch (err) {
        // Handle any errors that occur during the process
        return next(new ErrorHandler(err.message, 400));
    }
});

// Create Promo Code (Admin)
exports.createPromoCode = async (req, res) => {
  try {
    const promoCode = await PromoCode.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Promo code created successfully',
      promoCode
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating promo code',
      error: error.message
    });
  }
};

exports.updatePromoCode = catchAsyncErrors(async (req, res, next) => {
    try{
        let promoCode = await PromoCode.findById(req.params.id);
        if (promoCode) {
            promoCode = await PromoCode.findByIdAndUpdate(req.params.id, req.body,{
                new: true,
                runValidators: true,
                
            })
            res.status(200).json({
                statusCode: 200,
                success: true,
                promoCode
            })
        } else {
            return next(new ErrorHandler('PromoCode does not exist', 404))
        }
    }catch (err) {
        return next(new ErrorHandler(err.message , 400))
    }
})


exports.deletePromoCode = catchAsyncErrors(async(req, res, next) => {
    try{
        const promo = await PromoCode.findByIdAndDelete(req.params.id);
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: `${promo.code} deleted successfully`
        })
    }catch(err){
        return next(new ErrorHandler('PromoCode does not exist', 404))
    }
})