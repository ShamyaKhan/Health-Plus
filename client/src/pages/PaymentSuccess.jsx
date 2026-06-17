import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");
      await axios.post(`${backendUrl}/api/payment/verify-payment`, {
        sessionId,
      });
    };

    verifyPayment();
  }, []);

  return (
    <div>
      <h1>Payment Successful</h1>
    </div>
  );
};

export default PaymentSuccess;
