import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postJob } from '../../services/jobService';
import { getCategories } from '../../services/categoryService';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import './AddJob.css'; // Custom CSS for styling

const AddJob = () => {
    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        location: '',
        salaryRange: { min: '', max: '' },
        skillsRequirement: [],
        lastDateToApply: ''
    });
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

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
            const skills = selectedCategories.map(category => category.label);
            const formattedJobData = {
                ...jobData,
                skillsRequirement: skills,
            };
            const result = await postJob(formattedJobData);
            console.log(result);
            navigate('/joblist');
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategories();
                if (categoriesData.success) {
                    setCategories(
                        categoriesData.categories.map(category => ({
                            value: category._id,
                            label: category.name,
                        }))
                    );
                } else {
                    console.error("Error fetching categories:", categoriesData.message);
                    alert(categoriesData.message || "Error fetching categories");
                }
            } catch (error) {
                console.error("Error fetching categories:", error.message);
                alert("An error occurred while fetching categories. Please try again.");
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="add-job-page">
            <div className="container py-5">
                <div className="card shadow-lg">
                    <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Create Job Posting</h5>
                        <a href="/joblist" className="btn btn-light">View All Jobs</a>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="row g-4">
                            <div className="col-12">
                                <label htmlFor="inputTitle" className="form-label">Job Title</label>
                                <input
                                    type="text"
                                    id="inputTitle"
                                    name="title"
                                    className="form-control"
                                    placeholder="Enter job title"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputDescription" className="form-label">Job Description</label>
                                <ReactQuill
                                    id="inputDescription"
                                    name="description"
                                    value={jobData.description}
                                    onChange={(value) => setJobData(prevData => ({ ...prevData, description: value }))}
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputSkills" className="form-label">Job Category</label>
                                <Select
                                    isMulti
                                    id="inputSkills"
                                    options={categories}
                                    value={selectedCategories}
                                    onChange={setSelectedCategories}
                                    placeholder="Select required skills"
                                    className="w-100"
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputLocation" className="form-label">Location</label>
                                <select
                                    id="inputLocation"
                                    value={jobData.location}
                                    onChange={(e) => setJobData(prevData => ({ ...prevData, location: e.target.value }))}
                                    required
                                    className="form-select"
                                >
                                    <option value="" disabled>Select Location</option>
                                    <option value="onsite">Onsite</option>
                                    <option value="remote">Remote</option>
                                    <option value="hybrid">Hybrid</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputMinSalary" className="form-label">Minimum Salary</label>
                                <input
                                    type="number"
                                    id="inputMinSalary"
                                    name="salaryRange.min"
                                    className="form-control"
                                    placeholder="Enter minimum salary"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputMaxSalary" className="form-label">Maximum Salary</label>
                                <input
                                    type="number"
                                    id="inputMaxSalary"
                                    name="salaryRange.max"
                                    className="form-control"
                                    placeholder="Enter maximum salary"
                                    onChange={handleChange}
                                />
                            </div>
                
                            <div className="col-md-6">
                                <label htmlFor="inputLastDate" className="form-label">Last Date to Apply</label>
                                <input
                                    type="date"
                                    id="inputLastDate"
                                    name="lastDateToApply"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-dark px-5">Post Job</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddJob;