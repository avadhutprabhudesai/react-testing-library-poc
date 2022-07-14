import React, { FormEvent, useState } from 'react';

export default function login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    alert(`${username} logged in`);
  };
  const handleReset = () => {
    setUsername('');
    setPassword('');
  };
  return (
    <form onSubmit={handleLogin} onReset={handleReset}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <button type="reset">Reset</button>
    </form>
  );
}
