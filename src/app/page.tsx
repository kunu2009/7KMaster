
"use client";

import { useAuth } from "@/context/auth-context";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { Loader2 } from "lucide-react";

export default function Home() {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        );
    }

    return <DashboardView />;
}
