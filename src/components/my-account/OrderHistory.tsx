"use client";

import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import DeleteModal from "./DeleteModal";
import BasicTable from "@/components/BasicTable";
import * as orderActions from "@/redux/orders/actions";
import { useAppDispatch, useAppSelector } from "@/hooks";

const OrderHistory = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(
    state => state?.authSlice?.user,
  );

  const orderHistoryTableHeaders: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Name",
      sortingFn: "alphanumeric",
    },
    // {
    //   accessorKey: "gift",
    //   header: "Gift",
    // },
    {
      accessorKey: "description",
      header: "Description",
      sortingFn: "alphanumeric",
    },
    {
      accessorKey: "date",
      header: "Date",
      sortingFn: "alphanumeric",
    },
    {
      accessorKey: "status",
      header: "Status",
      sortingFn: "alphanumeric",
      cell: ({ cell }) => {
        const cellValue = cell.getValue();

        if (cellValue === "pending") {
          return (
            <span className="text-yellow-400">
              {cellValue}
            </span>
          );
        } else if (cellValue === "success") {
          return (
            <span className="text-green-500">
              {cellValue}
            </span>
          );
        } else {
          return cellValue;
        }
      },
    },
    {
      accessorKey: "holiday",
      header: "Holiday",
      sortingFn: "alphanumeric",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
  ];

  const ordersLoading = useAppSelector(
    state => state?.orderSlice?.loading,
  );

  const getOrders = useCallback(async () => {
    if (user && user?.id) {
      const res: any = await dispatch(
        orderActions.getAllOrders(),
      );
      if (res?.payload?.orders) {
        setOrders(res?.payload?.orders);
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className=" mb-2 flex w-full justify-between border-b border-[#A93CC940] pb-[10px] md:px-5">
        <h1 className="heading-gradient text-[24px] font-[700]">
          Order History
        </h1>
      </div>
      <div className="hidden md:px-5 lg:block">
        {ordersLoading ? (
          <div className="flex h-[100px] w-full items-center justify-center">
            <Spinner size="lg" color="pink" />
          </div>
        ) : orders?.length > 0 ? (
          <BasicTable
            hoverEffect={true}
            handleRowClick={(id: string) => {
              router.push(`/order-history/${id}`);
            }}
            headers={orderHistoryTableHeaders}
            data={orders?.map(order => {
              return {
                id: order?.id,
                name: `${order?.items[0]?.metadata?.recipient?.first_name} ${order?.items[0]?.metadata?.recipient?.last_name}`,
                description: order?.items[0]?.title,
                date: order?.items[0]?.metadata
                  ?.holiday_date,
                status: order?.status,
                holiday:
                  order?.items[0]?.metadata?.holiday_name,
                amount: `$${
                  order?.items[0]?.original_total / 100
                }`,
              };
            })}
            headerClass=""
            type="striped"
          />
        ) : (
          <p className="my-5 w-full text-center font-mainText">
            No Orders to show
          </p>
        )}
      </div>

      <div className="lg:hidden">
        {ordersLoading ? (
          <div className="flex h-[100px] w-full items-center justify-center">
            <Spinner size="lg" color="pink" />
          </div>
        ) : orders?.length > 0 ? (
          orders?.map((order: any) => {
            return (
              <div
                key={order?.id}
                className="mb-[15px] flex w-full flex-col rounded-[10px] border border-[#a7a3aa] font-mainText text-[14px]"
              >
                <div className="flex w-full justify-evenly px-[10px] py-[5px]">
                  <span className="w-1/3 capitalize">
                    Name
                  </span>
                  <span>:</span>
                  <span className="w-1/3 capitalize">
                    {
                      order?.items[0]?.metadata?.recipient
                        ?.first_name
                    }{" "}
                    {
                      order?.items[0]?.metadata?.recipient
                        ?.last_name
                    }
                  </span>
                </div>
                <div className="flex w-full justify-evenly px-[10px] py-[5px]">
                  <span className="w-1/3 capitalize">
                    Description
                  </span>
                  <span>:</span>
                  <span className="w-1/3 capitalize">
                    {order?.items[0]?.title}
                  </span>
                </div>
                <div className="flex w-full justify-evenly px-[10px] py-[5px]">
                  <span className="w-1/3 capitalize">
                    date
                  </span>
                  <span>:</span>
                  <span className="w-1/3 capitalize">
                    {
                      order?.items[0]?.metadata
                        ?.holiday_date
                    }
                  </span>
                </div>
                <div className="flex w-full justify-evenly px-[10px] py-[5px]">
                  <span className="w-1/3 capitalize">
                    Holiday
                  </span>
                  <span>:</span>
                  <span className="w-1/3 capitalize">
                    {
                      order?.items[0]?.metadata
                        ?.holiday_name
                    }
                  </span>
                </div>
                <div className="flex w-full justify-evenly px-[10px] py-[5px]">
                  <span className="w-1/3 capitalize">
                    Status
                  </span>
                  <span>:</span>
                  <span
                    className={`w-1/3 capitalize ${
                      order?.status === "pending"
                        ? "text-yellow-400"
                        : order?.status === "success"
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    {order?.status}
                  </span>
                </div>
                <div className="flex w-full justify-evenly px-[10px] py-[5px]">
                  <span className="w-1/3 capitalize">
                    Amount
                  </span>
                  <span>:</span>
                  <span className="w-1/3 capitalize">
                    ${order?.items[0]?.original_total / 100}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="my-5 w-full px-2 text-left font-mainText">
            No Orders to show
          </p>
        )}
      </div>
      {deleteModal ? (
        <DeleteModal
          isOpen={deleteModal}
          setIsOpen={setDeleteModal}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default OrderHistory;
