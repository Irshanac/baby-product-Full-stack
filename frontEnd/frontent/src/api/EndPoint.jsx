const endPoints = {
    AUTH: {
      LOGIN: "/users/login",
      REGISTER: "/users/register",
      REFRESH_TOKEN: "/auth/refresh-token", // New endpoint for token refresh
    }
    // PRODUCTS: {
    //   GET_ALL_PRODUCTS: "/products",
    //   GET_SINGLE_PRODUCT: (id) => `/products/${id}`,
    //   GET_CATEGORY: (categoryName) => `/products/category/${categoryName}`,
    //   SEARCH: (keyword) => `/products/search?keyword=${keyword}`,
    // },
    // CART: {
    //   ADD_TO_CART: "/cart/add",
    //   GET_CART: "/cart",
    //   DELETE_FROM_CART: (id) => `/cart/${id}`,
    // },
    // WISHLIST: {
    //   ADD_TO_WISHLIST: "/wishlist/add",
    //   GET_WISHLIST: "/wishlist",
    //   DELETE_FROM_WISHLIST: (id) => `/wishlist/${id}`,
    // },
    // PROFILE: {
    //   GET_PROFILE: "/profile",
    //   UPDATE_PROFILE: "/profile",
    // },
    // ORDERS: {
    //   CREATE: "/orders",
    //   GET_USER_ORDERS: "/orders/user",
    //   GET_SINGLE_ORDER: (id) => `/orders/${id}`,
    // },
  };
  
  export default endPoints;
  