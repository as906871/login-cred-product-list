function createAuthService() {
  // const baseURL = 'https://api.xyz.com';

  const login = async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          credentials.email === 'admin@test.com' &&
          credentials.password === 'admin123'
        ) {
          const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo.token';
          const user = { id: 1, email: credentials.email, name: 'Admin User' };
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          resolve({ token, user });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const signup = async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo.token';
        const user = { id: 2, email: userData.email, name: userData.name };
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        resolve({ token, user });
      }, 1000);
    });
  };

  const forgotPassword = async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ message: 'Reset link sent to email' }), 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  return {
    login,
    signup,
    forgotPassword,
    logout,
    getCurrentUser,
    getToken,
  };
}

const authService = createAuthService();

export default authService;
