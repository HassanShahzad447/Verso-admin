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
      console.log(data); 
      if (!response.ok) {
          throw new Error('Failed to fetch job details');
      }
      return data;
  } catch (error) {
      console.error(error);
      throw new Error(error.message || 'Error fetching job details');
  }
};

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

const fetchJobs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/jobs`);
    if (!response.ok) throw new Error(`Failed to fetch jobs: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

const deleteJob = async (jobId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/jobs/${jobId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Failed to delete job: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};


export { postJob, getJobById, updateJob, fetchJobs, deleteJob };