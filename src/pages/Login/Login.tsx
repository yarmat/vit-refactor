import React, { useState } from 'react';
import { Form, Input, Button, Spin, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import style from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login: React.FC = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null); 
	const navigate = useNavigate();
	const {login} = useAuth();

	const handleLogin = () => {
		setLoading(true);
		if (username === '123' && password === '123') {
			setTimeout(() => {
				setLoading(false);
				login();
				navigate('/posts');
			}, 2000);
		} else {
			setError('Incorrect username or password');
			setTimeout(() => {
				setError(null);
			}, 2000);
			setLoading(false);
		}
	};

	return (
		<div className={style['page']}>
			<Form className={style['form']}>
				<Form.Item className={style['username']}
					label="Username"
					name="username"
				>
					<Input className={style['input-user']}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						prefix={<UserOutlined />} 
					/>
				</Form.Item>

				<Form.Item className={style['password']}
					label="Password"
					name="password"
				>
					<Input.Password className={style['input-pas']}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						prefix={<LockOutlined />} 
					/>
				</Form.Item>

				<Form.Item className={style['submit']}>
					<Button type="primary" htmlType="submit" onClick={handleLogin}> Login </Button>
				</Form.Item>
				<Spin spinning={loading} fullscreen={true}/>
			</Form>
			{error && <Alert 
				message={error}
				type='error'
				showIcon />}
		</div>
	);
};

export default Login;
