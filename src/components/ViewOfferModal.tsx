import { motion } from "framer-motion";

const ViewOfferModal = ({ isOpen, onClose, offerData }: any) => {
  console.log(offerData);
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg w-3/4 max-w-lg p-6 relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-3xl"
              onClick={onClose}
            >
             X
            </button>
            <h2 className="text-2xl font-bold mb-4">View Offer</h2>
            <div className="flex gap-4">
              <img
                src={offerData?.productId?.image}
                alt={offerData?.productId?.title}
                className="w-32 h-32 object-cover rounded-lg border"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">
                  {offerData?.productId?.title}
                </h3>
                <p className="text-gray-600">
                  (${offerData?.productId?.price})
                </p>
                <p className="mt-2">
                  <strong>Offered Price:</strong> ${offerData?.offeredPrice}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`text-white capitalize ${offerData?.status==="accept"?"bg-green-400":offerData?.status=="reject"?"bg-red-400":""} bg-orange-400 p-1 rounded-lg`}>
                    {offerData?.status}
                  </span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              <strong>Description:</strong> Add any additional details here.
            </p>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ViewOfferModal;
