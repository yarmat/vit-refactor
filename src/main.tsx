import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { AdminPages } from './pages/AdminPages/AdminPages';
import { Post } from './pages/Post/Post';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Login />
	},
	{
		path: '/admin',
		element: <AdminPages />
	},
	{
		path: '/admin/:id',
		element: <Post />
	}
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
