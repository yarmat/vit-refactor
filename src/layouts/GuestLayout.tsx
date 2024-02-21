import React from 'react';
import { Layout } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const { Content } = Layout;

const GuestLayout: React.FC = () => {
	const { isLoggedIn } = useAuth();

	if (isLoggedIn) {
		return <Navigate to='/posts'/>;
	}

	return (
		<Content>
			<Outlet/> 
		</Content>
	);
};

export default GuestLayout;