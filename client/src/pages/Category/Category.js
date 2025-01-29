import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory, getCategories, updateCategory, deleteCategory } from '../../services/categoryService';
import { AddCategoryModal, UpdateCategoryModal, DeleteCategoryModal } from './CategoryModals';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit] = useState(4);
    const [newCategory, setNewCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null); 
    const [updatedCategoryName, setUpdatedCategoryName] = useState(''); 
    const [categoryToDelete, setCategoryToDelete] = useState(null); 
    const backendURL = process.env.REACT_APP_BackendURL;

    const fetchCategories = async () => {
        const result = await getCategories();
        if (result.success) {
            setCategories(result.categories);
            setTotalPages(Math.ceil(result.categories.length / limit)); // Update total pages based on fetched categories
        } else {
            toast.error(result.message);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        if (!newCategory) {
            toast.warning('Please enter a category name');
            return;
        }

        const result = await addCategory(newCategory);
        if (result.success) {
            await fetchCategories();
            setNewCategory('');
            toast.success('Category added successfully');
        } else {
            toast.error(result.message);
        }
    };

    const handleUpdate = (categoryId, categoryName) => {
        setSelectedCategory(categoryId);
        setUpdatedCategoryName(categoryName);
        const updateModal = new window.bootstrap.Modal(document.getElementById('updateCategoryModal'));
        updateModal.show();
    };

    const handleCategoryUpdate = async () => {
        const result = await updateCategory(selectedCategory, updatedCategoryName);
        if (result.success) {
            setCategories(categories.map(cat => cat._id === selectedCategory ? { ...cat, name: updatedCategoryName } : cat));
            toast.success('Category updated successfully');
        } else {
            toast.error(result.message);
        }
    };

    const handleDelete = (categoryId) => {
        setCategoryToDelete(categoryId);
        const deleteModal = new window.bootstrap.Modal(document.getElementById('deleteCategoryModal'));
        deleteModal.show();
    };

    const handleCategoryDelete = async () => {
        const result = await deleteCategory(categoryToDelete);
        if (result.success) {
            setCategories(categories.filter(cat => cat._id !== categoryToDelete));
            toast.success('Category deleted successfully');
        } else {
            toast.error(result.message);
        }
    };

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCategories = categories.slice(startIndex, endIndex);

    return (
        <div className="text-center">
            <ToastContainer />
            <div className="p-4 pt-5">
                <div className="card shadow">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Categories</h5>
                        <button
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#addCategoryModal"
                        >
                            Add Category
                        </button>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Category</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {paginatedCategories.map((category, index) => (
    category ? (
        <tr key={category._id}>
            <td>{startIndex + index + 1}</td>
            <td>{category.name}</td>
            <td>
                <button
                    className="view-button"
                    onClick={() => handleUpdate(category._id, category.name)}
                >
                    Update
                </button>
                <button
                    className="view-button"
                    onClick={() => handleDelete(category._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    ) : null
))}
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-start">
                                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
                                        disabled={page === 1}
                                    >
                                        Previous
                                    </button>
                                </li>
                                <span>
                                    Page {page} of {totalPages}
                                </span>
                                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage))}
                                        disabled={page === totalPages}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <AddCategoryModal 
                newCategory={newCategory} 
                setNewCategory={setNewCategory} 
                handleAddCategory={handleAddCategory} 
            />
            <UpdateCategoryModal 
                updatedCategoryName={updatedCategoryName} 
                setUpdatedCategoryName={setUpdatedCategoryName} 
                handleCategoryUpdate={handleCategoryUpdate} 
            />
            <DeleteCategoryModal 
                handleCategoryDelete={handleCategoryDelete} 
            />
        </div>
    );
};

export default Category;
