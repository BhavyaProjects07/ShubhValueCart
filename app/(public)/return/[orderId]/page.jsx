
'use client'

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { 
  ArrowLeft, 
  Upload, 
  Video, 
  Camera, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  Check
} from "lucide-react"

export default function ReturnPage() {
  const { orderId } = useParams()
  const router = useRouter()

  const [images, setImages] = useState([])
  const [video, setVideo] = useState(null)
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!video) return toast.error("Maison Protocol requires an unboxing video.")
    if (images.length < 3) return toast.error("Maison Protocol requires at least 3 high-resolution images.")
    if (!reason.trim()) return toast.error("Please provide a detailed justification for the return.")

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("orderId", orderId)
      formData.append("video", video)
      images.forEach(img => formData.append("images", img))
      formData.append("reason", reason)

      await axios.post("/api/return", formData)

      toast.success("Return sequence initiated successfully.")
      router.push(`/orders/${orderId}`)
    } catch (err) {
      toast.error(err?.response?.data?.message || "Sequence initiation failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] font-sans pt-[80px] md:pt-[100px] pb-16">
      
      {/* Top Banner & Breadcrumb */}
      <div className="bg-white shadow-[0_2px_4px_rgba(0,0,0,0.08)] mb-6">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center gap-2 text-sm text-gray-500 font-medium">
          <button onClick={() => navigate("/")} className="hover:text-[#2874f0] transition-colors">Home</button>
          <ChevronRight size={14} />
          <button onClick={() => navigate("/orders")} className="hover:text-[#2874f0] transition-colors">My Orders</button>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-bold">Return Item</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4">
        
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-700"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Initiate Return for Order #{orderId || "SVC-892451"}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Form Content */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Step 1: Product Summary */}
            <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-6">
              <div className="flex gap-4">
                <div className="w-20 h-20 shrink-0 bg-gray-50 border border-gray-200 rounded-md overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=200&auto=format&fit=crop" 
                    alt="Product" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-lg mb-1">Premium Indian Grocery Assortment</h3>
                  <p className="text-sm text-gray-500 mb-2">Seller: Shubh Value Retail</p>
                  <p className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    ₹1,249 <span className="text-xs font-medium text-gray-500 line-through">₹1,500</span> <span className="text-xs font-bold text-green-600">17% Off</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Reason for Return */}
            <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
                <div className="w-6 h-6 rounded-full bg-[#2874f0] text-white flex items-center justify-center font-bold text-xs">1</div>
                <h2 className="text-lg font-bold text-gray-900">Why are you returning this?</h2>
              </div>
              
              <div className="space-y-3">
                {returnReasons.map((r, idx) => (
                  <label key={idx} className={`flex items-center gap-3 p-4 border rounded-md cursor-pointer transition-all ${reason === r ? 'border-[#2874f0] bg-blue-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input 
                      type="radio" 
                      name="reason" 
                      value={r} 
                      checked={reason === r}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-4 h-4 text-[#2874f0] border-gray-300 focus:ring-[#2874f0]" 
                    />
                    <span className="font-medium text-gray-800 text-sm">{r}</span>
                  </label>
                ))}
              </div>

              {reason && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Additional Comments (Optional)</label>
                  <textarea
                    placeholder="Describe the issue in detail to help us process your request faster..."
                    rows={3}
                    value={comments}
                    onChange={e => setComments(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-md p-3 text-sm focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] outline-none transition-all resize-none"
                  />
                </div>
              )}
            </div>

            {/* Step 3: Evidence Upload */}
            <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-4">
                <div className="w-6 h-6 rounded-full bg-[#2874f0] text-white flex items-center justify-center font-bold text-xs">2</div>
                <h2 className="text-lg font-bold text-gray-900">Upload Evidence <span className="text-red-500">*</span></h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Video Column */}
                <div className="space-y-3">
                  <div className="bg-[#fff9e6] border border-[#ffecb3] p-3 rounded-md flex items-start gap-2">
                    <AlertCircle size={16} className="text-[#f5a623] shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-800 font-medium">Mandatory: Provide a continuous unboxing video showing the shipping label and the intact seal being broken.</p>
                  </div>
                  
                  <div className={`relative border border-dashed rounded-md transition-all p-6 text-center flex flex-col items-center justify-center gap-2 ${video ? 'border-green-500 bg-green-50/50' : 'border-gray-300 bg-gray-50'}`}>
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
                          <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center mb-2 shadow-sm">
                            <CheckCircle2 size={20} />
                          </div>
                          <p className="text-xs font-bold text-gray-900 truncate w-full px-4 text-center">
                            {video.name}
                          </p>
                          <span className="text-[11px] text-[#2874f0] mt-1 font-bold">Replace Video</span>
                        </>
                      ) : (
                        <>
                          <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-[#2874f0] mb-2 shadow-sm">
                            <Video size={18} />
                          </div>
                          <p className="text-sm font-bold text-[#2874f0] hover:underline">Add Video Evidence</p>
                          <span className="text-[11px] text-gray-500 mt-1">MP4, MOV up to 50MB</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Images Column */}
                <div className="space-y-3">
                  <div className="bg-[#f0f8ff] border border-[#cce5ff] p-3 rounded-md flex items-start gap-2">
                    <Camera size={16} className="text-[#0056b3] shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-800 font-medium">Mandatory: Upload at least 3 clear images showing all angles of the product and the outer packaging.</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-md overflow-hidden border border-gray-200 group">
                        <img src={URL.createObjectURL(img)} alt={`Upload ${idx+1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            onClick={() => removeImage(idx)}
                            className="bg-white text-red-500 p-1.5 rounded-full hover:bg-red-50 shadow-sm"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))}

                    <label className="aspect-square rounded-md border border-dashed border-gray-300 hover:border-[#2874f0] bg-gray-50 cursor-pointer flex flex-col items-center justify-center gap-1 transition-all">
                      <input
                        id="images-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <UploadCloud size={20} className="text-gray-400" />
                      <span className="text-[10px] font-bold text-gray-500">Upload</span>
                    </label>
                  </div>
                  {images.length > 0 && images.length < 3 && (
                    <p className="text-xs font-bold text-red-500 mt-1 animate-pulse">
                      * {3 - images.length} more image{3 - images.length > 1 ? 's' : ''} required.
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* Submit Action */}
            <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 font-medium bg-gray-50 px-4 py-2 rounded-md">
                <ShieldCheck size={16} className="text-green-600" />
                Verified authentic returns are processed within 5-7 days.
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading || !reason || !video || images.length < 3}
                className="w-full sm:w-auto px-10 py-3.5 bg-[#fb641b] hover:bg-[#f05a13] text-white text-sm font-bold rounded-sm shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing
                  </>
                ) : (
                  "Submit Return Request"
                )}
              </button>
            </div>

          </div>

          {/* Right Sidebar: Guidelines */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-5 sticky top-[100px]">
              <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4 text-base">Return Policy Guidelines</h3>
              
              <ul className="space-y-6">
                <li className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Video size={16} className="text-[#2874f0]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-1">Unboxing Video Requirement</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      A clear, uncut video of the package being opened for the first time is mandatory to claim any physical defects or missing items.
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <RefreshCcw size={16} className="text-[#2874f0]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-1">Condition of Item</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Items must be returned in their original condition, with all tags, packaging, accessories, and manuals intact.
                    </p>
                  </div>
                </li>

                <li className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-[#2874f0]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-1">Refund Timeline</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Once the item is received and passes quality checks, refunds are initiated within 48 hours to original payment method.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <a href="/contact" className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-2">
                    <HelpCircle size={18} className="text-gray-400 group-hover:text-[#2874f0] transition-colors" />
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-[#2874f0] transition-colors">Need Help?</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-[#2874f0] transition-colors" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}