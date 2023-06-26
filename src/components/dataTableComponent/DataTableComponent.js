import React, { memo } from "react";
import DataTable from "react-data-table-component";
import Columns from "../../constant/TableColumns";
import TableStyles from "@/constant/TableStyles";

const DataTableComponent = memo(({ data, pending, height }) => {
  const columns = Columns();

  const tableHeight = window.innerHeight - (height + 230);

  return (
    <div>
      <DataTable
        noHeader
        noTableHead
        columns={columns}
        data={data}
        reorder={true}
        responsive
        progressPending={pending}
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
      />
    </div>
  );
});

DataTableComponent.displayName = "DataTableComponent";

export default DataTableComponent;
