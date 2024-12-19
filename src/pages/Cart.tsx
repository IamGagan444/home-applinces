import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { removeFromCart } from '../redux/cartSlice'
import { Product } from '../types'
import { useGetAllCartProductQuery, useRemoveCartProductMutation } from '../redux/Api'
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'



const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items)
  const userId=useSelector((state:RootState)=>state.auth.userId)
  const dispatch = useDispatch()

  const totalPrice = cart.reduce((sum:number, item:Product) => sum + parseFloat(item.price), 0)
  const { data, error, isLoading } = useGetAllCartProductQuery(userId, {
    skip: !userId, // Skip the query if userId is falsy
  });
// console.log([{...data.data,cart}])
  const [removeProduct,{isLoading:Loading}]=useRemoveCartProductMutation()

const carts=data?.data

const deleteProduct=async(productId:string)=>{
  dispatch(removeFromCart(productId))
const result= await removeProduct({userId,productId})
if(result.success){
  toast.error("product reomved")
}
}

if(isLoading||Loading){
  return <div className="flex items-center justify-center min-h-screen bg-gray-900">
  <Loader className="animate-spin text-indigo-500" size={48} />
</div>
}



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Back to Products</Link>
      {carts?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {carts?.map((item:Product) => (
            <motion.div
              key={item._id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-4 p-4 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <img src={item.image} alt={item.title} className="w-24 h-24 object-cover mr-4" />
              <div className="flex-grow">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-300">${item.price}</p>
              </div>
              <motion.button
                className="bg-red-500 text-white px-4 py-2 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => deleteProduct(item._id)}
              >
                Remove
              </motion.button>
            </motion.div>
          ))}
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart

