import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import actGetOrders from "../../src/store/orders/act/actGetOrders";
import Heading from "../../src/component/shared/Heading/Heading";
// import { FaEye } from "react-icons/fa";
export default function Orders() {
  const dispatch = useAppDispatch();
  const userOrder = useAppSelector((state) => state.orders.orderList);
  useEffect(() => {
    dispatch(actGetOrders());
  }, [dispatch]);
  const orders = Array.isArray(userOrder) ? userOrder : [];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8 rounded-lg">
      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-8">
        <Heading>My Orders</Heading>
        <p className="mt-4 text-lg text-gray-600">
          Here are all your recent orders.
        </p>
      </div>

      {/* Orders Table */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((el) => (
              <tr
                key={el.id}
                className="hover:bg-gray-50 transition duration-300"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{el.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex">
                  {el.items.length} items {""}{" "}
                  {/* <span className="ml-2">
  <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center space-x-1 text-sm">
    <FaEye className="inline-block" /> 
    <span>Product Details</span>
  </button>
</span> */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${el.subtotal.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
