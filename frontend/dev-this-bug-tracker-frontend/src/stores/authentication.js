import { defineStore } from 'pinia';
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // Store the authenticated user object
    token: null, // Store the JWT token
    isAuthenticated: false, // A flag to check if the user is authenticated
  }),
  actions: {
    // Action to set the user and token and mark as authenticated
    async login(user) {
        try {
            let response = await axios.post(`http://127.0.0.1:8000/user/login/`, user)
            if (response.status === 200) {
                localStorage.setItem("token", JSON.stringify(response.data.access))
                this.user = user;
                this.token = token;
                this.isAuthenticated = true;
            }
        } catch (error) {
            console.log(error.response.data);
            navigate("/register");
        }
      // Store the token in localStorage or another secure storage method if needed
      
    },

    // Action to clear user data, token, and mark as not authenticated
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;

      // Remove the token from localStorage or another secure storage method if needed
      localStorage.removeItem('token');
    },
  },
  getters: {
    // Getter to check if the user is authenticated
    isLoggedIn() {
      return this.isAuthenticated;
    },
  },
});