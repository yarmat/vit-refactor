import React from 'react'; 
import { Layout } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext'; 

const { Content, Header } = Layout;

const AuthLayout: React.FC = () => {
	const { isLoggedIn } = useAuth();
	
	if (!isLoggedIn) {
		return <Navigate to='/' />;
	}

	return (
		<>
			<Header />
			<Content>
				<Outlet /> 
			</Content>
		</>
	);
};

export default AuthLayout;