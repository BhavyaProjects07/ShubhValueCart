'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import {
  ShieldCheck,
  Video,
  Camera,
  User,
  Package,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  MessageSquare,
  RefreshCw,
} from "lucide-react"

export default function StoreReturnRequestsPage() {
  const [returns, setReturns] = useState([])
  const [loading, setLoading] = useState(true)
  const [adminNotes, setAdminNotes] = useState({})
  const [actionLoading, setActionLoading] = useState({})

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const { data } = await axios.get("/api/store/return-request")
        setReturns(data.returns)
      } catch (err) {
        toast.error("Failed to load return requests.")
      } finally {
        setLoading(false)
      }
    }

    fetchReturns()
  }, [])

  const handleAction = async (id, status) => {
    const note = adminNotes[id] || ""

    if (status === "REJECTED" && !note.trim()) {
      return toast.error("Please add rejection reason.")
    }

    const toastId = toast.loading(
      status === "APPROVED" ? "Approving request..." : "Rejecting request..."
    )

    setActionLoading((prev) => ({ ...prev, [id]: true }))

    try {
      await axios.patch(`/api/store/return-request/${id}`, {
        status,
        adminNote: note,
      })

      toast.success(`Request ${status.toLowerCase()}`, { id: toastId })

      setReturns((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status, adminNote: note } : r
        )
      )

      setAdminNotes((prev) => {
        const copy = { ...prev }
        delete copy[id]
        return copy
      })
    } catch (err) {
      toast.error("Failed to process request.", { id: toastId })
    } finally {
      setActionLoading((prev) => {
        const copy = { ...prev }
        delete copy[id]
        return copy
      })
    }
  }

  const getStatusStyle = (status) => {
    if (status === "PENDING") {
      return "bg-amber-100 text-amber-700 border border-amber-200"
    }

    if (status === "APPROVED") {
      return "bg-green-100 text-green-700 border border-green-200"
    }

    return "bg-red-100 text-red-700 border border-red-200"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 flex flex-col items-center gap-5">
          <RefreshCw className="animate-spin text-[#2563eb]" size={34} />
          <p className="font-semibold text-slate-700">
            Loading Return Requests...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eff6ff] via-white to-[#f8fafc] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 md:p-10 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#2563eb] text-xs font-bold tracking-wide">
                <ShieldCheck size={14} />
                SHUBH VALUE CART ADMIN
              </span>

              <h1 className="text-3xl md:text-5xl font-black text-slate-900 mt-5">
                Return Request Dashboard
              </h1>

              <p className="text-slate-500 mt-3 max-w-2xl">
                Review customer return claims, verify uploaded proof,
                and approve or reject requests instantly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 min-w-[220px]">
              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <p className="text-xs text-slate-500 font-medium">Total</p>
                <p className="text-3xl font-black text-slate-900 mt-1">
                  {returns.length}
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50 p-5 border border-amber-100">
                <p className="text-xs text-amber-700 font-medium">Pending</p>
                <p className="text-3xl font-black text-amber-700 mt-1">
                  {returns.filter((r) => r.status === "PENDING").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty */}
        {returns.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-14 text-center shadow-sm">
            <ShieldCheck className="mx-auto text-slate-300 mb-4" size={50} />
            <h2 className="text-2xl font-bold text-slate-800">
              No Return Requests Found
            </h2>
            <p className="text-slate-500 mt-2">
              All requests are cleared for now.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {returns.map((req) => {
              const isProcessing = actionLoading[req.id]

              return (
                <div
                  key={req.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  <div className="grid lg:grid-cols-[330px_1fr]">

                    {/* Left Panel */}
                    <div className="bg-slate-50 border-r border-slate-200 p-7 space-y-6">
                      <div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold mb-2">
                          <Package size={16} />
                          Order ID
                        </div>
                        <p className="font-black text-slate-900 break-all">
                          #{req.orderId}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold mb-2">
                          <User size={16} />
                          Customer
                        </div>
                        <p className="text-slate-800 break-all">
                          {req.user.email}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold mb-2">
                          <Clock size={16} />
                          Status
                        </div>

                        <span
                          className={`inline-flex px-4 py-2 rounded-full text-xs font-bold ${getStatusStyle(
                            req.status
                          )}`}
                        >
                          {req.status}
                        </span>
                      </div>
                    </div>

                    {/* Right Panel */}
                    <div className="p-7 md:p-8">

                      {/* Reason */}
                      <div className="mb-8">
                        <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold mb-3">
                          <AlertCircle size={16} />
                          Return Reason
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-slate-700 leading-relaxed">
                          {req.reason}
                        </div>
                      </div>

                      {/* Media */}
                      <div className="mb-8">
                        <h3 className="font-bold text-slate-900 mb-4">
                          Uploaded Proof
                        </h3>

                        <div className="flex flex-wrap gap-3">

                          {req.images?.map((img, i) => (
                            <a
                              key={i}
                              href={img}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-slate-200 hover:border-[#2563eb] hover:bg-blue-50 transition"
                            >
                              <Camera size={16} />
                              <span className="text-sm font-medium">
                                Image {i + 1}
                              </span>
                              <ExternalLink size={14} />
                            </a>
                          ))}

                          {req.video && (
                            <a
                              href={req.video}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-blue-200 bg-blue-50 text-[#2563eb] hover:bg-blue-100 transition"
                            >
                              <Video size={16} />
                              <span className="text-sm font-semibold">
                                View Video
                              </span>
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Pending Actions */}
                      {req.status === "PENDING" ? (
                        <div className="border-t border-slate-200 pt-8">

                          <div className="mb-5">
                            <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold mb-3">
                              <MessageSquare size={16} />
                              Admin Note
                            </div>

                            <textarea
                              rows={4}
                              value={adminNotes[req.id] || ""}
                              disabled={isProcessing}
                              onChange={(e) =>
                                setAdminNotes((prev) => ({
                                  ...prev,
                                  [req.id]: e.target.value,
                                }))
                              }
                              placeholder="Write approval note or rejection reason..."
                              className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                            />
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <button
                              disabled={isProcessing}
                              onClick={() =>
                                handleAction(req.id, "APPROVED")
                              }
                              className="h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold transition disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                              <CheckCircle2 size={18} />
                              {isProcessing
                                ? "Processing..."
                                : "Approve Return"}
                            </button>

                            <button
                              disabled={isProcessing}
                              onClick={() =>
                                handleAction(req.id, "REJECTED")
                              }
                              className="h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold transition disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                              <XCircle size={18} />
                              {isProcessing
                                ? "Processing..."
                                : "Reject Return"}
                            </button>
                          </div>
                        </div>
                      ) : req.adminNote ? (
                        <div className="border-t border-slate-200 pt-8">
                          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                            <p className="text-xs font-bold text-slate-500 mb-2 uppercase">
                              Admin Note
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                              {req.adminNote}
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}