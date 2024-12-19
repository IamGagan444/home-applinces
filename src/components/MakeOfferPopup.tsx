import { motion, AnimatePresence } from "framer-motion";
import { Loader, X } from "lucide-react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useMakeOfferMutation } from "../redux/Api";
import { Product, User } from "../types";
import toast from "react-hot-toast";

interface MakeOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function MakeOfferModal({
  isOpen,
  onClose,
  product,
}: MakeOfferModalProps) {
  const [userData, setUserData] = useState<User>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 const [offeredPrice,setofferedPrice]=useState<string>()
  useEffect(() => {
    const userCookie = Cookies.get("user_cookie");

    if (userCookie) {
      const parsedData = JSON.parse(userCookie);

      setUserData(parsedData?.user);
      setName(parsedData?.user?.email || ""); // Initialize name
      setEmail(parsedData?.user?.email || ""); // Initialize email
    } else {
      console.log("No user data found in cookies.");
    }
  }, []);

  const [offerMaking, { isLoading }] = useMakeOfferMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        productId: product?._id,
        offeredPrice,
        userId: userData?._id,
        BuyerEmail: userData?.email,
        sellerId: product?.sellerId,
      };

      const result:any = await offerMaking(data);
      console.log("Form Data:", result);
      if(result.success ){
        toast.success(`you have make an offer`)
      }
      onClose();
    } catch (error) {
      console.log("error at offer popup");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex justify-between items-start p-6 border-b">
                <h2 className="text-3xl font-serif text-[#464B76]">
                  Make an Offer
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Product Info */}
                <div className="flex gap-4 mb-6">
                  <img
                    src={product?.image}
                    alt={product?.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-[#464B76]">
                      {product?.title}
                    </h3>
                    <p className="text-lg mt-1">(${product?.price})</p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#464B76]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#464B76]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Your Offer<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required 
                      name="offeredPrice"
                      value={offeredPrice}
                      onChange={(e)=>setofferedPrice(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#464B76]"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full py-3 bg-[#464B76] text-white rounded-md font-medium hover:bg-[#363B66] transition-colors mt-6"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    SUBMIT
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
