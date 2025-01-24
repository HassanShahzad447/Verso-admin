const BASE_URL = process.env.REACT_APP_BackendURL;

const getCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/categories/getallcategories`);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch categories");
      }
  
      return { success: true, categories: data.categories };
    } catch (error) {
      console.error("Error in getCategories function:", error.message);
      return { success: false, message: error.message };
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/categories/${categoryId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Failed to delete category" };
      }
  
      return { success: true };
    } catch (error) {
      console.error("Error in deleteCategory function:", error.message);
      return { success: false, message: "An error occurred while deleting the category" };
    }
  };
  
  
  const updateCategory = async (categoryId, categoryName) => {
    try {
      const response = await fetch(`${BASE_URL}/api/categories/${categoryId}`, {
        method: "PUT",
        body: JSON.stringify({ name: categoryName }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Failed to update category" };
      }
  
      return { success: true };
    } catch (error) {
      console.error("Error in updateCategory function:", error.message);
      return { success: false, message: "An error occurred while updating the category" };
    }
  };
  
  
  const addCategory = async (categoryName) => {
    try {
      const response = await fetch(`${BASE_URL}/api/categories`, {
        method: "POST",
        body: JSON.stringify({ name: categoryName }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Failed to add category" };
      }
  
      return { success: true };
    } catch (error) {
      console.error("Error in addCategory function:", error.message);
      return { success: false, message: "An error occurred while adding the category" };
    }
  };
  
  
  export{ getCategories,deleteCategory,updateCategory,addCategory };