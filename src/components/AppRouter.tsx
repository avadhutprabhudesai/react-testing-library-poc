import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>Home</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <Outlet></Outlet>
    </>
  );
}

function About() {
  return <h1>About</h1>;
}
function NoMatch() {
  return <h1>NoMatch</h1>;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
