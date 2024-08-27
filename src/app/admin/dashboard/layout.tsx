import AdminSideBar from "../_components/Sidebar";
import Protected from "../_components/Protected";


export const dynamic = "force-dynamic";




export default function AdimLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Protected>
      <div className="flex min-h-screen justify-end">
        <AdminSideBar />
        <div className="ml- w-9/12">{children}</div>
      </div>
    </Protected>
  );
}
