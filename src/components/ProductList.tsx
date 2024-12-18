import React from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAllProductQuery } from '../redux/productApi'
import { addToCart } from '../redux/cartSlice'

const ProductListing: React.FC = () => {
  const { data: products, error, isLoading } = useAllProductQuery()
  const dispatch = useDispatch()
  const navigate = useNavigate() // Hook to navigate programmatically

  if (isLoading) return <div className="text-center mt-8">Loading...</div>
  if (error) return <div className="text-center mt-8">Error: {(error as any).message}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Listing</h1>
      <Link to="/cart" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">View Cart</Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((product) => (
          <motion.div
            key={product._id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-300 mb-4">${product.price}</p>
              <div className="flex justify-between">
                <motion.button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    dispatch(addToCart(product))
                    navigate("/cart") // Navigate to the cart page
                  }}
                >
                  Add to Cart
                </motion.button>
                <motion.button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Make an Offer
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ProductListing
