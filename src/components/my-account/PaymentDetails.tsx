/* eslint-disable no-console */
"use client";

import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { Spinner } from "flowbite-react";
import toast from "react-hot-toast";

import DeleteModal from "./DeleteModal";
import CheckboxInput from "../utils/Checkbox";
import Visa from "../../../public/images/visa.png";
import * as authActions from "@/redux/auth/actions";
import AddPaymentComponent from "../AddPaymentComponent";
import { useAppDispatch, useAppSelector } from "@/hooks";
import * as paymentActions from "@/redux/payment/actions";

type TSelectedPaymentMethod = {
  id: string;
};

const PaymentDetails = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.authSlice);

  const { loading } = useAppSelector(
    state => state.paymentSlice,
  );

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [cardsLoading, setCardsLoading] = useState(false);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<TSelectedPaymentMethod>();
  const [deleteModal, setDeleteModal] = useState(false);

  const cardImageMapper: any = {
    visa: Visa,
  };

  const onConfirmDeletePaymentMethod = async () => {
    const res: any = await dispatch(
      paymentActions.detachPaymentMethod({
        data: {
          payment_method_id: selectedPaymentMethod
            ? selectedPaymentMethod?.id
            : "",
        },
      }),
    );
    if (res?.payload?.status === 200) {
      setDeleteModal(false);
      getAllPaymentMethods();
      toast.success("Payment method removed successfully!");
    }
  };

  const getAllPaymentMethods = useCallback(async () => {
    setCardsLoading(true);
    const reqData = {
      stripe_id: user?.user?.metadata?.stripe_id || "",
    };
    const res: any = await dispatch(
      paymentActions.getSavedPaymentMethods({
        data: reqData,
      }),
    );
    if (res.payload.status === 200) {
      setCardsLoading(false);
      setPaymentMethods(
        res?.payload?.data?.paymentMethods?.data,
      );
    } else {
      setCardsLoading(false);
    }
  }, [dispatch, user?.user?.metadata?.stripe_id]);

  const handleDefaultCardUpdate = useCallback(
    async (card: any) => {
      if (card?.id === user?.user?.metadata?.payment_id)
        return;

      const res: any = await dispatch(
        authActions.updateMedusaCustomerAccount({
          data: {
            metadata: {
              payment_id: card?.id,
            },
          },
        }),
      );
      if (res?.payload && res?.payload?.status) {
        toast.success("Default card updated successfully");
      } else {
        toast.error("Failed to update default card");
      }
    },
    [dispatch, user?.user?.metadata?.payment_id],
  );

  useEffect(() => {
    getAllPaymentMethods();
  }, [getAllPaymentMethods, handleDefaultCardUpdate]);

  useEffect(() => {
    if (paymentMethods?.length === 1) {
      const card: any = paymentMethods[0];
      dispatch(
        authActions.updateMedusaCustomerAccount({
          data: {
            metadata: {
              payment_id: card?.id,
            },
          },
        }),
      );
    }
  }, [dispatch, paymentMethods]);

  return (
    <>
      {showForm ? (
        <div className="relative">
          <AddPaymentComponent
            showButton={true}
            onCancel={() => {
              setShowForm(false);
            }}
          />
        </div>
      ) : (
        <>
          <div className="hidden w-full justify-between border-b border-[#A93CC940] pb-[10px] md:px-5 lg:flex">
            <h1 className="heading-gradient text-[24px] font-[700]">
              Payment Details
            </h1>
          </div>
          <div className="md:px-5">
            {!cardsLoading && paymentMethods?.length > 0 ? (
              <p className="mt-[30px] font-mainText">
                Default Card
              </p>
            ) : (
              <p className="mt-[30px] font-mainText">
                Add a payment method start your stress free
                gift giving experience!
              </p>
            )}

            <div className="flex flex-col border-0 lg:border-b  lg:p-5">
              {cardsLoading ? (
                <Spinner color="pink" size="lg" />
              ) : paymentMethods?.length ? (
                paymentMethods?.map((card: any) => (
                  <>
                    <div
                      key={card?.id}
                      className={`my-2 hidden items-start gap-3 font-mainText lg:flex lg:items-center`}
                    >
                      <CheckboxInput
                        onChange={() => {
                          handleDefaultCardUpdate(card);
                        }}
                        checked={
                          card?.id ===
                          user?.user?.metadata?.payment_id
                        }
                        classes=""
                      />
                      <div
                        className={`flex items-center gap-3 p-3 ${
                          card?.id ===
                          user?.user?.metadata?.payment_id
                            ? "border border-[#A93CC9]"
                            : ""
                        }`}
                      >
                        <Image
                          src={
                            cardImageMapper[
                              card?.card.brand
                            ]
                          }
                          width="50"
                          alt="card"
                        />
                        <p>
                          Card ending in {card?.card.last4}
                        </p>
                        <div className="ms-[50px] items-center gap-3 text-[14px] lg:ms-[140px] lg:flex lg:gap-8">
                          {/* <button className="text-[#A93CC9] hover:underline">
                      Edit
                    </button> */}
                          <button
                            onClick={() => {
                              setSelectedPaymentMethod(
                                card,
                              );
                              setDeleteModal(true);
                            }}
                            className="text-[#DB2C21] hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="my-2 font-mainText lg:hidden">
                      <div
                        className={`flex items-center justify-between gap-3 border py-2 ${
                          card?.isDefault
                            ? "border-[#A93CC9] "
                            : ""
                        }`}
                      >
                        <div className="ms-2 flex items-center justify-center gap-3">
                          <Image
                            src={
                              cardImageMapper[
                                card?.card.brand
                              ]
                            }
                            width="50"
                            alt="card"
                          />
                          <p className="text-[14px]">
                            Card ending in{" "}
                            {card?.card.last4}
                          </p>
                        </div>
                        <CheckboxInput
                          onChange={() => {}}
                          checked={card?.isDefault}
                          classes=""
                        />
                      </div>
                      <div className="flex w-full items-center justify-center gap-3 border border-t-[0] text-[14px]">
                        {/* <button className="w-1/2 border-r py-2 text-[#A93CC9] hover:underline">
                    Edit
                  </button> */}
                        <button
                          onClick={() => {
                            setSelectedPaymentMethod(card);
                            setDeleteModal(true);
                          }}
                          className="w-1/2 text-[#DB2C21] hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <p className="my-5 w-full px-2 text-left font-mainText">
                  No cards Added
                </p>
              )}
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="mt-5  block rounded-[10px] border border-[#2C2434] px-[20px] py-[8px] font-mainText"
            >
              Add new card
            </button>
          </div>
          {deleteModal ? (
            <DeleteModal
              isOpen={deleteModal}
              setIsOpen={setDeleteModal}
              onConfirm={onConfirmDeletePaymentMethod}
              disabled={loading}
              loading={loading}
            />
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default PaymentDetails;
