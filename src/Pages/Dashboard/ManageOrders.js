import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import PageLoading from "../../Pages/Shared/PageLoading";
import RowOfAllOrders from "./RowOfAllOrders";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";

const ManageOrders = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("orders", () =>
    fetch(" https://car-parts-server-six.vercel.app/all-order", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        logOut();
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
      return res.json();
    })
  );
  if (isLoading) {
    return <PageLoading />;
  }
  return (
    <section className="bg-slate-100 p-4 lg:p-8 h-screen overflow-scroll w-full">
      {orders && (
        <div>
          <div className="flex justify-between mb-5">
            <h1 className="text-xl font-semibold ">Manage All Orders</h1>
            <p className="text-sm">N.B: New orders will shown first</p>
          </div>
          <div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Customer Email</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                    <th>Trans id</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order, index) => (
                    <RowOfAllOrders
                      key={order._id}
                      order={order}
                      refetch={refetch}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageOrders;
