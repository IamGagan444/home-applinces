import React from "react";
import { motion } from "framer-motion";
import { useGetOfferQuery } from "../redux/Api";
import { Loader } from "lucide-react";
import Cookies from "js-cookie";
interface Product {
  _id: string;
  title: string;
  image: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  sellerId: string;
}

interface Offer {
  _id: string;
  userId: string;
  productId: Product;
  sellerId: string;
  offeredPrice: string;
  BuyerEmail: string;
  __v: number;
}

interface ApiResponse {
  statusCode: number;
  message: string;
  data: Offer[];
  success: boolean;
}

const SellerSide = () => {
  const sellerId = Cookies.get("userId");

  const { data, isLoading } = useGetOfferQuery(sellerId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }
  if (data?.data?.length == 0) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-white text-2xl font-bold">
        You are not a seller!
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
      {data?.data?.map((offer: any) => (
        <motion.div
          key={offer._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={offer.productId.image}
            alt={offer.productId.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {offer.productId.title}
            </h2>
            <p className="text-gray-600 mt-2">
              Original Price: ${offer.productId.price}
            </p>
            <p className="text-gray-600">
              Offered Price: ${offer.offeredPrice}
            </p>
            <p className="text-gray-600">Buyer Email: {offer.BuyerEmail}</p>
           <div className="flex items-center justify-around capitalize">
           <motion.button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             Accept
            </motion.button>
            <motion.button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             Reaject
            </motion.button>
            <motion.button
              className="mt-4 px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             Counter
            </motion.button>
           </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SellerSide;
