'use client'
import React, { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import { updateUserData, updateUserToken } from "@/_redux/slices/userSlice";
import { useDispatch } from "react-redux";


export const dynamic = "force-dynamic";
const Protected = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch();


  useLayoutEffect(() => {
    const c = Cookies.get("loggedUser");
    if (c) {
      const sessionUser = JSON.parse(c!);
      dispatch(updateUserData(sessionUser.user));
      dispatch(updateUserToken(sessionUser.accessToken));
    } else {
      redirect("/admin");
    }
  }, []);
  return <div className="w-full">{user && children}</div>;
};

export default Protected;
