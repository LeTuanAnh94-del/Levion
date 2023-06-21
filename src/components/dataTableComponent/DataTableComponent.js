import React, { memo } from "react";
import DataTable from "react-data-table-component";
import Columns from "../../constant/TableColumns";
import TableStyles from "@/constant/TableStyles";

const DataTableComponent = memo(({ data, pending }) => {
  const columns = Columns();

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        reorder={true}
        responsive
        progressPending={pending}
        customStyles={TableStyles}
        pagination
      />
    </div>
  );
});

DataTableComponent.displayName = "DataTableComponent";

export default DataTableComponent;
