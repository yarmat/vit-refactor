import React, { createContext, useEffect, useState } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	isLoggedIn: false,
	login: () => {},
	logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
		const isLoggedIn = localStorage.getItem('isLoggedIn');
		return isLoggedIn ? JSON.parse(isLoggedIn) : false;
	});

	const login = () => {
		setIsLoggedIn(true);
	};

	const logout = () => {
		setIsLoggedIn(false);
	};

	useEffect(() => {
		localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
	}, [isLoggedIn]);

	return (		
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};