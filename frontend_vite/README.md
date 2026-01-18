# Merike E-Commerce

### Architecture Diagram

### FrontEnd
``` mermaid
graph TB
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
```