import StoreLayout from "@/components/store/StoreLayout"
import { useAuth } from "@/contexts/AuthContext"
export const metadata = {
  title: "Shubh Value Cart",
  description: "Shubh Value Cart",
}

export default function RootAdminLayout({ children }) {
  return (
    <>
        <StoreLayout>{children}</StoreLayout>
          
    </>
  )
}
