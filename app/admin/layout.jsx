import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";


export const metadata = {
    title: "FrostWayne. - Admin",
    description: "FrostWayne. - Admin",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                    {children}
                </AdminLayout>

            


        </>
    );
}
