
export const passwordValidator = [
  {
    validator: function (password) {
      return password.length >= 8; 
    },
    message: "Password must be at least 8 characters long.",
  },
  {
    validator: function (password) {
      return /[A-Z]/.test(password); 
    },
    message: "Password must contain at least one uppercase letter.",
  },
  {
    validator: function (password) {
      return /[0-9]/.test(password); 
    },
    message: "Password must contain at least one number.",
  },
];
