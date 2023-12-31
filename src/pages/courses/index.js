import DataTableComponent from "@/components/dataTableComponent/DataTableComponent";
import { getOrders } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import useHeight from "../../hooks/useHeight";

export default function Courses() {
  const [data, setData] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");
  const [isReadFilter, setIsReadFilter] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const { height, refHeight } = useHeight();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      let formatIsRead = null;

      if (isReadFilter === "true") {
        formatIsRead = true;
      }

      if (isReadFilter === "false") {
        formatIsRead = false;
      }

      const orderList = await getOrders(
        categoryFilter,
        cityFilter,
        formatIsRead,
        phoneSearch
      );

      setData(orderList);
      setIsLoading(false);
    } catch (error) {
      console.log("fetchData ~ error:", error);
    }
  };

  const handleCityChange = (e) => {
    setCityFilter(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };
  const handlePhoneSearch = (e) => {
    setPhoneSearch(e.target.value);
  };
  const handleIsReadChange = (e) => {
    setIsReadFilter(e.target.value);
  };

  const handleApplyFilter = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col mt-4 w-full gap-8">
      <div className="flex flex-col">
        <div className="flex flex-col gap-6 mx-4" ref={refHeight}>
          <div className="flex flex-row w-full justify-end gap-7 max-sm:flex-col ">
            <div className="flex flex-row gap-7 justify-end max-sm:justify-between">
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Thể Loại
                </label>
                <select
                  value={categoryFilter}
                  onChange={handleCategoryChange}
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                  <option value="" selected={true}>
                    Chọn thể loại
                  </option>
                  <option value="glamping">Cắm trại</option>
                  <option value="horse_clubs">Cưỡi ngựa</option>
                  <option value="beach_clubs">Đi biển</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Địa điểm
                </label>
                <select
                  value={cityFilter}
                  onChange={handleCityChange}
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                  <option value="" selected={true}>
                    Chọn địa điểm
                  </option>
                  <option value="lamdong">Lâm Đồng</option>
                  <option value="hanoi">Hà Nội</option>
                  <option value="saigon">Sài Gòn</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="isRead"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Trạng thái
                </label>
                <select
                  value={isReadFilter}
                  onChange={handleIsReadChange}
                  id="isRead"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                >
                  <option value="" selected={false}>
                    Chọn trạng thái
                  </option>
                  <option value={true}>Đã duyệt</option>
                  <option value={false}>Chưa duyệt</option>
                </select>
              </div>
            </div>
            <div className="">
              <div className="flex flex-col ">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Số điện thoại
                </label>
                <input
                  value={phoneSearch}
                  onChange={handlePhoneSearch}
                  type="text"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                />
              </div>
            </div>
          </div>
          <div className="w-full justify-end flex">
            <button
              onClick={handleApplyFilter}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none mb-2"
            >
              Áp dụng
            </button>
          </div>
        </div>
        <DataTableComponent
          data={data}
          reorder={true}
          responsive
          height={height}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
