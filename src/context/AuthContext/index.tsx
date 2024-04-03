"use client"
import React, { createContext, useState, ReactNode, useContext } from "react";
import { SessionProvider } from "next-auth/react";

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false, // Initialize with default value
    setIsAuthenticated: () => {}
});

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    return (
        <SessionProvider>
            <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
                {children}
            </AuthContext.Provider>
        </SessionProvider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;

// "use client"
// import React, { createContext, useState, ReactNode } from "react";
// // import { SessionProvider } from "next-auth/react";
 
// interface UserData {

//     token: string;
//     id: number;
//     name: string;
//     username: string;
//     email: string;
//     display_name: string;
//     phone: string;
//     ok_user_id: string;
//     // Add more fields as needed
// }

// interface AuthContextType {
//     userData: UserData | null;
//     isLoggedIn: boolean;
//     login: (token: UserData) => void;
//     logout: () => void;
//     setUserData: React.Dispatch<React.SetStateAction<UserData | null>>; // Add setUser function
// }

// const initialUserDataString = localStorage.getItem("ok-calendar-token");
// const initialUserData: UserData | null = initialUserDataString
//     ? JSON.parse(initialUserDataString)
//     : null;

// export const AuthContext = createContext<AuthContextType>({
//     userData: initialUserData,
//     isLoggedIn: !!initialUserData,
//     login: () => { },
//     logout: () => { },
//     setUserData: () => {} 
// });

// interface AuthContextProviderProps {
//     children: ReactNode; 
// }

// export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
//     const [userData, setUserData] = useState<UserData | null>(initialUserData); 
//     const userIsLoggedIn = !!userData;

//     const loginHandler = (token: UserData) => {
//         setUserData(token);
//         sessionStorage.setItem("ok-calendar-token", JSON.stringify(token));
//     };

//     const logoutHandler = () => {
//         setUserData(null);
//         sessionStorage.removeItem("ok-calendar-token");
//     };


//     const contextValue: AuthContextType = {
//         userData: userData,
//         isLoggedIn: userIsLoggedIn,
//         login: loginHandler,
//         logout: logoutHandler,
//         setUserData: setUserData 
//     };

//     return (
//         // <SessionProvider>
//             <AuthContext.Provider value={contextValue}>
//                {children}
//             </AuthContext.Provider>
//         // </SessionProvider>
//     );
// };

// export default AuthContext;
