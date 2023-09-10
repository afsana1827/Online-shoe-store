import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { TbCurrencyTaka } from "react-icons/tb";

const ProductDetailsModal: React.FC<{ data: any }> = ({ data }) => {
  const products = data.items.products;
  const contacts = data.contact_info;

  return (
    <Dialog.Root>
      <Dialog.Trigger className="text-theme-primary text-base">
        View Details
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className=" bg-black/70 fixed inset-0">
          <Dialog.Content className=" bg-white w-2/3 rounded shadow-xl p-4 fixed border border-theme-light-gray top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Title className=" mb-8 text-theme-primary border-b border-gray-400 text-center text-xl font-bold ">
              Product Details
            </Dialog.Title>
            <div className=" flex items-center gap-16 text-theme-primary text-sm">
              {products.map((product: any, index: number) => {
                return (
                  <div key={index} className=" w-full space-y-3">
                    <h6 className=" text-xs">
                      <span className=" text-sm font-semibold pr-2">Id:</span>
                      {product.id}
                    </h6>
                    <h6 className=" text-xs">
                      <span className=" text-sm font-semibold pr-2">Name:</span>
                      {product.name}
                    </h6>
                    <h6 className=" text-xs">
                      <span className=" text-sm font-semibold pr-2">
                        Quantity:
                      </span>
                      {product.quantity}
                    </h6>
                    <h6 className=" flex items-center text-xs">
                      <span className=" text-sm font-semibold pr-2">
                        Price:
                      </span>
                      <TbCurrencyTaka size={16} />
                      {product.price}
                    </h6>
                    <h6 className=" flex items-center text-xs">
                      <span className=" text-sm font-semibold pr-2">
                        Dicount:
                      </span>
                      <TbCurrencyTaka size={16} />
                      {product.discount}
                    </h6>
                  </div>
                );
              })}
            </div>
            <div className=" my-5 flex items-center justify-between">
              <div className="my-5 flex-1 ">
                <Dialog.Title className="  text-theme-primary text-xl font-bold ">
                  Contact Informations
                </Dialog.Title>
                <div className=" mt-5 text-theme-primary text-sm">
                  <div className="  space-y-3">
                    <div className=" text-xs flex items-center">
                      <span className=" text-sm font-semibold w-20">
                        Full Name:
                      </span>
                      <h6>{contacts.full_name}</h6>
                    </div>
                    <div className=" text-xs flex items-center ">
                      <span className=" text-sm font-semibold w-20 ">
                        Email:
                      </span>
                      <h6>{contacts.email}</h6>
                    </div>
                    <div className=" text-xs flex items-center">
                      <span className=" text-sm font-semibold w-20 ">
                        Address:
                      </span>
                      <h6 className=" flex ">
                        {contacts.area}, {contacts.postal_code}, {contacts.city}
                        , {contacts.district}
                      </h6>
                    </div>
                    <div className=" text-xs flex items-center">
                      <span className=" text-sm font-semibold w-20 ">
                        Phone:
                      </span>
                      <h6>{contacts.phone}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" my-5 flex-1">
                <Dialog.Title className=" text-theme-primary text-xl font-bold ">
                  Other Informations
                </Dialog.Title>
                <div className="  mt-5 text-theme-primary text-sm">
                  <div className="space-y-3">
                    <div className=" text-xs flex items-center">
                      <span className=" text-sm font-semibold w-20">
                        Order Id:
                      </span>
                      <h6>{data.id}</h6>
                    </div>
                    <div className=" text-xs flex items-center ">
                      <span className=" text-sm font-semibold w-20 ">
                        Order No:
                      </span>
                      <h6>{data.orderNumber}</h6>
                    </div>
                    <div className=" text-xs flex items-center ">
                      <span className=" text-sm font-semibold w-[86px] ">
                        UpdatedAt:
                      </span>
                      <h6 className=" flex ">
                        {new Date(data.updatedAt).toLocaleString()}
                      </h6>
                    </div>
                    <div className=" text-xs flex items-center">
                      <span className=" text-sm font-semibold w-20 ">
                        User Id:
                      </span>
                      <h6>{data.userId}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Dialog.Close asChild className=" absolute top-3 right-3">
              <button className="">
                <Cross2Icon className=" w-5 h-5 rounded-full text-violet-300 hover:text-violet-400" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ProductDetailsModal;
