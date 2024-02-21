import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import AllPosts from './pages/AllPosts/AllPosts';
import Post from './pages/Post/Post';
import Error from './pages/Error/Error';
import GuestLayout from './layouts/GuestLayout';
import AuthLayout from './layouts/AuthLayout';

const App: React.FC = () => {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<GuestLayout />} >
					<Route path="/" element={<Login />} />
				</Route>

				<Route path="/posts" element={<AuthLayout />} >
					<Route path="/posts" element={<AllPosts />} />
					<Route path="/posts/:id" element={<Post />} />
				</Route>

				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;