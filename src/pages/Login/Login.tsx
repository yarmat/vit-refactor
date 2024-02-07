import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import style from './Login.module.css';

const Login: React.FC = () => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleLogin = () => {
		if (username === '123' && password === '123') {
			setTimeout(() => {
				location.href = '/posts';
			}, 3000);
		} else {
			console.log('Incorrect');
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
					/>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" onClick={handleLogin}> Login </Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;