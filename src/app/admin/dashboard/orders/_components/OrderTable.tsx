"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, Link, Loader2, MoreVerticalIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  ActiveToggleDropdownItem,
  DeleteDropwDownItem,
} from "../../products/_components/ProductActions";
import {
  useDeleteOrderByRefMutation,
  useGetAllOrderQuery,
  useUpdateOrderTrackingIdMutation,
} from "@/_redux/services/ordersApi";
import { IoClose } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "../../../../../../utils/formatters";
import { useToast } from "@/app/(root)/shop/_components/toast-context";
import { useRouter } from "next/navigation";
import { dateFormatter } from "../../../../../../utils/dateFormatter";

const ShippingDetails = ({
  order,
  show,
  setShow,
}: {
  order: any;
  show: boolean;
  setShow: any;
}) => {
  if (!show) return;
  //console.log(order);
  return (
    <div className="container p-4">
      <div
        className="bg-white rounded-lg shadow-lg p-6 mb-5 relative"
        onClick={() => setShow(false)}
      >
        <div className="absolute z-40 right-2 top-2 w-6 h-6 cursor-pointer hover:scale-90">
          <IoClose size={24} />
        </div>
        <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
        <p className="mb-2">
          <span className="font-semibold">Name:</span>{" "}
          {order.customerShippingInformation.firstName}{" "}
          {order.customerShippingInformation.lastName}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Address:</span>{" "}
          {order.customerShippingInformation.address}{" "}
          {order.customerShippingInformation.city}{" "}
          {order.customerShippingInformation.state}{" "}
          {order.customerShippingInformation.zipCode}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Contact:</span> {order.customerEmail}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Order Status:</span>
          <span
            className={`${
              order.orderStatus === "Confirmed" && "text-green-700"
            } ml-1`}
          >
            {order.orderStatus}
          </span>
        </p>
        <p className="mb-2">
          <span className="font-semibold">TrackingId:</span> {order.trackingId}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 max-h-52 overflow-y-auto custom-scrollbar">
        <h2 className="text-2xl font-bold mb-4">Products to be Shipped</h2>
        <div className="space-y-4">
          {order.products.map((product: any) => (
            <div
              key={`${product?.product?._id} ${product?.itemSize}`}
              className="flex items-center bg-gray-100 rounded-lg p-4 shadow"
            >
              <div className="">
                <h3 className="text-md font-[700]">
                  {product?.product?.name} {product?.itemSize}
                </h3>
                <p className="text-sm">Quantity: {product?.orderedQuantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Text = ({ order }: { order: any }) => {
  return (
    <span className="text-yellow-500 bg-white">
      <h1>{order} hello</h1>
    </span>
  );
};

const OrderStatusModal = ({ show, setShow, orderRef, actionType }: any) => {
  const { refetch } = useGetAllOrderQuery("");
  const [deleteOrderByRef, { isLoading }] = useDeleteOrderByRefMutation();
  const [updateOrderTrackingId, { isLoading: loadingForUpdateTrackId }] =
    useUpdateOrderTrackingIdMutation();
  const [shipState, setShipState] = useState<string>("Confirmed");
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [showError, setShowError] = useState<string>("");
  const toast = useToast();

  if (!show) return;

  const handleSetShipState = (value: any) => {
    setShipState(value);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (actionType === "DELETE") {
      if (trackingNumber !== orderRef) {
        setShowError("Value Unmatch");
        return;
      }
      const res = await deleteOrderByRef(orderRef).unwrap();
      if ("success" in res) {
        toast?.open("Order Deleted Successfully");
      } else {
        toast?.open("Order can not be deleted");
      }
      refetch();
      return;
    }

    if (shipState && shipState === "Confirmed") {
      const res = await updateOrderTrackingId({
        ref: orderRef as string,
        trackingId: trackingNumber,
        shipState,
      }).unwrap();
      if ("success" in res) {
        toast?.open("Order is Confirmed");
        setTrackingNumber("");
      } else {
        toast?.open("Order state can changed");
        setTrackingNumber("");
      }
    } else if(shipState && shipState === "Shipped") {
      const res = await updateOrderTrackingId({
        ref: orderRef as string,
        shipState,
      }).unwrap();
      if ("success" in res) {
        toast?.open("Order Status Changed to Shipped");
      } else {
        toast?.open("Order can not be deleted");
      }
    }
    setTrackingNumber("")
    refetch();
  };

  return (
    <form
      className="bg-white rounded-lg shadow-lg p-6 mb-5 relative space-y-4 mt-[30%]"
      onSubmit={onSubmit}
    >
      {showError && <p className="text-destructive font-bold">{showError}</p>}
      <div
        className="absolute z-40 right-2 top-2 w-6 h-6 cursor-pointer hover:scale-75"
        onClick={() => setShow(false)}
      >
        <IoClose size={24} />
      </div>
      {actionType === "DELETE" ? (
        <Input
          placeholder="Type Order Reference to Delete"
          required
          onChange={(e) => setTrackingNumber(e.target.value)}
          value={trackingNumber}
        />
      ) : (
        <>
          <div className="mt-4">
            <Select onValueChange={handleSetShipState} defaultValue={shipState}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="Pending">Pending</SelectItem> */}
                <SelectItem value="Confirmed">Confirm</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="">
            {shipState === "Confirmed" && (
              <Input
                placeholder="Enter Tracking Number"
                required
                onChange={(e) => setTrackingNumber(e.target.value)}
                value={trackingNumber}
              />
            )}
          </div>
        </>
      )}

      <Button
        className={`bg-black w-full uppercase br ${
          actionType === "DELETE" && "bg-destructive"
        }`}
        type="submit"
        disabled = {(shipState === 'Confirmed' || actionType ==='DELETE') && trackingNumber.length === 0}
      >
        {isLoading || loadingForUpdateTrackId ? (
          <Loader2 className="animate-spin" />
        ) : actionType === "DELETE" ? (
          "Delete"
        ) : (
          "Update"
        )}
      </Button>
    </form>
  );
};

const Order = ({ orders, isLoading, isSuccess, isError }: any) => {
  const [showShippingDetails, setShowShippingDetails] =
    useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showOrderStatuModal, setShowOrderStatuModal] =
    useState<boolean>(false);
  const [orderReference, setOrderReference] = useState<string>("");
  const [modalActionType, setModalActionType] = useState("");

  const handleShowShippingDetails = (order: any) => {
    setShowShippingDetails(true);
    setCurrentOrder(order);
  };
  const handleCloseShowShippingDetails = () => {
    setCurrentOrder(null);
    setShowShippingDetails(false);
  };
  const handleOrderStatuModal = async (ref: any, type: string) => {
    // setCurrentOrder(order);
    setOrderReference(ref);
    setShowOrderStatuModal(true);
    setModalActionType(type);
  };
  const handleCloseShowStatusModal = () => {
    // setCurrentOrder(null);
    setShowOrderStatuModal(false);
  };

  return (
    <div className="relative">
      <Table className="w-[800px] overflow-x-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        {orders && (
          <TableBody>
            {orders.map((order: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell
                    onClick={() => handleShowShippingDetails(order)}
                    className="cursor-pointer"
                  >
                    {order.refrenceNumber}
                  </TableCell>
                  <TableCell>{`${order.customerShippingInformation.firstName} ${order.customerShippingInformation.lastName}`}</TableCell>
                  <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                  <TableCell
                    className={`${
                      order.orderStatus === "Confirmed"
                        ? "text-red-500"
                        : order.orderStatus === "Shipped"
                        ? "text-green-700"
                        : ""
                    }`}
                  >
                    {order.orderStatus}
                  </TableCell>
                  <TableCell className="text-sm">{dateFormatter(order.createdAt)}</TableCell>
                  <TableCell>{dateFormatter(order.updatedAt)}</TableCell>
                
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVerticalIcon />
                        <span className="sr-only">Action</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          asChild
                          onClick={() =>
                            handleOrderStatuModal(
                              order.refrenceNumber,
                              "UPDATE"
                            )
                          }
                          className="cursor-pointer hover:bg-muted"
                        >
                          <span>Upate Status</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          asChild
                          onClick={() =>
                            handleOrderStatuModal(
                              order.refrenceNumber,
                              "DELETE"
                            )
                          }
                          className="cursor-pointer bg-destructive text-white font-semibold"
                        >
                          <span>Delete Order</span>
                        </DropdownMenuItem>
                        {/* <ActiveToggleDropdownItem
                      id={p._id}
                      isActive={p.isActive}
                    /> */}
                        {/* <DeleteDropwDownItem id={p._id as string} /> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
      <div className="fixed inset-0 w-[400px] top-[15%] m-auto z-40">
        <ShippingDetails
          order={currentOrder}
          show={showShippingDetails}
          setShow={setShowShippingDetails}
        />

        <OrderStatusModal
          show={showOrderStatuModal}
          setShow={setShowOrderStatuModal}
          orderRef={orderReference}
          actionType={modalActionType}
        />
      </div>
    </div>
  );
};

const OrderTable = () => {
  const { data, isError, isLoading, isSuccess } = useGetAllOrderQuery("");
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setOrder(data);
    }
  }, [data, isSuccess]);

  console.log(orders);

  return (
    <>
      <Order
        orders={orders}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
      />
      {orders.length === 0 && (
        <div className="w-ful flex justify-center mt-[20%]">
          {isLoading ? (
            <Loader2 size={30} className="animate-spin" />
          ) : (
            <span className="mx-auto text-muted-foreground text-2xl">
              No order
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default OrderTable;
