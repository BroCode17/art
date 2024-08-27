"use client";
import { useSelector } from "react-redux";
import AdminPageHeader from "./_components/AdminPageHeader";
import { LoginForm } from "./_components/Login";
// import { useValidateUserMutation } from "@/_redux/services/userApi";
import { useEffect, useLayoutEffect, useState } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const token = useSelector((state: any) => state.user.accessToken);

  // const [validateUser, { isSuccess, isError }] = useValidateUserMutation();

  // useEffect(() => {
  //   if (token) getRefreshToken();
  // }, [token]);

  // const getRefreshToken = async () => {
  //   try {
  //     const res = await validateUser(token).unwrap();
  //     console.log('admin page', res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

  const user = useSelector((state: any) => state.user.userData);
  const access = useSelector((state: any) => state.user.accessToken);

  //console.log('Admin ', access)
  // useEffect(() => {
    
  //   if(user)
  //     redirect('/admin/dashboard')
  // },[user])
  

  return (
    <div className="min-h-svh flex justify-center items-center w-full">
      <div className="space-y-6 w-[400px]">
        <AdminPageHeader title="Login" />
        {/* {isError && <>Please login again to access this route</>} */}
        <LoginForm />
      </div>
    </div>

  );
};

export default LoginPage;
