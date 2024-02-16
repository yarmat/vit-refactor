import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './pages/AuthContext';
import App from './App';

const AppWithProvider: React.FC = () => {
	return (
		<React.StrictMode>
			<AuthProvider>
				<App />
			</AuthProvider>
		</React.StrictMode>
	);
};

createRoot(document.getElementById('root')!).render(<AppWithProvider />);

