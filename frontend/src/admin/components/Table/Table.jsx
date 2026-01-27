import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import { forwardRef } from 'react';

const Table = forwardRef((props, ref) => {
  return (
    <div className='px-3  '>
      <div className='ag-theme-quartz ' style={{ height: '70vh', scrollbarWidth: '-moz-initial' }}>
        <AgGridReact
          ref={ref}
          rowData={props.rowData}
          pagination={true}
          columnDefs={props.colDefs}
          loadingCellRenderer={'<span class="ag-overlay-loading-center">Loading...</span>'}
          rowSelection={props.rowSelection}
          onSelectionChanged={props.onSelectionChanged}
        />
      </div>
    </div>
  );
});

Table.displayName = 'Table';

export default Table;
