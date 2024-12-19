import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useAllProductQuery, useAddToCartMutation } from "../redux/Api";
import { addToCart } from "../redux/cartSlice";
import { RootState } from "../redux/store";
import { Loader } from "lucide-react";

const ProductListing: React.FC = () => {
  const { data: products, error, isLoading } = useAllProductQuery();
  const [addToCartMutation] = useAddToCartMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, isAuthenticated }:any = useSelector(
    (state: RootState) => state.auth
  );

  const handleAddToCart = async (product: any) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your cart");
      navigate("/login");
      return;
    }

    try {
      const result = await addToCartMutation({
        productId: product._id,
        userId,
      }).unwrap();
      if (result.success) {
        dispatch(addToCart(product));
        toast.success(`${product.title} added to cart!`);
        navigate("/cart");
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      toast.error("An error occurred while adding to cart");
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen bg-gray-900">
  <Loader className="animate-spin text-indigo-500" size={48} />
</div>
  if (error)
    return (
      <div className="text-center mt-8">Error: {(error as any).message}</div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Listing</h1>
      <div className="flex justify-between items-center mb-4">
       
        {isAuthenticated ? (
          <span>Welcome, User ID: {userId}</span>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Login
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((product) => (
          <motion.div
            key={product._id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover cursor-pointer"
              onClick={() => navigate(`/product-details/${product?._id}`)}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-white">{product.title}</h2>
              <p className="text-gray-300 mb-4">${product.price}</p>
         
                <motion.button
                  className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </motion.button>
               
             
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
