"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAddCommentModal, setShowAddCommentModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<{
    id: number;
    name: string;
    category: string;
    price: string;
    stock: number;
  } | null>(null);
  const [newComment, setNewComment] = useState({
    name: "",
    role: "",
    company: "",
    comment: "",
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Cameras",
    price: "",
    stock: 0,
  });

  // Settings state management
  const [settings, setSettings] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [settingsError, setSettingsError] = useState("");

  // Fetch settings from database on mount
  useEffect(() => {
    const fetchSettings = async () => {
      setSettingsLoading(true);
      setSettingsError("");
      try {
        const res = await fetch("/api/settings");
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setSettings({
            companyName: data[0].companyName || "",
            email: data[0].email || "",
            phone: data[0].phone || "",
            address: data[0].address || "",
          });
        }
      } catch (e: any) {
        setSettingsError(e.message || "Error loading settings");
      } finally {
        setSettingsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Sample comments data with state management
  const [recentComments, setRecentComments] = useState([
    {
      id: 1,
      name: "John Smith",
      role: "Security Manager",
      company: "TechCorp",
      comment:
        "Excellent security solutions. The AI detection is incredibly accurate.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "IT Director",
      company: "GlobalBank",
      comment: "Professional service and reliable systems. Highly recommended.",
    },
    {
      id: 3,
      name: "Mike Chen",
      role: "Facility Manager",
      company: "RetailPlus",
      comment: "Great customer support and easy installation process.",
    },
  ]);

  // Sample product data with state management
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Smart Camera Pro",
      category: "Cameras",
      price: "$199",
      stock: 34,
    },
    {
      id: 2,
      name: "Alarm Chip X2",
      category: "Alarms",
      price: "$49",
      stock: 120,
    },
    {
      id: 3,
      name: "RFID Access Panel",
      category: "Access Control",
      price: "$299",
      stock: 12,
    },
    {
      id: 4,
      name: "Motion Sensor Mini",
      category: "Sensors",
      price: "$39",
      stock: 58,
    },
  ]);

  const stats = [
    {
      title: "Total Comments",
      value: recentComments.length.toString(),
      change: "+8%",
      color: "green",
    },
    {
      title: "Total Products",
      value: products.length.toString(),
      change: "+23%",
      color: "purple",
    },
  ];

  // Function to update product quantity
  const updateProductQuantity = (productId: number, newQuantity: number) => {
    setProducts(
      products.map((product) =>
        product.id === productId ? { ...product, stock: newQuantity } : product
      )
    );
  };

  // Function to add new comment
  const handleAddComment = () => {
    if (newComment.name && newComment.comment) {
      const comment = {
        id: recentComments.length + 1,
        ...newComment,
      };
      setRecentComments([comment, ...recentComments]);
      setNewComment({
        name: "",
        role: "",
        company: "",
        comment: "",
      });
      setShowAddCommentModal(false);
    }
  };

  // Function to add new product
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.stock > 0) {
      const product = {
        id: products.length + 1,
        ...newProduct,
        price: newProduct.price.startsWith("$")
          ? newProduct.price
          : `$${newProduct.price}`,
      };
      setProducts([...products, product]);
      setNewProduct({
        name: "",
        category: "Cameras",
        price: "",
        stock: 0,
      });
      setShowAddProductModal(false);
    }
  };

  // Function to handle input changes
  const handleInputChange = (field: string, value: string | number) => {
    setNewComment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function to handle product input changes
  const handleProductInputChange = (field: string, value: string | number) => {
    setNewProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function to handle editing product input changes
  const handleEditProductInputChange = (
    field: string,
    value: string | number
  ) => {
    if (editingProduct) {
      setEditingProduct((prev) =>
        prev
          ? {
              ...prev,
              [field]: value,
            }
          : null
      );
    }
  };

  // Function to start editing a product
  const handleEditProduct = (product: {
    id: number;
    name: string;
    category: string;
    price: string;
    stock: number;
  }) => {
    setEditingProduct({ ...product });
    setShowEditProductModal(true);
  };

  // Function to save edited product
  const handleSaveEditProduct = () => {
    if (
      editingProduct &&
      editingProduct.name &&
      editingProduct.price &&
      editingProduct.stock > 0
    ) {
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id
            ? {
                ...editingProduct,
                price: editingProduct.price.startsWith("$")
                  ? editingProduct.price
                  : `$${editingProduct.price}`,
              }
            : product
        )
      );
      setEditingProduct(null);
      setShowEditProductModal(false);
    }
  };

  // Function to delete a product
  const handleDeleteProduct = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== productId));
    }
  };

  // Add state for editing comment
  const [showEditCommentModal, setShowEditCommentModal] = useState(false);
  const [editingComment, setEditingComment] = useState<any>(null);

  // Function to start editing a comment
  const handleEditComment = (comment: any) => {
    setEditingComment({ ...comment });
    setShowEditCommentModal(true);
  };

  // Function to handle editing comment input changes
  const handleEditCommentInputChange = (
    field: string,
    value: string | number
  ) => {
    if (editingComment) {
      setEditingComment((prev: any) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // Function to save edited comment
  const handleSaveEditComment = () => {
    if (editingComment && editingComment.name && editingComment.comment) {
      setRecentComments(
        recentComments.map((comment) =>
          comment.id === editingComment.id ? { ...editingComment } : comment
        )
      );
      setEditingComment(null);
      setShowEditCommentModal(false);
    }
  };

  // Function to delete a comment
  const handleDeleteComment = (commentId: number) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      setRecentComments(
        recentComments.filter((comment) => comment.id !== commentId)
      );
    }
  };

  // Add submit handlers
  const handleSubmitProducts = async () => {
    try {
      for (const product of products) {
        await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: product.name,
            category: product.category,
            price: parseFloat(product.price.replace("$", "")),
            stock: product.stock,
          }),
        });
      }
      alert("Products submitted to database!");
    } catch (e) {
      alert("Failed to submit products.");
    }
  };

  const handleSubmitComments = async () => {
    try {
      for (const comment of recentComments) {
        await fetch("/api/comments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: comment.name,
            role: comment.role,
            company: comment.company,
            comment: comment.comment,
          }),
        });
      }
      alert("Comments submitted to database!");
    } catch (e) {
      alert("Failed to submit comments.");
    }
  };

  // Function to handle settings input changes
  const handleSettingsInputChange = (field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function to submit settings to database
  const handleSubmitSettings = async () => {
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        alert("Settings saved successfully!");
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (e) {
      alert("Failed to save settings.");
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center bg-${stat.color}-100`}
              >
                <span className={`text-${stat.color}-600 font-semibold`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Only Recent Comments section remains */}
      <div className="grid grid-cols-1 gap-6">
        {/* Recent Comments */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Comments
          </h3>
          <div className="space-y-4">
            {recentComments.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-gray-200 pb-4 last:border-b-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{comment.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  "{comment.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => {
    // Filter products by category
    const cameraProducts = products.filter(
      (p) => p.category.toLowerCase() === "cameras"
    );
    const duutDohioProducts = products.filter(
      (p) => p.category.toLowerCase() === "alarms"
    );

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Products</h3>
          <button
            onClick={() => setShowAddProductModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Product
          </button>
        </div>
        {/* Camera Products */}
        <div className="mb-8">
          <h4 className="text-md font-bold text-blue-700 mb-4">Camera</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cameraProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        value={product.stock}
                        onChange={(e) =>
                          updateProductQuantity(
                            product.id,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {cameraProducts.length === 0 && (
              <div className="text-gray-500 py-4">
                No camera products found.
              </div>
            )}
          </div>
        </div>
        {/* Duut Dohio Products */}
        <div>
          <h4 className="text-md font-bold text-blue-700 mb-4">Duut Dohio</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {duutDohioProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        value={product.stock}
                        onChange={(e) =>
                          updateProductQuantity(
                            product.id,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {duutDohioProducts.length === 0 && (
              <div className="text-gray-500 py-4">
                No duut dohio products found.
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmitProducts}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Submit Products
          </button>
        </div>
      </div>
    );
  };

  const renderComments = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">All Comments</h3>
        <button
          onClick={() => setShowAddCommentModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Comment
        </button>
      </div>
      <div className="space-y-4">
        {recentComments.map((comment) => (
          <div
            key={comment.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  {comment.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{comment.name}</h4>
                  <p className="text-sm text-gray-500">
                    {comment.role} at {comment.company}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="text-blue-600 hover:text-blue-900 text-sm"
                  onClick={() => handleEditComment(comment)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:text-red-900 text-sm"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-700">"{comment.comment}"</p>
          </div>
        ))}
      </div>

      {/* Add Comment Modal */}
      {showAddCommentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Add New Comment
              </h3>
              <button
                onClick={() => setShowAddCommentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={newComment.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="Enter client name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={newComment.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="e.g., Security Manager"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={newComment.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="e.g., TechCorp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment *
                </label>
                <textarea
                  value={newComment.comment}
                  onChange={(e) => handleInputChange("comment", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="Enter client testimonial"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddCommentModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddComment}
                disabled={!newComment.name || !newComment.comment}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Comment Modal */}
      {showEditCommentModal && editingComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Comment
              </h3>
              <button
                onClick={() => {
                  setShowEditCommentModal(false);
                  setEditingComment(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={editingComment.name}
                  onChange={(e) =>
                    handleEditCommentInputChange("name", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={editingComment.role}
                  onChange={(e) =>
                    handleEditCommentInputChange("role", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="e.g., Security Manager"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={editingComment.company}
                  onChange={(e) =>
                    handleEditCommentInputChange("company", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="e.g., TechCorp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment *
                </label>
                <textarea
                  value={editingComment.comment}
                  onChange={(e) =>
                    handleEditCommentInputChange("comment", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="Enter client testimonial"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowEditCommentModal(false);
                  setEditingComment(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditComment}
                disabled={!editingComment.name || !editingComment.comment}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmitComments}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Submit Comments
        </button>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Settings</h3>
      {settingsLoading ? (
        <div className="text-gray-500">Loading settings...</div>
      ) : settingsError ? (
        <div className="text-red-600">{settingsError}</div>
      ) : (
        <div className="space-y-6">
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">
              Company Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) =>
                    handleSettingsInputChange("companyName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    handleSettingsInputChange("email", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) =>
                    handleSettingsInputChange("phone", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) =>
                    handleSettingsInputChange("address", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmitSettings}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-900 ml-2">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              View Site
            </Link>
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } lg:block w-64 bg-white shadow-sm border-r border-gray-200`}
        >
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "dashboard"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                  />
                </svg>
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "products"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4"
                  />
                </svg>
                Products
              </button>
              <button
                onClick={() => setActiveTab("comments")}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "comments"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Comments
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "settings"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && renderDashboard()}
          {activeTab === "products" && renderProducts()}
          {activeTab === "comments" && renderComments()}
          {activeTab === "settings" && renderSettings()}
        </main>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Add New Product
              </h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    handleProductInputChange("name", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    handleProductInputChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                >
                  <option value="Cameras">Camera</option>
                  <option value="Alarms">Duut Dohio</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) =>
                    handleProductInputChange("price", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="e.g., 199 or $199"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  min="1"
                  value={newProduct.stock}
                  onChange={(e) =>
                    handleProductInputChange(
                      "stock",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddProductModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                disabled={
                  !newProduct.name || !newProduct.price || newProduct.stock <= 0
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditProductModal && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Product
              </h3>
              <button
                onClick={() => {
                  setShowEditProductModal(false);
                  setEditingProduct(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    handleEditProductInputChange("name", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={editingProduct.category}
                  onChange={(e) =>
                    handleEditProductInputChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                >
                  <option value="Cameras">Camera</option>
                  <option value="Alarms">Duut Dohio</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="text"
                  value={editingProduct.price}
                  onChange={(e) =>
                    handleEditProductInputChange("price", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="e.g., 199 or $199"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  min="1"
                  value={editingProduct.stock}
                  onChange={(e) =>
                    handleEditProductInputChange(
                      "stock",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowEditProductModal(false);
                  setEditingProduct(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditProduct}
                disabled={
                  !editingProduct.name ||
                  !editingProduct.price ||
                  editingProduct.stock <= 0
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
