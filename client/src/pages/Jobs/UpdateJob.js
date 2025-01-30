import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../../services/jobService";
import { getCategories } from "../../services/categoryService";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salaryRange: { min: "", max: "" },
    skillsRequirement: [],
    lastDateToApply: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { jobId } = useParams(); // To get jobId from the URL
  const navigate = useNavigate();
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const jobResponse = await getJobById(jobId);
        console.log(jobResponse); // Log the response for debugging

        if (jobResponse && jobResponse._id) {
          const {
            title,
            description,
            location,
            salaryRange,
            skillsRequirement = [],
            lastDateToApply,
          } = jobResponse;
          const formattedDate = lastDateToApply
            ? new Date(lastDateToApply).toISOString().split("T")[0]
            : "";

          setJobData({
            title,
            description,
            location,
            salaryRange,
            skillsRequirement,
            lastDateToApply: formattedDate,
          });
          setSelectedCategories(
            skillsRequirement.map((skill) => ({ label: skill, value: skill }))
          );
        } else {
          alert("Error fetching job data");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
        alert("An error occurred while fetching job details.");
      }
    };
    fetchJobData();
  }, [jobId]);

  // Fetch categories for the Select input
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        if (categoriesData.success) {
          setCategories(
            categoriesData.categories.map((category) => ({
              value: category._id,
              label: category.name,
            }))
          );
        } else {
          alert(categoriesData.message || "Error fetching categories");
        }
      } catch (error) {
        alert("An error occurred while fetching categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "lastDateToApply") {
      const formattedDate = new Date(value).toISOString().split("T")[0];
      setJobData((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else {
      setJobData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skills = selectedCategories.map((category) => category.label);
      const formattedJobData = {
        ...jobData,
        skillsRequirement: skills,
      };
      const result = await updateJob(jobId, formattedJobData);
      console.log(result);
      toast.success("Job updated successfully!", {
        autoClose: 3000, // Adjust timeout for toast
      });
      setTimeout(() => {
        navigate("/joblist"); // Redirect after toast timeout
      }, 3000); // Match timeout duration for smooth transition
    } catch (error) {
      console.error(error);
      toast.error("Error updating job. Please try again.", {
        autoClose: 3000, // Adjust timeout for toast
      });
    }
  };

  return (
    <div className="add-job-page">
      <div className="container py-5">
        <div className="card shadow-lg">
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Update Job Posting</h5>
            <a href="/joblist" className="btn btn-light" >
              View All Jobs
            </a>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} className="row g-4">
              <div className="col-12">
                <label htmlFor="inputTitle" className="form-label">
                  Job Title
                </label>
                <input
                  type="text"
                  id="inputTitle"
                  name="title"
                  className="form-control"
                  placeholder="Enter job title"
                  value={jobData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputDescription" className="form-label">
                  Job Description
                </label>
                <ReactQuill
                  id="inputDescription"
                  name="description"
                  value={jobData.description}
                  onChange={(value) =>
                    setJobData((prevData) => ({
                      ...prevData,
                      description: value,
                    }))
                  }
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputSkills" className="form-label">
                  Job Category
                </label>
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
                <label htmlFor="inputLocation" className="form-label">
                  Location
                </label>
                <select
                  id="inputLocation"
                  value={jobData.location}
                  onChange={(e) =>
                    setJobData((prevData) => ({
                      ...prevData,
                      location: e.target.value,
                    }))
                  }
                  required
                  className="form-select"
                >
                  <option value="" disabled>
                    Select Location
                  </option>
                  <option value="onsite">Onsite</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputMinSalary" className="form-label">
                  Minimum Salary
                </label>
                <input
                  type="number"
                  id="inputMinSalary"
                  name="salaryRange.min"
                  className="form-control"
                  placeholder="Enter minimum salary"
                  value={jobData.salaryRange.min}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputMaxSalary" className="form-label">
                  Maximum Salary
                </label>
                <input
                  type="number"
                  id="inputMaxSalary"
                  name="salaryRange.max"
                  className="form-control"
                  placeholder="Enter maximum salary"
                  value={jobData.salaryRange.max}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="inputLastDate" className="form-label">
                  Last Date to Apply
                </label>
                <input
                  type="date"
                  id="inputLastDate"
                  name="lastDateToApply"
                  className="form-control"
                  value={jobData.lastDateToApply}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 text-center">
                <button type="submit" className="btn btn-dark px-5">
                  Update Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default UpdateJob;
