import React from 'react'

const AdminPageHeader = ({title}: {title: String}) => {
  return (
    <div className='font-extrabold text-2xl'>{title}</div>
  )
}

export default AdminPageHeader