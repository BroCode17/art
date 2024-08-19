"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ToastContext } from "./toast-context";
import "./toast.css";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { MobileNav } from "@/components/Header";

interface ToastProperties {
  message: string;
  close: () => void;
}

function useTimeout(callbackFunction: () => void) {
  const savedCallback = useRef(callbackFunction);

  useEffect(() => {
    savedCallback.current = callbackFunction;
  }, [callbackFunction]);

  useEffect(() => {
    const functionId = setTimeout(() => savedCallback.current(), 3000);

    return () => clearInterval(functionId);
  }, []);
}

export const Toast = ({ message, close }: ToastProperties) => {
  useTimeout(() => {
    close();
  });

  return (
    <div className="toast">
      <p className="ml-3">{message}</p>
      <button className="close-btn mr-2" onClick={close}>
        <IoCheckmarkSharp color="green" />
      </button>
    </div>
  );
};

type ToastType = {
  message: string;
  id: number;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const showMobileNav = useSelector((state: any) => state.header.showMobileNav);

  function openToast(message: string) {
    const newToast = {
      id: Date.now(),
      message: message,
    };
    setToasts((pervToast) => [...pervToast, newToast]);
  }

  function closeToast(id: number) {
    setToasts((prevToast) => prevToast.filter((toast) => toast.id !== id));
  }

  const contextValue = useMemo(
    () => ({
      open: openToast,
      close: closeToast,
    }),
    []
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <>
        <div className="toasts mt-20">
          {toasts &&
            toasts.map((toast) => {
              return (
                <Toast
                  key={toast.id}
                  message={toast.message}
                  close={() => closeToast(toast.id)}
                />
              );
            })}
        </div>
        {showMobileNav && (
          <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50  transition-opacity duration-300 ${
        showMobileNav ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`bg-black p-6 w-full max-h-screen overflow-auto transform transition-transform duration-300 ${
          showMobileNav ? 'translate-y-0' : '-translate-y-full'
        }`}>
              <MobileNav />
            </div>
          </div>
        )}
      </>
    </ToastContext.Provider>
  );
};
