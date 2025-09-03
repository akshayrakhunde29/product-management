import { Edit3, Eye, EyeOff } from "lucide-react";

const GridView = ({ paginatedProducts, toggleProductStatus, handleEdit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {paginatedProducts.map((product) => (
        <div
          key={product.id}
          className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
                {product.name}
              </h3>
              <button
                onClick={() => toggleProductStatus(product.id)}
                className={`p-1 rounded-full transition-colors ${
                  product.isActive
                    ? "text-green-600 hover:bg-green-50"
                    : "text-gray-400 hover:bg-gray-50"
                }`}
              >
                {product.isActive ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">
                  ₹{product.price}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.stock > 10
                      ? "bg-green-100 text-green-800"
                      : product.stock > 0
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  Stock: {product.stock}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {product.category}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    product.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {product.description && (
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {product.description}
              </p>
            )}

            <button
              onClick={() => handleEdit(product)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default GridView;
