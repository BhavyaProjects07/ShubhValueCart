'use client'
import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { 
  ArrowLeft, 
  Upload, 
  Video, 
  Camera, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  Check,
  X,
  PackageOpen
} from "lucide-react"

export default function ReturnPage() {
  // Try to get orderId from URL, falback just for UI purposes
  const { orderId } = useParams()
  const navigate = useNavigate()

  const [images, setImages] = useState([])
  const [video, setVideo] = useState(null)
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setImages(prev => [...prev, ...files])
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!video) return toast.error("An unboxing video is mandatory for returns.")
    if (images.length < 3) return toast.error("Please upload at least 3 clear images.")
    if (!reason.trim()) return toast.error("Please provide a reason for the return.")

    try {
      setLoading(true)

      // Simulated API interaction
      // const formData = new FormData()
      // formData.append("orderId", orderId || "UNKNOWN")
      // formData.append("video", video)
      // images.forEach(img => formData.append("images", img))
      // formData.append("reason", reason)
      // await axios.post("/api/return", formData)

      await new Promise(resolve => setTimeout(resolve, 1500))

      toast.success("Return request submitted successfully.")
      
      // Redirect back or to a designated orders page. 
      // For now, redirect to Shop since we are simulating.
      navigate(`/shop`) 
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit request.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] font-sans pt-[100px] md:pt-[120px] pb-16 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header / Nav */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-[#2874f0] transition-colors font-medium text-sm"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <h1 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
            <PackageOpen className="text-[#2874f0]" size={20} />
            Return Request
          </h1>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 text-blue-800">
          <AlertCircle size={20} className="mt-0.5 shrink-0 text-[#2874f0]" />
          <div>
            <h4 className="font-bold text-sm mb-1 text-gray-900">Return Policy Guidelines</h4>
            <p className="text-xs text-gray-700 leading-relaxed font-medium">
              To ensure a smooth return process, Shubh Value Cart requires a continuous unboxing video along with at least 3 clear photographs of the product and its packaging.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 space-y-8">
          
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Upload Return Proof</h2>
            <p className="text-sm text-gray-500 font-medium">Provide evidence for Order <span className="font-bold">#{orderId || "SVC-892451"}</span></p>
          </div>

          {/* Unboxing Video Upload */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Video size={16} className="text-[#2874f0]" /> 
                1. Unboxing Video <span className="text-red-500">*</span>
              </label>
            </div>
            
            <div className={`relative border-2 border-dashed rounded-xl transition-all duration-300 p-8 text-center flex flex-col items-center justify-center gap-3 ${video ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-[#2874f0] hover:bg-blue-50/50 bg-gray-50'}`}>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={e => setVideo(e.target.files[0])}
              />
              <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center w-full">
                {video ? (
                  <>
                    <div className="w-12 h-12 bg-white text-green-500 rounded-full flex items-center justify-center mb-3 shadow-sm border border-green-200">
                      <Check size={24} />
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      {video.name.length > 30 ? video.name.slice(0, 30) + "..." : video.name}
                    </p>
                    <span className="text-xs text-[#2874f0] mt-1 font-bold tracking-wide hover:underline">Click to change video</span>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center text-gray-400 mb-3">
                      <Upload size={20} />
                    </div>
                    <p className="text-sm font-bold text-gray-700">Upload Continuous Unboxing Video</p>
                    <span className="text-xs text-gray-500 mt-1 font-medium">No cuts or edits allowed. Max size: 50MB</span>
                  </>
                )}
              </label>
            </div>
          </section>

          {/* Product Images Upload */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Camera size={16} className="text-[#2874f0]" /> 
                2. Product Images <span className="text-red-500">*</span>
              </label>
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">Min. 3 required</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                  <img src={URL.createObjectURL(img)} alt={`Upload ${idx+1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => removeImage(idx)}
                      className="bg-white text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors shadow-lg"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}

              <label className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-[#2874f0] bg-gray-50 hover:bg-blue-50/50 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all">
                <input
                  id="images-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Camera size={24} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-600">Add Photos</span>
              </label>
            </div>
            
            {images.length > 0 && images.length < 3 && (
              <p className="text-xs font-bold text-red-500 mt-2 bg-red-50 inline-block px-3 py-1.5 rounded-lg border border-red-100">
                Please upload {3 - images.length} more image{3 - images.length > 1 ? 's' : ''}.
              </p>
            )}
          </section>

          {/* Reason Section */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-[#2874f0]" />
              <label className="text-sm font-bold text-gray-900">
                3. Reason for Return <span className="text-red-500">*</span>
              </label>
            </div>
            <textarea
              placeholder="Tell us exactly what's wrong with the product so we can help you better..."
              rows={4}
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2874f0]/20 focus:border-[#2874f0] transition-all resize-none"
            />
          </section>
        </div>

        {/* Disclaimer & Submit */}
        <div className="bg-gray-900 text-white p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
           <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
             <ShieldCheck size={32} className="text-[#2874f0] shrink-0" />
             <div>
               <h4 className="font-bold text-sm mb-1 text-white">Authenticity Declaration</h4>
               <p className="text-xs text-gray-400 font-medium leading-relaxed">
                 By submitting, you confirm the provided evidence is genuine. False claims may lead to account suspension.
               </p>
             </div>
           </div>
           
           <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full md:w-auto px-8 py-3.5 bg-[#2874f0] hover:bg-[#1a5ec4] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
        </div>

      </div>
    </div>
  )
}