### Architectural Design Backend

### Backend
``` mermaid
graph TB
    subgraph "Backend - Node.js/Express"
        direction TB
        Server[server.js]
        AppJS[app.js]
        
        subgraph "Middleware"
            Auth[auth.js]
            ErrorMW[errors.js]
            AsyncErrors[catchAsyncErrors.js]
        end
        
        subgraph "Routes"
            AdvertRoute[Advert Routes]
            AuthRoute[Auth Routes]
            CarouselRoute[Carousel Routes]
            CategoryRoute[Category Routes]
            OrderRoute[Order Routes]
            ProductRoute[Product Routes]
            PromoRoute[PromoCode Routes]
            StripeRoute[Stripe Routes]
        end
        
        subgraph "Controllers"
            AdvertCtrl[Advert Controller]
            AuthCtrl[Auth Controller]
            CarouselCtrl[Carousel Controller]
            CategoryCtrl[Category Controller]
            OrderCtrl[Order Controller]
            ProductCtrl[Product Controller]
            PromoCtrl[PromoCode Controller]
            StripeCtrl[Stripe Controller]
        end
        
        subgraph "Models"
            AdvertModel[Advert Model]
            CarouselModel[Carousel Model]
            CategoryModel[Category Model]
            OrderModel[Order Model]
            ProductModel[Product Model]
            PromoModel[PromoCode Model]
            UserModel[User Model]
        end
        
        subgraph "Utilities"
            APIFeatures[API Features]
            ErrorHandler[Error Handler]
            JWT[JWT Token Manager]
            PromoValidator[PromoCode Validator]
            Email[Send Email]
            StripeCoupon[Stripe Coupon Manager]
        end
        
        subgraph "Configuration"
            Config[Database Config]
        end
    end
    
    subgraph "External Services"
        Stripe[Stripe Payment Gateway]
        EmailService[Email Service]
    end
    
    subgraph "Database"
        DB[(Database)]
    end
```