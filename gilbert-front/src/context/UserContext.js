import React, { createContext, useState, useContext } from 'react';

// Create the UserContext
export const UserContext = createContext();

export const useUser = () => useContext(UserContext);


// Create a UserProvider component
export const UserProvider = ({ children }) => {
    // Define the state for user info
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
        permissions: '',
    });

    // Create a function to update the user info
    const updateUserInfo = (newUserInfo) => {
        setUserInfo(newUserInfo);
    };

    // Provide the user info and update function to the children components
    return (
        <UserContext.Provider value={{ userInfo, updateUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};

