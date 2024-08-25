"use client";
import React, { useEffect, useState } from "react";
import {
  useGetActiveProductQuery,
  useGetInActiveProductQuery,
} from "@/_redux/services/productApi";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export const dynamic = "force-dynamic";

type DashboardBoardProps = {
  title?: string;
  subtitle?: string;
  body?: string;
  loading?: boolean;
};

const DashboardCard = ({
  title,
  subtitle,
  body,
  loading
}: DashboardBoardProps) => {
  return (
    <div>
    <Card className="">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>{loading ? <p>Loading...</p> : <p>{body}</p>}</CardContent>
    </Card>
    </div>
  );
};

const AdminDashboard = () => {
  const {
    data: activeProduct,
    error: activeError,
    isLoading: activeProductLoading,
    isSuccess: activeProductSuccess,
    refetch
  } = useGetActiveProductQuery("");
 
  const {
    data: inData,
    error: inError,
    isLoading: inLoading,
    isSuccess: inSuccess, 
    refetch: inActiveRefetch
  } =  useGetInActiveProductQuery("")
  const [active, setActive] = useState(0);
  const [inActive, setInActive] = useState(0);
  const [user, setUser] = useState()

  useEffect(() => {
    if (activeProductSuccess) {
      setActive(activeProduct.activeProducts);
    }
  }, [activeProduct]);

  useEffect(() => {
    if(inSuccess){
        setInActive(inData.inActiveProducts)
    }
  }, [inData])
  
  // const activeProducts = formatNumber(active[0]?.activeProducts || 0);
  // const inactiveProducts = formatNumber(inActive[0]?.inActiveProducts || 0);
  return (
    <>
     
      <div className="min-h-svh flex justify-center items-center w-full ">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 ">
          <DashboardCard
            title="Active Products"
            subtitle={`Inactive: ${inActive}`}
            body={`Active: ${active}`}
            loading={activeProductLoading || inLoading }
          />
          {/* <DashboardCard
            title="Sales"
            subtitle="Orders"
            body={"hello"}
            loading={activeProductLoading || inLoading}
          /> 
           <DashboardCard
            title="Orders"
            subtitle="Pending"
            body={"hello"}
            loading={activeProductLoading || inLoading}
          /> */}
        </div>
      </div> 
      
    </>
  );
};

export default AdminDashboard;
