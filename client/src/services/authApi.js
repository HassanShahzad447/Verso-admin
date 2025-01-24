const API_URL = process.env.REACT_APP_BackendURL; 

export const signUp = async (userData) => {
    const response = await fetch(`${API_URL}/api/users/signup`, { // Updated endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return await response.json();
};

export const signIn = async (userData) => {
    const response = await fetch(`${API_URL}/api/users/signin`, { // Updated endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return await response.json();
};

export const addAdmin = async (adminData, token) => {
    const response = await fetch(`${API_URL}/api/users/add-admin`, { // Updated endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(adminData),
    });
    return await response.json();
}; 