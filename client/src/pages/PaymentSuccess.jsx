import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../utils/constants";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const sessionId = searchParams.get("session_id");
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/verify-payment`,
        { sessionId },
      );

      if (data.success) {
        toast.success("Payment successful!");
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div>
      <h1>Verifying Payment...</h1>
    </div>
  );
};

export default PaymentSuccess;
