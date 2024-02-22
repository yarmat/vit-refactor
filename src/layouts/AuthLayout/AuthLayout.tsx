import React from 'react'; 
import { Button, Card, Layout, Space, Typography } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';
import { Footer } from 'antd/es/layout/layout';
import { InstagramOutlined, GithubOutlined, LoginOutlined } from '@ant-design/icons';
import style from './AuthLayout.module.css';
import Link from 'antd/es/typography/Link';
import useAuth from '@/hooks/useAuth.ts';

const { Content, Header } = Layout;
const { Title } = Typography;

const AuthLayout: React.FC = () => {
	const { isLoggedIn, logout } = useAuth();
	
	if (!isLoggedIn) {
		return <Navigate to='/' />;
	}

	return (
		<>
			<Header className={style['header']}>
				<Button onClick={logout}>
						Logout
					<LoginOutlined />
				</Button>
				<Title level={2}>Lorem, ipsum dolor.</Title>
			</Header>
			<Content>
				<Outlet />
			</Content>
			<Footer className={style['footer']}>
				<Card title='Contacts:' className={style['card']}>
					<Space size={30}>
						<Link href="https://github.com/VitaliiShved" target="_blank">
							<GithubOutlined style={{ fontSize: '30px' }} />
						</Link>
						<Link href="https://github.com/VitaliiShved" target="_blank">
							<InstagramOutlined style={{ fontSize: '30px' }} />
						</Link>
					</Space>
				</Card>
			</Footer>
		</>
	);
};

export default AuthLayout;
