import React from 'react';
import ReactDOM from 'react-dom/client';
import {  Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from './pages/User/userInterface'
import GroupInterface from './pages/Group/groupInterface'
const View = () => {
  return (
    <>
      <div>User</div>
    </>
  )
}
 function App() {
    return (
      <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<View />} />
            <Route path="User" element={<UserList />} />
            <Route path="Group" element={<GroupInterface />} />
          </Route>
        </Routes>
      </BrowserRouter><div></div>
      </>
    );
  }

  const Layout = () => {
    return (
      <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/User">User</Link>
            </li>
            <li>
              <Link to="/Group">Group</Link>
            </li>
          </ul>
        </nav>
    </>
    )
  };
  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
