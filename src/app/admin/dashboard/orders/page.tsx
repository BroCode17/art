
import React from 'react'
import AdminPageHeader from '../../_components/AdminPageHeader'
import OrderTable from './_components/OrderTable';

export const dynamic = "force-dynamic";

const OrdersPage = () => {

  return (
    <div className='mt-10'>
      <AdminPageHeader title={"Orders"} />
      <OrderTable />
    </div>
  )
}

export default OrdersPage




