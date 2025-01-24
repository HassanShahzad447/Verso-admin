import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const AddCategoryModal = ({ newCategory, setNewCategory, handleAddCategory }) => (
    <div className="modal fade" id="addCategoryModal" tabIndex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="addCategoryModalLabel">Add Category</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <input
                        type="text"
                        className="form-control"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter category name"
                    />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleAddCategory}>Add</button>
                </div>
            </div>
        </div>
    </div>
);

export const UpdateCategoryModal = ({ updatedCategoryName, setUpdatedCategoryName, handleCategoryUpdate }) => (
    <div className="modal fade" id="updateCategoryModal" tabIndex="-1" aria-labelledby="updateCategoryModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="updateCategoryModalLabel">Update Category</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <input
                        type="text"
                        className="form-control"
                        value={updatedCategoryName}
                        onChange={(e) => setUpdatedCategoryName(e.target.value)}
                        placeholder="Enter new category name"
                    />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleCategoryUpdate}>Update</button>
                </div>
            </div>
        </div>
    </div>
);

export const DeleteCategoryModal = ({ handleCategoryDelete }) => (
    <div className="modal fade" id="deleteCategoryModal" tabIndex="-1" aria-labelledby="deleteCategoryModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="deleteCategoryModalLabel">Delete Category</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    Are you sure you want to delete this category?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={handleCategoryDelete}>Delete</button>
                </div>
            </div>
        </div>
    </div>
);

