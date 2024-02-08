import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login/Login';
import AllPosts from './pages/AllPosts/AllPosts';
import { Post } from './pages/Post/Post';
import { Error } from './pages/Error/Error';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Login />
	},
	{
		path: '/posts',
		element: <AllPosts />
	},
	{
		path: '/posts/:id',
		element: <Post />
	},
	{
		path: '*',
		element: <Error />
	}
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
