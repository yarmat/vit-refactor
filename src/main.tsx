import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import { Layout } from 'antd';

const AppWithProvider: React.FC = () => {
	return (
		<React.StrictMode>
			<AuthProvider>
				<Layout>
					<App />
				</Layout>
			</AuthProvider>
		</React.StrictMode>
	);
};

createRoot(document.getElementById('root')!).render(<AppWithProvider />);

