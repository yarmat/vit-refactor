import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import AllPosts from './pages/AllPosts/AllPosts';
import Post from './pages/Post/Post';
import { Error } from './pages/Error/Error';

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/posts" element={<AllPosts />} />
				<Route path="/posts/:id" element={<Post />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);