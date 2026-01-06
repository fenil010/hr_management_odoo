import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
