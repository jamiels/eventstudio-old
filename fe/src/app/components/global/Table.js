import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  createColumnHelper
} from '@tanstack/react-table';

import clsx from 'clsx';


function TableCmp(props) {

const table = useReactTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
});

return (
  <div className="dataTables_wrapper dt-bootstrap4 no-footer">
    <div className="table-responsive">
        <table className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="min-w-125px sorting">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="fw-semibold text-gray-600">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="odd">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row">
        {props.data.length > 0 && (
          <div className="col-xs-6 col-sm-6 col-md-6 d-flex align-items-center justify-content-end justify-content-md-end">
            <div className="dataTables_length" id="kt_customers_table_length">
              <label>
                <select
                  name="kt_customers_table_length"
                  aria-controls="kt_customers_table"
                  className="form-select form-select-sm form-select-solid"
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </label>
            </div>
          </div>
        )}
        {props.data.length > table.getState().pagination.pageSize && (
          <div className="col-xs-6 col-sm-6 col-md-6 d-flex align-items-center">
            <div
              className="dataTables_paginate paging_simple_numbers"
              id="kt_customers_table_paginate"
            >
              <ul className="pagination">
                <li
                  className={clsx(
                    'paginate_button page-item previous',
                    !table.getCanPreviousPage() && 'disabled',
                  )}
                  id="kt_customers_table_previous"
                >
                  <button
                    className="page-link"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <i className="previous"></i>
                  </button>
                </li>
                <li
                  className={clsx(
                    'paginate_button page-item next',
                    !table.getCanNextPage() && 'disabled',
                  )}
                  id="kt_customers_table_next"
                >
                  <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="page-link"
                  >
                    <i className="next"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
  </div>
);
};


export default TableCmp;