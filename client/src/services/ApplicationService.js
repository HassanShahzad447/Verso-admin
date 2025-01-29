const BASE_URL = process.env.REACT_APP_BackendURL;

// Fetch all job applications
export const fetchApplicants = async (jobId) => { 
  try {
    const response = await fetch(`${BASE_URL}/api/job-applications/applications?jobId=${jobId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch applications: ${response.statusText}`);
    }
    const result = await response.json();
    return result.data || []; // Return the application data
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};



export const getApplicationById = async (applicationId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/job-applications/${applicationId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch application: ${response.statusText}`);
    }
    const application = await response.json();
    return application;
  } catch (error) {
    console.error('Error fetching application by ID:', error);
    throw error;
  }
};

// Example: Delete an application by ID
export const deleteApplication = async (applicationId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/job-applications/${applicationId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete application: ${response.statusText}`);
    }
    return await response.json(); // Return the response for confirmation
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
};

// Export all application service functions
export default {
  fetchApplicants,
  getApplicationById,
  deleteApplication,
};
