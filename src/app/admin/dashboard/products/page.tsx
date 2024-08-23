"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import AdminPageHeader from "../../_components/AdminPageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetAllProductQuery } from "@/_redux/services/productApi";
import { CheckCircle2, Loader2, MoreVerticalIcon, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  ActiveToggleDropdownItem,
  DeleteDropwDownItem,
} from "./_components/ProductActions";
import { useRouter } from "next/navigation";
import { formatCurrency } from "../../../../../utils/formatters";

export const dynamic = "force-dynamic";

const ProductTable = ({ product, isLoading, isSuccess }: any) => {
  useEffect(() => {

  }, [product])
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      {product && (
        <TableBody>
          {product.map((p: any, index: number) => (
            <TableRow key={index}>
              <TableCell>
                {p.quantity > 0 ? (
                  <>
                    <span
                      className="sr-only
                          "
                    >
                      Available
                    </span>
                    <CheckCircle2 />
                  </>
                ) : (
                  <>
                    <span
                      className="sr-only
                          "
                    >
                      Unavailable
                    </span>
                    <XCircle />
                  </>
                )}
              </TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{formatCurrency(p.price / 100)}</TableCell>
              <TableCell>{p.quantity}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVerticalIcon />
                    <span className="sr-only">Action</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href={`products/${p._id}/update`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <ActiveToggleDropdownItem
                      id={p._id}
                      isActive={p.isActive}
                    />
                    <DeleteDropwDownItem id={p._id as string} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
};

const Products = () => {
  const { data, isLoading, isSuccess, error } = useGetAllProductQuery("");
  const router = useRouter();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setProduct(data.data);
    }
    router.refresh();
  }, [data, router]);
  return (
    <div className="min-h-svh flex flex-col items-center space-y-6">
      <div className="mt-10 flex justify-between w-full xl:w-4/6 px-8">
        <AdminPageHeader title={"Products"} />

        <Button asChild className="bg-black">
          <Link href="/admin/dashboard/products/new">Add New Product</Link>
        </Button>
      </div>
      <div className="xl:w-4/6 w-full">
        <ProductTable
          product={product}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
        {isLoading && (
          <div className="w-full flex justify-center mt-20">
            <Loader2 size={64} className="animate-spin" />
          </div>
        )}
      </div>
      <div>
        {!isLoading && !error && product.length === 0 && <span className="text-sm">Add Product</span>}
        {error && <span className="text-sm">Ops...Error Fetching Data</span>}

      </div>
    </div>
  );
};

export default Products;
