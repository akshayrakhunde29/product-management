import "./App.css";
import { useState, useEffect, useMemo } from "react";
import { initialProducts } from "./config.js";
import Header from "./component/Header.jsx";
import GridView from "./component/GridView.jsx";
import ListView from "./component/ListView.jsx";
import ModelBox from "./component/Model.jsx";
import Pagination from "./component/Pagination.jsx";

const ITEMS_PER_PAGE = 12;

const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [products, debouncedSearchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Product name is required";
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      errors.price = "Valid price is required";
    }

    if (!formData.category.trim()) {
      errors.category = "Category is required";
    }

    if (
      formData.stock !== "" &&
      (isNaN(formData.stock) || parseInt(formData.stock) < 0)
    ) {
      errors.stock = "Stock must be a valid number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: formData.stock ? parseInt(formData.stock) : 0,
      description: formData.description,
      isActive: true,
      tags: [],
      createdAt: new Date().toISOString(),
    };

    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...productData } : p
        )
      );
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: Math.max(...products.map((p) => p.id)) + 1,
      };
      setProducts([...products, newProduct]);
    }

    // Reset form and close modal
    setFormData({
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
    });
    setFormErrors({});
    setShowModal(false);
    setEditingProduct(null);
  };

  // Handle edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      description: product.description || "",
    });
    setFormErrors({});
    setShowModal(true);
  };

  // Handle add new product
  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
    });
    setFormErrors({});
    setShowModal(true);
  };

  // Toggle product active status
  const toggleProductStatus = (productId) => {
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, isActive: !p.isActive } : p
      )
    );
  };

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className={`max-w-7xl mx-auto ${showModal && "fixed w-full"} `}>
        {/* Header */}
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setViewMode={setViewMode}
          viewMode={viewMode}
          handleAddNew={handleAddNew}
        />

        {/* Products Display */}
        <div className="bg-white rounded-lg shadow-sm">
          {paginatedProducts.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 text-lg">No products found</div>
              <p className="text-gray-500 mt-2">
                Try adjusting your search terms
              </p>
            </div>
          ) : (
            <>
              {viewMode === "grid" ? (
                // Grid View
                <GridView
                  paginatedProducts={paginatedProducts}
                  toggleProductStatus={toggleProductStatus}
                  handleEdit={handleEdit}
                />
              ) : (
                // List View
                <ListView
                  paginatedProducts={paginatedProducts}
                  toggleProductStatus={toggleProductStatus}
                  handleEdit={handleEdit}
                />
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  startIndex={startIndex}
                  endIndex={endIndex}
                  filteredProducts={filteredProducts}
                  goToPrevious={goToPrevious}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  goToNext={goToNext}
                  goToPage={goToPage}
                />
              )}
            </>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <ModelBox
            editingProduct={editingProduct}
            handleSubmit={handleSubmit}
            setFormData={setFormData}
            formData={formData}
            formErrors={formErrors}
            setShowModal={setShowModal}
            setEditingProduct={setEditingProduct}
            setFormErrors={setFormErrors}
          />
        )}
      </div>
    </div>
  );
};
export default App;
