# Merike E-Commerce

### Architecture Diagram
```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser]
    end
    
    subgraph "Frontend - React + Vite"
        direction TB
        HTML[index.html]
        App[App.jsx]
        
        subgraph "Components"
            Cart[Cart Components]
            Category[Category Components]
            Checkout[Checkout Components]
            Product[Product Components]
            Profile[Profile Components]
            Layout[Layout Components]
            Order[Order Components]
            PromoUI[PromoCode Components]
            User[User Components]
        end
        
        subgraph "State Management"
            Store[Redux Store]
            Actions[Actions]
            Reducers[Reducers]
            AuthReducer[Auth Reducer]
        end
        
        subgraph "API Services"
            BannerAPI[Banner API]
            CarouselAPI[Carousel API]
            CategoryAPI[Category API]
            CheckoutAPI[Checkout API]
            OrderAPI[Order API]
            ProductAPI[Product API]
            PromoAPI[PromoCode API]
            UserAPI[User API]
        end
        
        subgraph "Utils"
            Loader[Loaders]
            Search[Search]
            Themes[Themes]
            Cards[UI Cards]
        end
    end
    
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
    
    Browser --> HTML
    HTML --> App
    App --> Components
    Components --> Store
    Store --> API Services
    API Services --> Server
    
    Server --> AppJS
    AppJS --> Middleware
    Middleware --> Routes
    Routes --> Controllers
    Controllers --> Models
    Controllers --> Utilities
    Models --> DB
    Config --> DB
    
    StripeCtrl --> Stripe
    Email --> EmailService
    StripeCoupon --> Stripe
    
    style Browser fill:#e1f5ff
    style Frontend fill:#f0f0f0
    style Backend fill:#fff4e6
    style Database fill:#e8f5e9
    style "External Services" fill:#fce4ec
```

### Application UML Class Diagram

``` mermaid

classDiagram
    class User {
        +String id
        +String name
        +String email
        +String password
        +String role
        +Date createdAt
        +login()
        +register()
        +updateProfile()
        +resetPassword()
    }
    
    class Product {
        +String id
        +String name
        +String description
        +Number price
        +Number stock
        +String category
        +Array images
        +Number ratings
        +Array reviews
        +Date createdAt
        +getProducts()
        +getProductDetails()
        +createProduct()
        +updateProduct()
        +deleteProduct()
    }
    
    class Category {
        +String id
        +String name
        +String description
        +String image
        +getCategories()
        +createCategory()
        +updateCategory()
        +deleteCategory()
    }
    
    class Order {
        +String id
        +String userId
        +Array orderItems
        +Object shippingInfo
        +Number totalPrice
        +String orderStatus
        +Date createdAt
        +Date deliveredAt
        +createOrder()
        +getOrders()
        +updateOrderStatus()
        +deleteOrder()
    }
    
    class PromoCode {
        +String id
        +String code
        +Number discount
        +Date expiryDate
        +Number usageLimit
        +Number usedCount
        +Boolean isActive
        +validateCode()
        +createPromoCode()
        +updatePromoCode()
        +deletePromoCode()
    }
    
    class Carousel {
        +String id
        +String title
        +String image
        +String link
        +Number order
        +Boolean isActive
        +getCarousels()
        +createCarousel()
        +updateCarousel()
        +deleteCarousel()
    }
    
    class Advert {
        +String id
        +String title
        +String content
        +String image
        +String link
        +Date startDate
        +Date endDate
        +Boolean isActive
        +getAdverts()
        +createAdvert()
        +updateAdvert()
        +deleteAdvert()
    }
    
    class AuthController {
        +registerUser()
        +loginUser()
        +logoutUser()
        +forgotPassword()
        +resetPassword()
        +getUserProfile()
        +updatePassword()
    }
    
    class ProductController {
        +getProducts()
        +getProductDetails()
        +createProduct()
        +updateProduct()
        +deleteProduct()
        +createProductReview()
        +getProductReviews()
    }
    
    class OrderController {
        +newOrder()
        +getSingleOrder()
        +myOrders()
        +getAllOrders()
        +updateOrder()
        +deleteOrder()
    }
    
    class StripeController {
        +processPayment()
        +sendStripeApiKey()
        +createPaymentIntent()
        +handleWebhook()
    }
    
    class CategoryController {
        +getCategories()
        +getCategoryDetails()
        +createCategory()
        +updateCategory()
        +deleteCategory()
    }
    
    class PromoCodeController {
        +validatePromoCode()
        +createPromoCode()
        +getAllPromoCodes()
        +updatePromoCode()
        +deletePromoCode()
    }
    
    class AuthMiddleware {
        +isAuthenticatedUser()
        +authorizeRoles()
        +verifyToken()
    }
    
    class ErrorMiddleware {
        +handleError()
        +catchAsyncErrors()
    }
    
    class ApiFeatures {
        +search()
        +filter()
        +pagination()
        +sort()
    }
    
    class JWTToken {
        +generateToken()
        +verifyToken()
        +sendToken()
    }
    
    class EmailService {
        +sendEmail()
        +sendPasswordResetEmail()
        +sendOrderConfirmation()
    }
    
    class StripeCouponManager {
        +createCoupon()
        +updateCoupon()
        +deleteCoupon()
        +validateCoupon()
    }
    
    class PromoCodeValidator {
        +validate()
        +checkExpiry()
        +checkUsageLimit()
    }
    
    User "1" --> "*" Order : places
    Order "*" --> "*" Product : contains
    Product "*" --> "1" Category : belongs to
    Order "1" --> "0..1" PromoCode : uses
    
    AuthController --> User : manages
    ProductController --> Product : manages
    OrderController --> Order : manages
    CategoryController --> Category : manages
    PromoCodeController --> PromoCode : manages
    StripeController --> Order : processes payment
    
    AuthController --> JWTToken : uses
    AuthController --> EmailService : uses
    AuthMiddleware --> JWTToken : uses
    ProductController --> ApiFeatures : uses
    PromoCodeController --> PromoCodeValidator : uses
    StripeController --> StripeCouponManager : uses
    
    AuthController --> AuthMiddleware : protected by
    ProductController --> AuthMiddleware : protected by
    OrderController --> AuthMiddleware : protected by
    
    AuthController --> ErrorMiddleware : uses
    ProductController --> ErrorMiddleware : uses
    OrderController --> ErrorMiddleware : uses

    ```