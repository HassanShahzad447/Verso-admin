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

export { postJob };