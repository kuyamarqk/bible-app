import React, { useState, useEffect } from 'react';
import { auth } from '@/firebase'; // Import Firebase auth from your Firebase configuration
import { User } from 'firebase/auth';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);; // To track the current user

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // User is signed in
    } catch (error) {
      // Handle sign-in errors
      console.error('Sign In Error', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      {user ? (
        <p>You are signed in as {user.email}.</p>
      ) : (
        <form>
          <div className="mb-4">
            <label className="block">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
