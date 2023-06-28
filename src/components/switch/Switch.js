export const Switch = ({ isRead }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer mt-2">
      <input
        type="checkbox"
        value={true}
        className="sr-only peer"
        checked={isRead ? true : false}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
      <span className="ml-3 text-sm font-medium text-gray-900">Duyệt</span>
    </label>
  );
};
