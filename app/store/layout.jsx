import StoreLayout from "@/components/store/StoreLayout"
import { SignedIn,SignedOut,SignIn } from "@clerk/nextjs"
export const metadata = {
  title: "Shubh Value Cart",
  description: "Shubh Value Cart",
}

export default function RootAdminLayout({ children }) {
  return (
    <>
        <SignedIn>
              <StoreLayout>{children}</StoreLayout>
          </SignedIn>
          <SignedOut>
              <div className="min-h-screen flex justify-center items-center">
                  <SignIn fallbackRedirectUrl="/store" routing="hash"/>
                </div>
        </SignedOut>
    </>
  )
}
