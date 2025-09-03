const ModelBox = ({
  editingProduct,
  handleSubmit,
  setFormData,
  formData,
  formErrors,
  setShowModal,
  setEditingProduct,
  setFormErrors,
}) => {
  return (
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center p-10 z-50">
      <div className="bg-white h-full overflow-auto rounded-lg shadow-xl w-full bg-white text-black max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-start text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setFormErrors({});
                }}
                className={`w-full bg-white text-black px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter product name"
              />
              {formErrors.name && (
                <p className="text-red-500 text-start text-sm mt-1">
                  {formErrors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-start text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => {
                  setFormData({ ...formData, price: e.target.value });
                  setFormErrors({});
                }}
                className={`w-full bg-white text-black px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.price ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter price"
              />
              {formErrors.price && (
                <p className="text-red-500 text-start text-sm mt-1">
                  {formErrors.price}
                </p>
              )}
            </div>

            <div>
              <label className="block text-start text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => {
                  setFormData({ ...formData, category: e.target.value });
                  setFormErrors({});
                }}
                className={`w-full bg-white text-black px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Sports">Sports</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home</option>
              </select>
              {formErrors.category && (
                <p className="text-red-500 text-start text-sm mt-1">
                  {formErrors.category}
                </p>
              )}
            </div>

            <div>
              <label className="block text-start text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className={`w-full bg-white text-black px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.stock ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter stock quantity"
              />
              {formErrors.stock && (
                <p className="text-red-500 text-sm mt-1">{formErrors.stock}</p>
              )}
            </div>

            <div>
              <label className="block text-start text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full bg-white text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter product description (optional)"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditingProduct(null);
                  setFormData({
                    name: "",
                    price: "",
                    category: "",
                    stock: "",
                    description: "",
                  });
                  setFormErrors({});
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ModelBox;
