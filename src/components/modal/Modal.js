import { FormatDate } from "@/utils/FormatDate";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const Modal = ({ isOpen, closeModal, data, updateData }) => {
  const [isRead, setIsRead] = useState(data?.isRead || false);

  const handleSave = () => {
    updateData(data.rowIndex, isRead);
    closeModal();
  };

  if (!isOpen || !data) {
    return null;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-10 text-center xl:px-48">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Chi tiết
                </Dialog.Title>
                <div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Thể loại: {data?.categoryId}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Địa điểm: {data?.city}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Ngày tạo: {data?.createdAt && FormatDate(data?.createdAt)}
                    </p>
                  </div>
                  <div className="mt-2 flex flex-row gap-10">
                    <p className="text-sm text-gray-500">
                      Ngày bắt đầu:
                      {data?.date?.startDate &&
                        FormatDate(data?.date?.startDate)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Ngày Kết thúc:
                      {data?.date?.endDate && FormatDate(data?.date?.endDate)}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Email: {data?.email}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Vé miễn phí:{" "}
                      {data?.isFreeTicketWithMenuSelect ? "Có" : "Không"}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      BBQ: {data?.isHaveBBQ ? "Có" : "Không"}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Bàn: {data?.isHaveTable ? "Có" : "Không"}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Lều: {data?.isHaveTent ? "Có" : "Không"}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Menu: {data?.menuName ? data?.menuName : "Không"}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Tên: {data?.name}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 flex gap-10">
                      Số người:
                      <p className="text-sm text-gray-500 ">
                        Người lớn: {data?.peopleInputState?.value?.adult}
                      </p>
                      <p className="text-sm text-gray-500 ">
                        Trẻ em: {data?.peopleInputState?.value?.children}
                      </p>
                      <p className="text-sm text-gray-500 ">
                        Em bé: {data?.peopleInputState?.value?.babi}
                      </p>
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Số điện thoại: {data?.phone}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Tên dich vụ: {data?.servicesName}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Giá bàn:{" "}
                      {data?.table?.title === undefined
                        ? 0
                        : data?.table?.value}{" "}
                      <u>đ</u>
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Giá lều:{" "}
                      {data?.tent?.title === undefined ? 0 : data?.tent?.value}{" "}
                      <u>đ</u>
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 flex gap-10">
                      Vé người lớn:
                      <p>Mô tả: {data?.tickets?.adult?.description}</p>
                      <p>Giá: {data?.tickets?.adult?.value}</p>
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 flex gap-10">
                      Vé trẻ em:
                      <p>Mô tả: {data?.tickets?.babi?.description}</p>
                      <p>Giá: {data?.tickets?.babi?.value}</p>
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Tổng giá: {data?.totalPriceOrder}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mt-2"
                  onClick={closeModal}
                >
                  Close
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
