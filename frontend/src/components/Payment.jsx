import React, { useState } from "react";
import api from "../services/api";

const Payment = ({ ngoId, ngoName, userId, userName = "", userEmail = "" }) => {
  const [amount, setAmount] = useState("");

  const handleDonate = async () => {
    if (!amount || parseInt(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }

    try {
      // 1. Create order
      const { data } = await api.post("/payment/create-order", {
        amount: parseInt(amount),
        ngoId,
        userId,
      });

      const { order, key, paymentId } = data;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "NGO Donation Platform",
        description: `Donation for ${ngoName}`,
        order_id: order.id,

        handler: async function (response) {
          alert("Payment Successful!");

          await api.post("/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            paymentId, // 🔥 IMPORTANT
          });
        },

        prefill: {
          name: userName,
          email: userEmail,
        },

        theme: {
          color: "#f72585",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function () {
        alert("Payment Failed!");
      });

      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Error in payment");
    }
  };

  return (
    <div className="flex gap-4">
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleDonate}>
        Donate Now
      </button>
    </div>
  );
};

export default Payment;