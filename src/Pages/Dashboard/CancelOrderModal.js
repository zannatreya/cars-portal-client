import React from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";

const CancelOrderModal = ({ deletingOrder, setDeletingOrder, refetch }) => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  // console.log(deletingOrder);

  const handleDelete = (id) => {
    fetch(` https://car-parts-server-six.vercel.app/order/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          logOut();
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.deletedCount) {
          refetch();
          setDeletingOrder(null);
          toast.success(`Order for ${deletingOrder.productName} is canceled`);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="cancel-order-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="cancel-order-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-semibold lg:text-lg text-secondary">
            Canceling order for{" "}
            <span className="font-bold">{deletingOrder.productName}</span> ?
          </h3>
          <p className="py-4">
            Canceled orders will remove from your my order list and you will not
            be able to see this order again.
          </p>
          <div className="modal-action">
            <button
              onClick={() => handleDelete(deletingOrder._id)}
              className="btn btn-error text-white"
            >
              Cancel order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
