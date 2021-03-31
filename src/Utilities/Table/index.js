import React from 'react'
import MUIDataTable from "mui-datatables";


export default function Tables(props) {
    let { title, columns} = props;
    let data = props.data;
    const options = {
        textLabels: {
            body: {
              noMatch: "Sorry, no matching records found",
              toolTip: "Sort",
              columnHeaderTooltip: column => `Sort for ${column.label}`
            },
            pagination: {
              next: "Next Page",
              previous: "Previous Page",
              rowsPerPage: "Rows per page:",
              displayRows: "of",
            },
            toolbar: {
              search: "Search",
              downloadCsv: "Download CSV",
              print: "Print",
              viewColumns: "View Columns",
              filterTable: "Filter Table",
            },
            filter: {
              all: "All",
              title: "FILTERS",
              reset: "RESET",
            },
            viewColumns: {
              title: "Show Columns",
              titleAria: "Show/Hide Table Columns",
            }
          },
          selectableRows: false
      };;

    return (
        <div>
            <MUIDataTable
                title={title}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}
