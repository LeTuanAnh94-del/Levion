import React, { memo, useState } from "react";
import DataTable from "react-data-table-component";

import Columns from "../../constant/TableColumns";
import TableStyles from "../../constant/TableStyles";
import Modal from "../modal/Modal";

const DataTableComponent = memo(({ data, isLoading, height }) => {
  const columns = Columns();
  const tableHeight = window.innerHeight - (height + 230);

  const conditionalRowStyles = [
    {
      when: (row) => row.isRead === true,
      style: {
        backgroundColor: "skyblue",
      },
    },
  ];

  const [selectedRowData, setSelectedRowData] = useState(null);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(row) {
    setSelectedRowData(row);
    setIsOpen(true);
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        data={selectedRowData}
        setIsOpen={setIsOpen}
      />
      <DataTable
        noTableHead={isLoading ? true : false}
        columns={columns}
        data={data}
        reorder={true}
        responsive
        progressPending={isLoading}
        customStyles={TableStyles}
        pagination
        fixedHeader
        subHeader
        fixedHeaderScrollHeight={tableHeight.toString() + "px"}
        highlightOnHover
        selectableRowsVisibleOnly
        persistTableHead
        selectableRowsHighlight
        expandableRowsHideExpander
        onRowClicked={(row) => openModal(row)}
        conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  );
});

DataTableComponent.displayName = "DataTableComponent";

export default DataTableComponent;
