import { useEffect, useState } from 'react';
import { createContext, ReactNode } from 'react';

import { auth, firebase } from '../services/firebase';

type User = {
	id: string;
	name: string;
	avatar: string;
}

type AuthContextType = {
	signInWithGoogle: () => Promise<void>;
	user: User | undefined;
}

type AuthContextProps = {
	children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProps) {
	const [ user, setUser ] = useState<User>();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if(user){
				setUserData(user);
			}
		});

		return () => {
			unsubscribe();
		}
		
	}, []);

	async function signInWithGoogle() {
		const provider = new firebase.auth.GoogleAuthProvider();

		const result = await auth.signInWithPopup(provider);

		if(result?.user){
			setUserData(result?.user);
		}
	}

	function setUserData(googleUser: firebase.User) {
		const { displayName, photoURL, uid } = googleUser;

		if(!displayName || !photoURL) {
			throw new Error('Missing user information');
		}

		setUser({
			id: uid,
			name: displayName,
			avatar: photoURL
		})
	}

	return (
		<AuthContext.Provider value={{ 
			signInWithGoogle, 
			user 
		}}>
			{ children }
		</AuthContext.Provider>
	)
}