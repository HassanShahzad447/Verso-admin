import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserDetails } from "../../services/authApi";

const Setting = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userId = localStorage.getItem("id");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { name, email, password };
      await updateUserDetails(userId, updatedUser);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="container py-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-12">
          <div
            className="card shadow-lg border-0 rounded-3"
            style={{ backgroundColor: "#fff" }}
          >
            <div
              className="card-header text-white text-center"
              style={{
               backgroundColor: '#212529',
                borderTopLeftRadius: "0.375rem",
                borderTopRightRadius: "0.375rem",
              }}
            >
              <h5 className="mb-0">Update Profile</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="form-label"
                    style={{ fontWeight: "600" }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      borderRadius: "10px",
                      padding: "10px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      fontSize: "16px",
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="form-label"
                    style={{ fontWeight: "600" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      borderRadius: "10px",
                      padding: "10px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      fontSize: "16px",
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="form-label"
                    style={{ fontWeight: "600" }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      borderRadius: "10px",
                      padding: "10px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      fontSize: "16px",
                    }}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg rounded-pill"
                    style={{ padding: "10px", fontSize: "18px",backgroundColor: '#212529',borderColor:'#212529' }}
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
