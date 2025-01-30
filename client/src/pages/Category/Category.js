import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";
import {
  AddCategoryModal,
  UpdateCategoryModal,
  DeleteCategoryModal,
} from "./CategoryModals";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(4);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const backendURL = process.env.REACT_APP_BackendURL;

  const fetchCategories = async () => {
    const result = await getCategories();
    if (result.success) {
      setCategories(result.categories);
      setTotalPages(Math.ceil(result.categories.length / limit)); 
    } else {
      toast.error(result.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory) {
      toast.warning("Please enter a category name");
      return;
    }

    const result = await addCategory(newCategory);
    if (result.success) {
      await fetchCategories();
      setNewCategory("");
      toast.success("Category added successfully");
    } else {
      toast.error(result.message);
    }
  };
  const handleUpdate = (categoryId, categoryName) => {
    setSelectedCategory(categoryId);
    setUpdatedCategoryName(categoryName);
    const updateModal = new window.bootstrap.Modal(
      document.getElementById("updateCategoryModal")
    );
    updateModal.show();
  };
  const handleCategoryUpdate = async () => {
    const result = await updateCategory(selectedCategory, updatedCategoryName);
    if (result.success) {
      setCategories(
        categories.map((cat) =>
          cat._id === selectedCategory
            ? { ...cat, name: updatedCategoryName }
            : cat
        )
      );
      toast.success("Category updated successfully");
    } else {
      toast.error(result.message);
    }
  };
  const handleDelete = (categoryId) => {
    setCategoryToDelete(categoryId);
    const deleteModal = new window.bootstrap.Modal(
      document.getElementById("deleteCategoryModal")
    );
    deleteModal.show();
  };
  const handleCategoryDelete = async () => {
    const result = await deleteCategory(categoryToDelete);
    if (result.success) {
      setCategories(categories.filter((cat) => cat._id !== categoryToDelete));
      toast.success("Category deleted successfully");
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
          <div
            className="card-header d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#212529", color: "white" }}
          >
            <h5 className="mb-0" style={{ fontSize: "1rem" }}>
              Categories
            </h5>
            <button
              className="btn btn-light"
              data-bs-toggle="modal"
              data-bs-target="#addCategoryModal"
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              style={{
                fontSize: "0.8rem",
                padding: "5px 10px",
              }}
            >
              Add Category
            </button>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCategories.map((category, index) =>
                    category ? (
                      <tr key={category._id}>
                        <td>{startIndex + index + 1}</td>
                        <td>{category.name}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() =>
                              handleUpdate(category._id, category.name)
                            }
                            style={{ transition: "transform 0.3s ease" }}
                            onMouseEnter={(e) =>
                              (e.target.style.transform = "scale(1.1)")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.transform = "scale(1)")
                            }
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(category._id)}
                            style={{ transition: "transform 0.3s ease" }}
                            onMouseEnter={(e) =>
                              (e.target.style.transform = "scale(1.1)")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.transform = "scale(1)")
                            }
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>

            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${page === 1 ? "disabled" : ""}`}
                  style={{
                    margin: "0 10px",
                    cursor: page === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setPage((prevPage) => Math.max(prevPage - 1, 1))
                    }
                    disabled={page === 1}
                    style={{
                      backgroundColor: "#212529",
                      borderColor: "#212529",
                      
                      color: "#fff",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#0056b3")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#007bff")
                    }
                  >
                    <i className="fas fa-arrow-left"></i>{" "}
                  </button>
                </li>
                <li className="page-item" style={{ margin: "0 10px" }}>
                  <span
                    className="page-link page-indicator"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#212529",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#0056b3")}
                    onMouseLeave={(e) => (e.target.style.color = "#007bff")}
                  >
                    Page {page} of {totalPages}
                  </span>
                </li>
                <li
                  className={`page-item ${
                    page === totalPages ? "disabled" : ""
                  }`}
                  style={{
                    margin: "0 10px",
                    cursor: page === totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setPage((prevPage) =>
                        prevPage < totalPages ? prevPage + 1 : prevPage
                      )
                    }
                    disabled={page === totalPages}
                    style={{
                      backgroundColor: "#212529",
                      borderColor: "#212529",
                      color: "#fff",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#0056b3")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#007bff")
                    }
                  >
                    <i className="fas fa-arrow-right"></i>{" "}
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
      <DeleteCategoryModal handleCategoryDelete={handleCategoryDelete} />
    </div>
  );
};
export default Category;
