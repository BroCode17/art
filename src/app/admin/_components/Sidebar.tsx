'use client'
import React from "react";
import AdminLinks from "./AdminLinks";
import { GoSignOut } from "react-icons/go";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";


const AdminSideBar = () => {
   const router = useRouter()


 const handleLogout = () => {
  
    Cookie.set('loggedUser', '');
    router.replace('/admin')
 }

  return (
    <div className="bg-black sticky left-0 top-[5%] w-72 flex justify-center items-center flex-col ">
      <nav className="flex flex-col w-full text-white">
        <AdminLinks name="Dashboard" active={false} url="/admin/dashboard" />
        <AdminLinks name="Products" active={false} url="/admin/dashboard/products" />
        {/* <AdminLinks name="Sales" active={false} url="/admin/dashboard/sales" /> */}
        <AdminLinks name="Orders" active={false} url="/admin/dashboard/orders" />
        <AdminLinks name="Images" active={false} url="/admin/dashboard/lay" />
      </nav>

      <div className="w-full flex justify-end mt-28 pr-4 text-white cursor-pointer" onClick={handleLogout}>
        Sign Out
        <GoSignOut color="white" size={24} className="rotate-180"/>
      </div>
    </div>
  );
};

export default AdminSideBar;
