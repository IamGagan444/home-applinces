import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart, ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery, useViewOfferMutation } from "../redux/Api";
import MakeOfferModal from "../components/MakeOfferPopup";
import Cookies from "js-cookie";
import ViewOfferModal from "../components/ViewOfferModal";

export default function ProductDetails() {
 
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [offerData, setOfferData] = useState(null);

  const { productId } = useParams();
  const userId = Cookies.get("userId");

  const { data: product, isLoading } = useGetProductByIdQuery(productId);
  const [postData, { isLoading: loading }] = useViewOfferMutation();

  useEffect(() => {
    (async () => {
      try {
        const result = await postData({ productId, userId }).unwrap();
        setOfferData(result.data);
      } catch (error) {
        console.error("Error fetching offer data:", error);
      }
    })();
  }, [postData, productId, userId]);



  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 my-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <div className="relative">
            <motion.div
              className="relative aspect-[4/3] overflow-hidden rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
               
                src={product?.data?.image}
                alt={product?.data?.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />

              {/* Navigation Arrows */}
              <button
               
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
              
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            </motion.div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl text-[#464B76] font-serif leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {product?.data?.title}
              </motion.h1>

              <motion.button
                className="bg-[#B8C7E0] rounded-full p-3 hover:bg-[#9FB3D5] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`w-6 h-6 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`}
                />
              </motion.button>
            </div>

            <motion.p
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Location: Stamford, CT
            </motion.p>

            <motion.div
              className="text-4xl md:text-5xl text-[#6B8E5F] font-semibold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {product?.data?.offeredPrice?product?.data?.offeredPrice:product?.data?.price}
            </motion.div>

            <div className="space-y-4">
              <motion.button
                className="w-full py-4 bg-[#464B76] text-white rounded-lg font-semibold hover:bg-[#363B66] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                ADD TO CART
              </motion.button>

              <motion.button
                className="w-full py-4 bg-[#516280] text-white rounded-lg font-semibold hover:bg-[#9FB3D5] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                onClick={() => setIsOfferModalOpen(true)}
              >
                MAKE AN OFFER
              </motion.button>

              {offerData && (
                <motion.button
                  className="w-full py-4 bg-[#7ca3e7] text-white rounded-lg font-semibold hover:bg-[#9FB3D5] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  onClick={() => setIsViewModalOpen(true)}
                >
                  VIEW OFFER
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      <MakeOfferModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        product={product?.data}
      />
      <ViewOfferModal
      isOpen={isViewModalOpen}
      onClose={() => setIsViewModalOpen(false)}
      offerData={offerData}/>
    </>
  );
}
