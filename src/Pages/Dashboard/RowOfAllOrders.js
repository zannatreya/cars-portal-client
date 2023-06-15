import React, { useState } from "react";
import CancelOrderModal from "./CancelOrderModal";
import { toast } from "react-hot-toast";

const RowOfAllOrders = ({ order, refetch, index }) => {
  const [shipmentLoading, setShipmentLoading] = useState(false);
  const [deletingOrder, setDeletingOrder] = useState(null);

  const handleShipment = (id) => {
    setShipmentLoading(true);
    const orderStatus = {
      emailNotification: order.email,
      shipped: true,
    };
    fetch(`http://localhost:5000/all-order/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        // authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(orderStatus),
    })
      .then((res) => {
        // if (res.status === 403) {
        //   setShipmentLoading(false);
        //   toast.error("Failed to ship order");
        // }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          refetch();
          setShipmentLoading(false);
          toast.success("Order shipped successfully");
        }
      });
  };

  return (
    <>
      <tr key={order._id} className="hover">
        <th>{index + 1}</th>
        <td>{order.productName}</td>
        <td>{order.quantity}</td>
        <td>{order.totalPrice}</td>
        <td className="text-xs">{order.email}</td>
        <td>
          {!order.paid ? (
            <p className="text-sm">Pending</p>
          ) : (
            <p className="text-green-600 font-semibold text-sm">Shipped</p>
          )}
        </td>
        <td>
          <div className="flex justify-center">
            {!order.shipped && (
              <button
                onClick={() => handleShipment(order._id)}
                className={`btn btn-xs btn-primary text-white ${
                  shipmentLoading && "loading"
                }`}
                disabled={!order.transitionId || shipmentLoading}
              >
                Ship now
              </button>
            )}
            {!order.transitionId ? (
              <label
                htmlFor="cancel-order-modal"
                onClick={() => setDeletingOrder(order)}
                className="btn btn-xs btn-link text-secondary"
              >
                Cancel
              </label>
            ) : (
              <p className="text-center text-green-600 font-semibold px-4">
                Paid
              </p>
            )}
          </div>
        </td>
        <td>
          {order.transitionId ? (
            <span className="text-xs">{order.transitionId}</span>
          ) : (
            "Unpaid"
          )}
        </td>
      </tr>
      <div>
        {deletingOrder && (
          <CancelOrderModal
            deletingOrder={deletingOrder}
            setDeletingOrder={setDeletingOrder}
            refetch={refetch}
          />
        )}
      </div>
    </>
  );
};

export default RowOfAllOrders;
