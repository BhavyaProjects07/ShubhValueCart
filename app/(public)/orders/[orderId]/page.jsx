
'use client'

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"
import Loading from "@/components/Loading"
import toast from "react-hot-toast"
import { 
  Package, 
  MapPin, 
  ArrowLeft, 
  CreditCard,
  Truck,
  ShieldCheck,
  AlertCircle,
  ShoppingBag
} from "lucide-react"



export default function OrderViewDetailsPage() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₹"
  const router = useRouter() // Use useRouter for navigation
  

  const isReturnEligible = () => {
    if (!order || order.status !== "DELIVERED") return false
    const deliveredAt = new Date(order.updatedAt)
    const now = new Date()
    const diffHours = (now.getTime() - deliveredAt.getTime()) / (1000 * 60 * 60)
    return diffHours <= 48 && !order.returnRequest
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${orderId}`)
        setOrder(data.order)
      } catch (err) {
        console.error(err)
        toast.error("Unable to load order details.")
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [orderId])

  if (loading) return <Loading />
  if (!order) return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center p-6 text-center text-[#1A1614]">
      <AlertCircle className="text-[#C5A059] mb-4 opacity-50" size={48} />
      <h2 className="font-serif text-2xl mb-2 italic">Sequence Not Found</h2>
      <p className="text-sm opacity-60 mb-8 max-w-xs font-light">The requested order archive could not be located.</p>
      <button onClick={() => router.back()} className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold border-b border-[#C5A059]/40 pb-1">Return to Archive</button>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f1f3f6] font-sans pt-[100px] md:pt-[120px] pb-16 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <button 
            onClick={() =>router.push(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-[#2874f0] transition-colors font-medium text-sm"
          >
            <ArrowLeft size={18} />
            Order History
          </button>
        </div>

        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <div>
            <p className="text-sm font-bold text-[#2874f0] mb-2 uppercase tracking-wide">Order Confirmation</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              Order #{order.id?.slice(-8).toUpperCase()}
            </h1>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-2 bg-gray-50 px-5 py-3 rounded-xl border border-gray-100 w-full md:w-auto">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Current Status</span>
            <div className="flex items-center gap-2">
               <div className={`w-2.5 h-2.5 rounded-full ${order.status === 'DELIVERED' ? 'bg-green-500' : 'bg-[#ff9900]'}`}></div>
               <span className="text-sm font-bold text-gray-900 uppercase">
                 {order.status?.replace(/_/g, " ")}
               </span>
            </div>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Items */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Purchased Items */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingBag size={20} className="text-[#2874f0]" />
                  Purchased Items
                </h2>
                <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {order.orderItems?.length || 0} {(order.orderItems?.length === 1) ? 'Item' : 'Items'}
                </span>
              </div>
              
              <div className="divide-y divide-gray-100">
                {order.orderItems?.map((item, index) => (
                  <div key={index} className="flex gap-4 py-6 first:pt-0">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <img
                        src={item.product?.images?.[0] || 'https://via.placeholder.com/150'}
                        alt={item.product?.name || 'Product Image'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1">{item.product?.name}</h3>
                        <p className="text-xs font-bold text-gray-500 uppercase">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500 font-medium">Unit: {currency}{item.price}</span>
                        <span className="font-bold text-gray-900 text-lg">{currency}{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-[#2874f0] rounded-full flex items-center justify-center">
                      <CreditCard size={20} />
                    </div>
                    <span className="font-bold text-gray-700">Total Amount</span>
                  </div>
                  <div>
                    <span className="text-3xl font-black text-[#2874f0]">{currency}{order.total}</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Information Sidebar */}
          <div className="space-y-6">
            
            {/* Shipping Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-5">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-3 flex items-center gap-2">
                <MapPin size={16} className="text-[#2874f0]" /> 
                Shipping Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 font-bold mb-1 uppercase">Delivered To</p>
                  <p className="font-bold text-gray-900">{order.address?.name}</p>
                </div>
                <div className="text-sm text-gray-600 font-medium leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <p>{order.address?.street}</p>
                  <p>{order.address?.city}, {order.address?.state}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 font-bold">
                   <Truck size={16} className="text-[#2874f0]" />
                   <span>{order.address?.phone}</span>
                </div>
              </div>
            </div>

            {/* Verification / Returns */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-5">
               <div className="flex gap-2 border-b border-gray-100 pb-3">
                  <ShieldCheck size={20} className="text-[#2874f0]" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Return Policy</h3>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Shubh Value Cart Protection</p>
                  </div>
               </div>
               
               {isReturnEligible() ? (
                 <div className="space-y-4">
                    <p className="text-xs font-medium text-gray-600 leading-relaxed">
                      You are within the 48-hour return window. If your product is damaged or incorrect, you may request a return.
                    </p>
                    <button
                      onClick={() => router.push(`/return/${order.id}`)}
                      className="w-full py-3 bg-[#2874f0] hover:bg-[#1a5ec4] text-white text-sm font-bold rounded-xl transition-all shadow-md mt-2"
                    >
                      Request Return
                    </button>
                 </div>
               ) : (
                 <div className="space-y-4 text-center pb-2">
                    <div className="flex items-start gap-3 p-3 bg-red-50 text-red-800 rounded-lg border border-red-100 text-left">
                       <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                       <p className="text-xs font-bold leading-relaxed">
                         {order.returnRequest 
                           ? "A return request has already been submitted." 
                           : "The 48-hour return window has closed or the order is not yet delivered."}
                       </p>
                    </div>
                 </div>
               )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}