import React from 'react';
import {Layout} from 'antd';
import {AuthProvider} from '@/contexts/AuthContext.tsx';
import Router from '@/router/Router.tsx';

const App: React.FC = () => {
	return (
		<AuthProvider>
			<Layout>
				<Router />
			</Layout>
		</AuthProvider>
	);
};

export default App;