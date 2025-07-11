
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";


const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full">
        <div className="h-[80px] md:pl-62.5 fixed inset-y-0 w-full z-50">
          <Navbar />
        </div>
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-45">
          <Sidebar />
        </div>
        <main className="md:pl-63 pt-[80px] h-full pb-[80px] md:pb-0">
          {children}
        </main>
        {/* <MobileSidebar /> */}
      </div>
    );
}

export default DashboardLayout;