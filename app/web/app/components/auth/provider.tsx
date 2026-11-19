import { createContext, useState, type ReactNode } from "react";
import type { Me } from "@citron/share/user";

interface AuthProviderProps {
	children: ReactNode;
	initial: Me | null;
}

interface AuthContextType {
	user: Me | null;
	setUser: React.Dispatch<React.SetStateAction<Me | null>>;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
	children,
	initial
}: AuthProviderProps) {
	const [user, setUser] = useState<Me | null>(initial);
	const [loading, setLoading] = useState(false);

	return (
		<AuthContext.Provider value={{
			user,
			setUser,
			loading
		}}>
			{children}
		</AuthContext.Provider>
	)
}
