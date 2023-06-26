const Columns = () => {
  return [
    {
      name: "Thể loại",
      selector: (row) => {
        return <p>{row.categoryId}</p>;
      },
    },
    {
      name: "Địa điểm",
      selector: (row) => {
        return <p>{row.city}</p>;
      },
    },
    {
      name: "Ngày tạo",
      selector: (row) => {
        const timestamp = row.createdAt;
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleString();
      },
      sortable: true,
      width: "200px",
    },
    {
      name: "Ngày",
      selector: (row) => {
        const { startDate, endDate } = row.date;
        const startDateString = startDate
          ? startDate.toDate().toLocaleDateString()
          : "";
        const endDateString = endDate
          ? endDate.toDate().toLocaleDateString()
          : "";
        return (
          <div className="flex flex-col gap-2">
            <p>Bắt đầu: {startDateString}</p>
            <p>Kết thúc: {endDateString}</p>
          </div>
        );
      },
      sortable: true,
      width: "200px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width: "200px",
    },
    {
      name: "Vé miễn phí",
      selector: (row) => {
        return row.isFreeTicketWithMenuSelect ? "Có" : "Không";
      },
      width: "150px",
    },
    {
      name: "BBQ",
      selector: (row) => {
        return row.isHaveBBQ ? "Có" : "Không";
      },
    },
    {
      name: "Bàn",
      selector: (row) => {
        return row.isHaveTable ? "Có" : "Không";
      },
    },
    {
      name: "Lều",
      selector: (row) => {
        return row.isHaveTent ? "Có" : "Không";
      },
    },
    {
      name: "Menu",
      selector: (row) => {
        return row.menuIndex ? "Có" : "Không";
      },
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Số người",
      selector: (row) =>
        row.peopleInputState.value ? (
          <div className="flex flex-col gap-1">
            <p>Người lớn: {row.peopleInputState.value.adult}</p>
            <p>Trẻ con:{row.peopleInputState.value.babi}</p>
            <p>Trẻ em :{row.peopleInputState.value.children}</p>
          </div>
        ) : (
          ""
        ),
    },
    {
      name: "Số điện thoại",
      selector: (row) => row.phone,
      width: "150px ",
    },
    {
      name: "Tên dịch vụ",
      selector: (row) => row.servicesName,
      width: "500px",
    },
    {
      name: "Giá bàn",
      selector: (row) =>
        row.table.description === undefined ? null : (
          <div className="flex flex-col gap-1">
            <p>Mô tả: {row.table.description}</p>
            <p>Giá: {row.table.value}</p>
          </div>
        ),
      width: "300px",
    },
    {
      name: "Giá lều",
      selector: (row) =>
        row.tent.title === undefined ? null : (
          <p>Giá: {row.tent.description}</p>
        ),
    },
    {
      name: "Giá vé người lớn",
      selector: (row) =>
        row.tickets.adult ? (
          <div>
            <p>Mô tả: {row.tickets.adult.description}</p>
            <p>Giá: {row.tickets.adult.value}</p>
          </div>
        ) : null,
      width: "300px",
    },
    {
      name: "Giá vé trẻ em",
      selector: (row) =>
        row.tickets.babi ? (
          <div>
            <p> Mô tả: {row.tickets.babi.description}</p>
            <p>Giá: {row.tickets.babi.value}</p>
          </div>
        ) : null,
      width: "400px",
    },
    {
      name: "Tổng giá",
      selector: (row) => row.totalPriceOrder,
      width: "100px",
    },
  ];
};

export default Columns;
