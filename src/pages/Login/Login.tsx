import React, { useState } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import style from './Login.module.css';

const Login: React.FC = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const handleLogin = () => {
		setLoading(true);
		if (username === '123' && password === '123') {
			setTimeout(() => {
				setLoading(false);
				location.href = '/posts';
			}, 3000);
		} else {
			console.log('Incorrect');
			setLoading(false);
		}
	};

	return (
		<div className={style['page']}>
			<Form className={style['form']}>
				<Form.Item className={style['username']}
					label="Username"
					name="username"
					rules={[{ required: true, message: 'input your username!' }]}
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
					rules={[{ required: true, message: 'input your password!' }]}
				>
					<Input.Password className={style['input-pas']}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						prefix={<LockOutlined />} 
					/>
				</Form.Item>

				<Form.Item >
					<Button type="primary" htmlType="submit" onClick={handleLogin}> Login </Button>
				</Form.Item>
				<div className={style['spin']}>
					<Spin spinning={loading} />
				</div>
				
			</Form>

		</div>
	);
};

export default Login;