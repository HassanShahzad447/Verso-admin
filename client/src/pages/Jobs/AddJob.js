import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postJob } from '../../services/jobService';

const AddJob = () => {
    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        location: '',
        salaryRange: { min: '', max: '' },
        skillsRequirement: [],
        lastDateToApply: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await postJob(jobData); // Call the postJob function
            console.log(result);
            navigate('/jobs'); // Redirect after successful posting
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div>
                <div className='p-4 pt-5'>
                    <div className="card shadow">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Create Job Posting</h5>
                            <a href="# " className="btn btn-primary">All Blog</a>
                        </div>
                        <div className="add-blog-container p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="col-12">
                                    <label htmlFor="inputAddress2" className="form-label">Title: </label>
                                    <input type="text" name="title" placeholder="Job Title" onChange={handleChange} required />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="inputEmail4" className="form-label">Description</label>
                                    <textarea name="description" placeholder="Job Description" onChange={handleChange} required></textarea>
                                </div>

                                <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
                                <input type="number" name="salaryRange.min" placeholder="Min Salary" onChange={handleChange} />
                                <input type="number" name="salaryRange.max" placeholder="Max Salary" onChange={handleChange} />
                                <input type="text" name="skillsRequirement" placeholder="Skills (comma separated)" onChange={handleChange} required />
                                <input type="date" name="lastDateToApply" onChange={handleChange} />
                                <button type="submit">Post Job</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddJob;
