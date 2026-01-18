Here's a detailed design architecture for your project, covering both the backend and frontend components.

Project Architecture Overview
1. Backend Architecture
The backend is structured to handle API requests, manage data, and perform business logic. It follows a modular approach, separating concerns into different directories.

Entry Point:

app.js: Initializes the application, sets up middleware, and routes.
Server Configuration:

server.js: Configures the server settings, including port and database connection.
Configuration:

config/: Contains configuration files, such as database.js for database connection settings.
Controllers:

controllers/: Contains various controllers that handle incoming requests and responses.
advertController.js
authController.js
carouselController.js
categoryController.js
orderController.js
productController.js
promoCodeController.js
stripeController.js
Data Models:

models/: Defines the data structure and schema for the application.
advert.js
carousel.js
category.js
order.js
product.js
promoCode.js
user.js
Routes:

routes/: Defines the API endpoints and maps them to the corresponding controllers.
advert.js
auth.js
carousel.js
category.js
order.js
product.js
promoCode.js
stripe.js
Middlewares:

middlewares/: Contains middleware functions for request processing.
auth.js: Handles authentication.
catchAsyncErrors.js: Catches errors in async functions.
errors.js: Centralized error handling.
Utilities:

utils/: Contains utility functions and helpers.
ApiFeatures.js: Handles API features like filtering and pagination.
ErrorHandler.js: Custom error handling.
jwtToken.js: JWT token management.
PromoCodeValidator.js: Validates promo codes.
sendEmail.js: Email sending functionality.
StripeCouponManager.js: Manages Stripe coupons.
Data:

data/: Contains static data files, such as product.json.
2. Frontend Architecture
The frontend is built using Vite and React, structured to provide a responsive and interactive user interface.

Entry Point:

index.html: The main HTML file that serves the application.
Configuration:

vite.config.js: Configuration file for Vite, including plugins and build settings.
eslint.config.js: Configuration for ESLint to maintain code quality.
Source Code:

src/: Contains all source code for the application.
main.jsx: The main entry point for the React application.
App.jsx: The root component that wraps the application.
Assets:

assets/: Contains static assets like images and fonts.
API:

api/: Contains API-related files for managing API calls and state.
actions.js: Action creators for managing state.
authReducer.js: Reducer for authentication state.
getApiUrl.js: Utility to get the API URL.
reducers.js: Combines all reducers.
store.js: Configures the Redux store.
services/: Contains service files for API interactions.
bannerApi.js
carouselApi.js
categoryApi.js
checkoutApi.js
orderApi.js
productApi.js
promoCodeApi.js
userApi.js
Components:

components/: Contains reusable React components.
cart/: Components related to the shopping cart.
category/: Components for category display.
checkout/: Components for the checkout process.
layout/: Layout components like header, footer, and banners.
order/: Components related to order management.
product/: Components for product display and details.
profile/: Components for user profile management.
promoCode/: Components for managing promo codes.
user/: Components related to user management.
Static Files:

public/: Contains public files that are served directly.
browserconfig.xml
manifest.json
robots.txt
Utilities:

utils/: Contains utility components and functions.
BoxCard.jsx
CarouselBanner.jsx
Circle.jsx
CustomSnackbar.jsx
Divider.jsx
DropDownSelect.jsx
ErrorPage.jsx
FavoritePage.jsx
Loader.jsx
MetaData.jsx
ModernLoader.jsx
NotFoundPage.jsx
ReviewRating.jsx
Search.jsx
ShoppingCart.jsx
SortProd.jsx
StyledIconButton.jsx
StyledLink.jsx
Themes.jsx
ThemeToggleButton.jsx
ThemeToggleProvider.jsx
Conclusion
This architecture provides a clear separation of concerns, making it easier to manage and scale the application. The backend handles data management and business logic, while the frontend focuses on user interaction and presentation. This modular approach enhances maintainability and allows for easier updates and feature additions in the future.