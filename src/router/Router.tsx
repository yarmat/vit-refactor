import {BrowserRouter, Route, Routes} from 'react-router-dom';
import GuestLayout from '@/layouts/GuestLayout.tsx';
import Login from '@/pages/Login/Login.tsx';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout.tsx';
import PostIndex from '@/pages/Post/PostIndex/PostIndex.tsx';
import PostShow from '@/pages/Post/PostShow/PostShow.tsx';
import Error from '@/pages/Error/Error.tsx';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<GuestLayout />} >
					<Route path="/" element={<Login />} />
				</Route>

				<Route path="/posts" element={<AuthLayout />} >
					<Route path="/posts" element={<PostIndex />} />
					<Route path="/posts/:id" element={<PostShow />} />
				</Route>

				<Route path="*" element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;