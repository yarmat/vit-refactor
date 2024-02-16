import React  from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './pages/AuthContext';
import Login from './pages/Login/Login';
import AllPosts from './pages/AllPosts/AllPosts';
import Post from './pages/Post/Post';
import Error from './pages/Error/Error';

const App: React.FC = () => {
	const {isLoggedIn} = useAuth();

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						isLoggedIn ? <Navigate to="/posts" /> : <Login />
					}
				/>
				<Route path="/posts" element={<AllPosts />} />
				<Route path="/posts/:id" element={<Post />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;