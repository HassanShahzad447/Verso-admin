const BASE_URL = process.env.REACT_APP_BackendURL; 

const postJob = async (jobData) => {
  const response = await fetch(`${BASE_URL}/api/addjobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    throw new Error('Failed to create job posting');
  }

  return await response.json();
};


const getJobById = async (jobId) => {
  try {
      const response = await fetch(`${BASE_URL}/api/jobs/${jobId}`);
      const data = await response.json();
      console.log(data); // Log the data returned from the API
      if (!response.ok) {
          throw new Error('Failed to fetch job details');
      }
      return data;
  } catch (error) {
      console.error(error);
      throw new Error(error.message || 'Error fetching job details');
  }
};

// Function to update a job posting by ID
const updateJob = async (jobId, jobData) => {
  try {
      const response = await fetch(`${BASE_URL}/api/jobs/${jobId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(jobData),
      });

      if (!response.ok) {
          throw new Error('Failed to update job posting');
      }

      const updatedJob = await response.json();
      return updatedJob;
  } catch (error) {
      console.error(error);
      throw new Error(error.message || 'Error updating job');
  }
};

export { postJob, getJobById, updateJob };