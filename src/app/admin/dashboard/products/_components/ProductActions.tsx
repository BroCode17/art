import { useDeleteProductMutation, useUpdateActiveProductMutation } from '@/_redux/services/productApi'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { ActiveType } from '@/types'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'


export const ActiveToggleDropdownItem = ({id, isActive}: {id:string, isActive?:boolean}) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition()
    const[updateActiveProduct] = useUpdateActiveProductMutation()


    const handleUpdate = () => {
        updateActiveProduct({id, isActive})
        router.refresh();
    }
  return (
    <DropdownMenuItem onClick={() => {
        startTransition(async () => {
            //make add api call
            handleUpdate()
        })
    }} disabled={isPending}>
    {!isActive? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  )
}
export const DeleteDropwDownItem = ({id}:ActiveType) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition()
    const[deleteProduct] = useDeleteProductMutation()

    const handleDelete = () => {
        deleteProduct(id);
        router.refresh()
    }
  return (
    <DropdownMenuItem onClick={() => {
        startTransition(async () => {
            //make add api call
            handleDelete()
            router.refresh()
        })
    }} disabled={isPending} className='bg-destructive text-white font-bold'>
     Delete 
    </DropdownMenuItem>
  )
}


