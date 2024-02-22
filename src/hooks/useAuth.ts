import {useContext} from 'react';
import {AuthContext} from '@/contexts/AuthContext.tsx';

export default function useAuth() {
	return useContext(AuthContext);
}