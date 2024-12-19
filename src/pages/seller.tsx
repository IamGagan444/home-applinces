import { motion } from "framer-motion";
import {
  useAcceptOfferMutation,
  useGetOfferQuery,
  useRejectOfferMutation,
} from "../redux/Api";
import { Loader } from "lucide-react";
import Cookies from "js-cookie";

const SellerSide = () => {
  const sellerId = Cookies.get("userId");

  const { data, isLoading } = useGetOfferQuery(sellerId);
  console.log("dat", data);

  const [accept, { isLoading: loading }] = useAcceptOfferMutation();
  const [reject, { isLoading: loadingReject }] = useRejectOfferMutation();

  const acceptOffer = async (offeredPrice: string, offerId: string) => {
    const result = await accept({ sellerId, offerId, offeredPrice });

    console.log("result", result);
  };
  const rejectOffer = async (offerId: string) => {
    const result = await reject({ sellerId, offerId });

    console.log("result", result);
  };

  if (isLoading || loading || loadingReject) {
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
      <h1 className="text-center font-bold text-3xl text-white">Seller side</h1>
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
                onClick={() => acceptOffer(offer.offeredPrice, offer._id)}
              >
                Accept
              </motion.button>
              <motion.button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-blue-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => rejectOffer(offer._id)}
              >
                Reject
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
