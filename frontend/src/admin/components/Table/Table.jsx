import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

const Table = (props) => {
  return (
    <div className="px-3  ">
      <div
        className="ag-theme-quartz "
        style={{ height: "70vh", scrollbarWidth: "-moz-initial" }}
      >
        <AgGridReact
          rowData={props.rowData}
          pagination={true}
          columnDefs={props.colDefs}
          loadingCellRenderer={
            '<span class="ag-overlay-loading-center">Loading...</span>'
          }
        />
      </div>
    </div>
  );
};

export default Table;