const API_URL = process.env.REACT_APP_BackendURL; 
const getToken = () => localStorage.getItem('token');

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

export const Admin = async (adminData, token) => {
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


export const fetchUserDetails = async (userId) => {
  const token = getToken();

  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Failed to fetch user details: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const updateUserDetails = async (userId, updatedDetails) => {
  const token = getToken();

  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDetails),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Failed to update user details: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error updating user details:', error);
    throw error;
  }
};