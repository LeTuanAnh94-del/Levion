import DataTableComponent from "@/components/dataTableComponent/DataTableComponent";
import { getOrders } from "@/firebase/firebase";
import { useEffect, useState } from "react";

export default function Courses() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderList = await getOrders();
        setData(orderList);

        const uniqueCategories = [
          ...new Set(orderList.map((item) => item.categoryId)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.log("🚀 ~ file: index.js:23 ~ fetchData ~ error:", error);
      }
    };

    fetchData();
  }, []);

  const searchData = () => {
    const results = data.filter((item) => item.phone.includes(searchValue));
    setSearchResults(results);
  };

  const filterDataByCategory = () => {
    let filteredData = data;
    if (selectedCategory) {
      filteredData = filteredData.filter(
        (item) => item.categoryId === selectedCategory
      );
    }
    setSearchResults(filteredData);
  };

  const handleSearch = () => {
    searchData();
    filterDataByCategory();
  };

  return (
    <div className="flex flex-col mt-4 w-full gap-8">
      <div className="flex flex-col items-end gap-4 mr-4">
        <div>
          <div className="flex flex-row gap-10">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Thể loại</option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tìm kiếm"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="flex text-white ml-40 mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Áp dụng
          </button>
        </div>
      </div>
      <div>
        <DataTableComponent
          data={searchResults.length > 0 ? searchResults : data}
          reorder={true}
          responsive
        />
      </div>
    </div>
  );
}
