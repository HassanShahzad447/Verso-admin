import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postJob } from '../../services/jobService';
import { getCategories } from '../../services/categoryService';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [hovered, setHovered] = useState(false);

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
      toast.success('Job posted successfully!');
      setTimeout(() => {
        navigate('/joblist');
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error('Error posting job. Please try again.');
    }
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

  const buttonStyle = {
    backgroundColor: "#212529",  
    color: 'white',
    borderRadius: '10px',
    padding: '10px 20px',
    transition: 'transform 0.3s ease',  
    transform: hovered ? 'scale(1.1)' : 'scale(1)',  
    boxShadow: 'none',  
    border: 'none',
  };
  return (
    <div className="add-job-page text-center" style={{ paddingTop: '50px' }}>
      <div className="p-4 pt-5">
        <div className="card shadow" style={{ borderRadius: '10px' }}>
          <div
            className="card-header d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: '#212529',
              color: 'white',
              borderRadius: '10px 10px 0 0',
            }}
          >
            <h5 className="mb-0" style={{ fontWeight: 'bold' }}>
              Create Job Posting
            </h5>
            <a
              href="/joblist"
              className="btn btn-light" 
              onMouseEnter={() => setHovered(true)}  
              onMouseLeave={() => setHovered(false)}  
            >
              View All Jobs
            </a>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} className="row g-4">
              <div className="col-12">
                <label htmlFor="inputTitle" className="form-label" style={{ fontWeight: 'bold', color: "#212529" }}>Job Title</label>
                <input
                  type="text"
                  id="inputTitle"
                  name="title"
                  className="form-control"
                  placeholder="Enter job title"
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: '10px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputDescription" className="form-label" style={{ fontWeight: 'bold', color: "#212529" }}>Job Description</label>
                <ReactQuill
                  id="inputDescription"
                  name="description"
                  value={jobData.description}
                  onChange={(value) => setJobData(prevData => ({ ...prevData, description: value }))}
                  required
                  style={{
                    height: '250px',
                    borderRadius: '10px',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                    marginBottom: '20px',
                  }}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputSkills" className="form-label" style={{ fontWeight: 'bold', color: "#212529" }}>Job Category</label>
                <Select
                  isMulti
                  id="inputSkills"
                  options={categories}
                  value={selectedCategories}
                  onChange={setSelectedCategories}
                  placeholder="Select required skills"
                  className="w-100"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderRadius: '10px',
                      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                    }),
                  }}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputLocation" className="form-label" style={{ fontWeight: 'bold', color: "#212529" }}>Location</label>
                <select
                  id="inputLocation"
                  value={jobData.location}
                  onChange={(e) => setJobData(prevData => ({ ...prevData, location: e.target.value }))}
                  required
                  className="form-select"
                  style={{
                    borderRadius: '10px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <option value="" disabled>Select Location</option>
                  <option value="onsite">Onsite</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputMinSalary" className="form-label" style={{ fontWeight: 'bold', color: "#212529" }}>Minimum Salary</label>
                <input
                  type="number"
                  id="inputMinSalary"
                  name="salaryRange.min"
                  className="form-control"
                  placeholder="Enter minimum salary"
                  onChange={handleChange}
                  style={{
                    borderRadius: '10px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputMaxSalary" className="form-label" style={{ fontWeight: 'bold', color: "#212529" }}>Maximum Salary</label>
                <input
                  type="number"
                  id="inputMaxSalary"
                  name="salaryRange.max"
                  className="form-control"
                  placeholder="Enter maximum salary"
                  onChange={handleChange}
                  style={{
                    borderRadius: '10px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputLastDate" className="form-label" style={{ fontWeight: 'bold', color:"#212529" }}>Last Date to Apply</label>
                <input
                  type="date"
                  id="inputLastDate"
                  name="lastDateToApply"
                  className="form-control"
                  onChange={handleChange}
                  style={{
                    borderRadius: '10px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </div>
              <div className="col-12 text-center">
                <button
                  type="submit"
                  className="btn btn-primary px-5"
                  style={buttonStyle} 
                  onMouseEnter={() => setHovered(true)} 
                  onMouseLeave={() => setHovered(false)} 
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddJob;
