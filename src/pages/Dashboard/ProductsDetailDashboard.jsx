import { useState, useEffect } from "react";
import { Upload, Check, X, Menu } from "lucide-react";
import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import Calendar from "../../components/Dashboard/Calendar";
import { toast } from "react-toastify";
import { ApiBaseUrl } from "../../lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import { autoLogout, getToken } from "../../hooks/useAuth";
import Spinner from "../../components/loader/spinner";

const sizes = ["S", "M", "L", "XL"];
const colors = ["black", "white"];

const ProductsDetailDashboard = ({ isNew, view, edit }) => {
  const [productId, setProductId] = useState(false);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [status, setStatus] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [regPrice, setRegPrice] = useState("");
  const [salesPrice, setSalesPrice] = useState("");

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const token = getToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(categories);
  console.log(category);

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);

    // Prepare API call
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("files", files[0]); // Only uploading the first image for now

    try {
      const response = await fetch(
        `${ApiBaseUrl}/images/upload-image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // Do not set Content-Type — browser will automatically set it for FormData
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (!response.ok) {
        console.error("Upload failed:", result);
      } else {
        const imageDetails = result.urls.map((url, index) => {
          return {
            assetId: url.asset_id,
            publicId: url.public_id,
            imageUrl: url.imageurl,
            isFrontSide: index == 0 ? true : false,
          };
        });
        console.log(imageDetails, "imageDetails");
        setImages((prev) => [...prev, ...imageDetails]);
        console.log("Upload successful:", result);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    // Maintain original UI behavior
    setTimeout(() => {
      setUploading(false);
      setPreviewImage(URL.createObjectURL(files[0]));
    }, 1000);

    setStatus(true);

    setTimeout(() => {
      setStatus(false);
    }, 2000);
  };

  const handleTagInputChange = (event) => setTagInput(event.target.value);

  const handleTagKeyPress = (event) => {
    if (event.key === "Enter" && tagInput.trim() !== "") {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
      event.preventDefault();
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/product/getAllCategory`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const { data } = await response.json();
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error.message);
      return null;
    }
  };
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(
          ApiBaseUrl + "/product/getProductById?productId=" + params.id,
          {
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        const product = result.data;
        setProductId(product?._id);
        setName(product?.name);
        setDescription(product?.description);
        setCategory(product?.categoryDetails?.categoryName);
        setSelectedColors(product?.colors);
        setSelectedSizes(product?.sizes);
        setTags(product?.tags);
        setRegPrice(product?.regPrice);
        setSalesPrice(product?.salesPrice);
        setQuantity(product?.quantity);
        setPreviewImage(product?.images[0]?.imageUrl);

        console.log(result);
        if (result.msg === "Session Expired") {
          autoLogout();
        }
        if (!response.ok) throw new Error("Network response was not ok");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    if (!isNew) {
      fetchProducts();
    }
    fetchCategories()
  }, [params.id, token, isNew]);

  const addProduct = async () => {
    setIsAdding(true);
    try {
      // Get the selected category ID from the category name
      const selected = categories.find((cat) => cat.categoryName === category);
      if (!selected) {
        toast.error("Invalid category selected");
        return;
      }

      const selectedCategory = selected._id;
      const response = await fetch(`${ApiBaseUrl}/product/addProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          quantity,
          regPrice,
          salesPrice,
          tags,
          categoryID: selectedCategory,
          images,
          sizes: selectedSizes,
          colors: selectedColors,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Product added successfully!");
        navigate(0);
        // Optionally clear form fields here
      } else {
        toast.error(result?.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Add Product Error:", error);
      toast.error("Something went wrong while adding the product.");
    } finally {
      setIsAdding(false);
    }
  };

  const updateProduct = async () => {
    setIsUpdating(true);
    try {
      // Get the selected category ID from the category name
      const selected = categories.find((cat) => cat.categoryName === category);
      if (!selected) {
        toast.error("Invalid category selected");
        return;
      }

      const selectedCategory = selected._id;
      const response = await fetch(`${ApiBaseUrl}/product/updateProduct`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          name,
          description,
          quantity,
          regPrice,
          salesPrice,
          tags,
          categoryID: selectedCategory,
          images,
          sizes: selectedSizes,
          colors: selectedColors,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Product updated successfully!");
        navigate(0);
        // Optionally clear form fields here
      } else {
        toast.error(result?.message || "Failed to update product.");
      }
    } catch (error) {
      console.error("Update Product Error:", error);
      toast.error("Something went wrong while updating the product.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="p-2 rounded-md"
        >
          <Menu />
        </button>
      </div>
      {showSidebar && (
        <div className="fixed inset-0 z-40  bg-opacity-40">
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 bg-[#E7E7E3] overflow-y-auto">
        <div className="sticky top-0 z-10">
          <Header />
        </div>
        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-500 text-sm text-center ">{error}</p>
        ) : (
          <>
            <Calendar calendar={true} title={"Product Details"} status={true} />
            <div className="p-6">
              <div className="flex-1">
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col lg:flex-row gap-6">
                  {/* Left Section */}
                  <div className="w-full lg:w-2/3">
                    <div className="mb-4">
                      <label className="block text-[#232321] mb-3 font-[Rubik] font-semibold text-[20px]">
                        Product Name
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="w-full py-[10px] px-4 border rounded-[8px] border-[#232321]"
                        placeholder="Lorem Ipsum"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-[#232321] mb-3 font-[Rubik] font-semibold text-[20px]">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded-md font-[Inter] text-[16px] text-[#1F1A24]"
                        rows="8"
                      ></textarea>
                    </div>

                    <div className="mb-4">
                      <label className="block text-[#232321] mb-3 font-[Rubik] font-semibold text-[20px]">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border rounded-md font-[Inter] text-[16px] text-[#1F1A24]"
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat.categoryName}>
                            {cat.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {!isNew && (
                        <div>
                          <label className="block text-[#232321] mb-3 font-[Rubik] font-semibold text-[20px]">
                            Product ID
                          </label>
                          <input
                            type="text"
                            value={productId}
                            disabled
                            className="w-full p-2 border rounded-md font-[Inter] text-[16px] text-[#1F1A24]"
                            placeholder="#32A53"
                          />
                        </div>
                      )}
                      <div>
                        <label className="block text-[#232321] mb-3 font-[Rubik] font-semibold text-[20px]">
                          Stock Quantity
                        </label>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="w-full p-2 border rounded-md font-[Inter] text-[16px] text-[#1F1A24]"
                          placeholder="211"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-[#232321] mb-3 font-[Rubik] font-semibold text-[20px]">
                          Regular Price
                        </label>
                        <input
                          type="text"
                          value={regPrice}
                          onChange={(e) => setRegPrice(e.target.value)}
                          className="w-full p-2 border rounded-md font-[Inter] text-[16px] text-[#1F1A24]"
                          placeholder="110.40 PKR"
                        />
                      </div>
                      <div>
                        <label className="block text-[#232321] mb-3 font-[Rubik] font-semibold text-[20px]">
                          Sale Price
                        </label>
                        <input
                          type="text"
                          value={salesPrice}
                          onChange={(e) => setSalesPrice(e.target.value)}
                          className="w-full p-2 border rounded-md font-[Inter] text-[16px] text-[#1F1A24]"
                          placeholder="450PKR"
                        />
                      </div>
                    </div>

                    {/* Sizes */}
                    <div className="mt-4">
                      <label className="block text-[#232321] mb-3 font-[Rubik] font-semibold text-xl">
                        Select Sizes:
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {sizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => toggleSize(size)}
                            className={`px-4 py-1 border rounded cursor-pointer ${
                              selectedSizes.includes(size)
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-800 border-gray-300"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Colors */}
                    <div className="mt-4">
                      <label className="block text-[#232321] mb-3 font-[Rubik] font-semibold text-xl">
                        Select Colors:
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {colors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => toggleColor(color)}
                            className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                              selectedColors.includes(color)
                                ? "ring-2 ring-offset-1 ring-blue-500"
                                : "opacity-80"
                            }`}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Output */}
                    <div className="mt-4 text-sm text-gray-700">
                      <p>
                        <strong>Selected Sizes:</strong>{" "}
                        {selectedSizes.join(", ") || "None"}
                      </p>
                      <p>
                        <strong>Selected Colors:</strong>{" "}
                        {selectedColors.join(", ") || "None"}
                      </p>
                    </div>

                    <div className="mt-4">
                      <label className="block text-[#232321] mb-3 font-[Rubik] font-semibold text-[20px]">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                          >
                            {tag}
                            <X
                              className="w-4 h-4 cursor-pointer text-red-600"
                              onClick={() => removeTag(index)}
                            />
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        className="w-full p-4 border rounded-md mt-2 font-[Inter] text-[16px] text-[#1F1A24]"
                        placeholder="Press Enter to add a tag"
                        value={tagInput}
                        onChange={handleTagInputChange}
                        onKeyDown={handleTagKeyPress}
                      />
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="w-full lg:w-1/3">
                    {previewImage && (
                      <div className="h-96 bg-gray-200 rounded-md flex items-center justify-center mb-4">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="max-h-full max-w-full object-contain rounded-md"
                        />
                      </div>
                    )}
                    {!view && (
                      <label className="border border-dashed p-6 rounded-md text-center text-gray-600 cursor-pointer block">
                        <Upload className="w-12 h-12 mx-auto text-gray-400" />
                        <p className="mt-2">Drop your image here, or browse</p>
                        <p className="text-xs">JPEG, PNG are allowed</p>
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}

                    {uploading && (
                      <div className="mt-2 bg-yellow-100 text-yellow-700 p-2 rounded-md text-center text-sm">
                        Uploading...
                      </div>
                    )}

                    <div className="mt-4 space-y-2">
                      {status &&
                        images.map((img, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-gray-100 p-2 rounded-md"
                          >
                            <img
                              src={img}
                              alt="Uploaded"
                              className="w-10 h-10 object-cover rounded-md"
                            />
                            <p className="ml-3 flex-1 text-gray-700">
                              Image {index + 1}
                            </p>
                            <Check className="text-green-600 w-5 h-5" />
                          </div>
                        ))}
                    </div>

                    {!view && (
                      <div className="flex flex-col gap-y-2 sm:flex-row sm:space-x-2 mt-6 justify-end ">
                        <button
                          disabled={isAdding || isUpdating}
                          className="px-5 py-2 border border-gray-400 text-gray-600 rounded-md cursor-pointer"
                        >
                          CANCEL
                        </button>
                        {edit && (
                          <button
                            onClick={updateProduct}
                            disabled={isUpdating}
                            className="flex-1 px-5 py-2 bg-black text-white rounded-md cursor-pointer disabled:bg-black/70"
                          >
                            {isUpdating ? "UPDATING.." : "UPDATE"}
                          </button>
                        )}
                        {isNew && (
                          <button
                            onClick={addProduct}
                            disabled={isAdding}
                            className="flex-1 px-5 py-2 bg-green-600 text-white rounded-md cursor-pointer disabled:opacity-55"
                          >
                            {isAdding ? "ADDING.." : "ADD"}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductsDetailDashboard;
