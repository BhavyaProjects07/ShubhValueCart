"use client"
import { useEffect, useState } from "react"
import Loading from "@/components/Loading"
import { useAuth } from "@clerk/nextjs"
import toast from "react-hot-toast"
import axios from "axios"

export default function StoreOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { getToken } = useAuth()

  // ✅ FILTER STATE (NEW)
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    paymentMethod: "",
    isPaid: "",
    coupon: false,
    minTotal: "",
    maxTotal: "",
    startDate: "",
    endDate: "",
    sort: "latest",
  })

  // ✅ QUERY BUILDER
  const buildQuery = () => {
    const params = new URLSearchParams()

    if (filters.search) params.append("search", filters.search)
    if (filters.status) params.append("status", filters.status)
    if (filters.paymentMethod) params.append("paymentMethod", filters.paymentMethod)
    if (filters.isPaid) params.append("isPaid", filters.isPaid)
    if (filters.coupon) params.append("coupon", "true")
    if (filters.minTotal) params.append("minTotal", filters.minTotal)
    if (filters.maxTotal) params.append("maxTotal", filters.maxTotal)
    if (filters.startDate) params.append("startDate", filters.startDate)
    if (filters.endDate) params.append("endDate", filters.endDate)
    if (filters.sort) params.append("sort", filters.sort)

    return params.toString()
  }

  // ✅ UPDATED FETCH (ONLY CHANGE)
  const fetchOrders = async () => {
    try {
      const token = await getToken()

      const { data } = await axios.get(
        `/api/store/orders?${buildQuery()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setOrders(data.orders)

    } catch (error) {
      toast.error(error?.response?.data?.error || error.mesage)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = await getToken()

      await axios.post(
        "/api/store/orders",
        { orderId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      )

      toast.success("Order status updated")
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
    }
  }

  const openModal = (order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedOrder(null)
    setIsModalOpen(false)
  }

  // ✅ FETCH ON FILTER CHANGE
  useEffect(() => {
    fetchOrders()
  }, [filters])

  if (loading) return <Loading />

  return (
    <>
      <h1 className="text-2xl text-[#9a8978] mb-5">
        Store <span className="text-[#6b5d52] font-medium">Orders</span>
      </h1>

      {/* 🔥 FILTER BAR (NEW) */}
      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">

        <input
          placeholder="Search order / user..."
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="ORDER_PLACED">Placed</option>
          <option value="SHIPPED">Shipped</option>
          <option value="OUT_OF_DELIVERY">Out for delivery</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}
        >
          <option value="">All Payments</option>
          <option value="COD">COD</option>
          <option value="ONLINE">Online</option>
        </select>

        <select
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, isPaid: e.target.value })}
        >
          <option value="">Paid Status</option>
          <option value="true">Paid</option>
          <option value="false">Unpaid</option>
        </select>

        <input
          type="number"
          placeholder="Min Total"
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, minTotal: e.target.value })}
        />

        <input
          type="number"
          placeholder="Max Total"
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, maxTotal: e.target.value })}
        />

        <input
          type="date"
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        />

        <input
          type="date"
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="latest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="total_high_low">High → Low</option>
          <option value="total_low_high">Low → High</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={(e) =>
              setFilters({ ...filters, coupon: e.target.checked })
            }
          />
          Coupon Applied
        </label>

      </div>

      {/* ✅ ORIGINAL TABLE (UNCHANGED) */}
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="overflow-x-auto max-w-4xl rounded-md shadow border border-[#ede6dd]">
          <table className="w-full text-sm text-left text-[#6b5d52]">
            <thead className="bg-[#f0e8e0] text-[#6b5d52] text-xs uppercase tracking-wider">
              <tr>
                {["Sr. No.", "Customer", "Total", "Payment", "Coupon", "Status", "Date"].map((heading, i) => (
                  <th key={i} className="px-4 py-3">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#ede6dd]">
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className="hover:bg-[#fefdfb] cursor-pointer"
                  onClick={() => openModal(order)}
                >
                  <td className="pl-6">{index + 1}</td>
                  <td className="px-4 py-3">{order.user?.name}</td>
                  <td className="px-4 py-3 font-medium">₹{order.total}</td>
                  <td className="px-4 py-3">{order.paymentMethod}</td>

                  <td className="px-4 py-3">
                    {order.couponId ? (
                      <span className="bg-[#ede6dd] text-xs px-2 py-1 rounded-full">
                        {order.coupon.code}
                      </span>
                    ) : "—"}
                  </td>

                  <td
                    className="px-4 py-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      disabled={order.status === "CANCELLED"}
                      className="border rounded-md text-sm bg-white"
                    >
                      <option value="ORDER_PLACED">ORDER PLACED</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="OUT_OF_DELIVERY">OUT FOR DELIVERY</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>

                  <td className="px-4 py-3 text-[#9a8978]">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ MODAL (UNCHANGED) */}
      {isModalOpen && selectedOrder && (
        <div
          onClick={closeModal}
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#fefdfb] rounded-lg shadow-lg max-w-2xl w-full p-6 border"
          >
            <h2 className="text-xl font-semibold mb-4 text-center">Order Details</h2>

            <div className="mb-4">
              <p>Name: {selectedOrder.user?.name}</p>
              <p>Email: {selectedOrder.user?.email}</p>
              <p>Phone: {selectedOrder.address?.phone}</p>
            </div>

            <div className="flex justify-end">
              <button onClick={closeModal} className="px-4 py-2 bg-[#ede6dd] rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}