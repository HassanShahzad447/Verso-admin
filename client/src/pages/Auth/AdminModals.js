import React from 'react';

// Modal for Adding an Admin
export const AddAdminModal = ({ newAdmin, setNewAdmin, handleAddAdmin }) => {
    return (
        <div className="modal fade" id="addAdminModal" tabIndex="-1" aria-labelledby="addAdminModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addAdminModalLabel">Add Admin</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="adminName" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="adminName"
                                    value={newAdmin.name}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="adminEmail" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="adminEmail"
                                    value={newAdmin.email}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="adminPassword" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="adminPassword"
                                    value={newAdmin.password}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleAddAdmin}>Add Admin</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Modal for Updating an Admin
export const UpdateAdminModal = ({ updatedAdminData, setUpdatedAdminData, handleAdminUpdate }) => {
    return (
        <div className="modal fade" id="updateAdminModal" tabIndex="-1" aria-labelledby="updateAdminModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="updateAdminModalLabel">Update Admin</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="updateAdminName" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="updateAdminName"
                                    value={updatedAdminData.name}
                                    onChange={(e) => setUpdatedAdminData({ ...updatedAdminData, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="updateAdminEmail" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="updateAdminEmail"
                                    value={updatedAdminData.email}
                                    onChange={(e) => setUpdatedAdminData({ ...updatedAdminData, email: e.target.value })}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleAdminUpdate}>Update Admin</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Modal for Deleting an Admin
export const DeleteAdminModal = ({ handleAdminDelete }) => {
    return (
        <div className="modal fade" id="deleteAdminModal" tabIndex="-1" aria-labelledby="deleteAdminModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="deleteAdminModalLabel">Delete Admin</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this admin?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={handleAdminDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
