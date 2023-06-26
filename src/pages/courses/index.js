import DataTableComponent from "@/components/dataTableComponent/DataTableComponent";
import { getOrders } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import useHeight from "../../hooks/useHeight";

export default function Courses() {
  const [data, setData] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { height, refHeight } = useHeight();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const orderList = await getOrders(
        categoryFilter,
        cityFilter,
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

  const handleApplyFilter = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col mt-4 w-full gap-8">
      <div className="flex flex-col">
        <div className="flex flex-col gap-6 mr-4" ref={refHeight}>
          <div className="flex flex-row w-full justify-end gap-7">
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Thể Loại
              </label>
              <select
                value={categoryFilter}
                onChange={handleCategoryChange}
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Địa điểm
              </label>
              <select
                value={cityFilter}
                onChange={handleCityChange}
                id="city"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" selected={true}>
                  Chọn địa điểm
                </option>
                <option value="lamdong">Lâm Đồng</option>
                <option value="hanoi">Hà Nội</option>
                <option value="saigon">Sài Gòn</option>
              </select>
            </div>
            <div className="flex flex-col ">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Số điện thoại
              </label>
              <input
                value={phoneSearch}
                onChange={handlePhoneSearch}
                type="text"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div className="w-full justify-end flex">
            <button
              onClick={handleApplyFilter}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
