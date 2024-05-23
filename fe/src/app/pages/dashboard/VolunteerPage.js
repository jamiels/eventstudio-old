import React, { useState, useEffect } from "react";
import { createColumnHelper } from '@tanstack/react-table';
import { withSwal } from 'react-sweetalert2';
import BreadcrumbCmp from "../../components/global/Breadcrumb";
import TableCmp from "../../components/global/Table";
import VolunteerApi from "../../apis/publicForms/volunteer";

const VolunteerPage = withSwal((props) => {
  const columnHelper = createColumnHelper();
  const { swal } = props;
  const [tableData, setTableData] = useState([]);

  const fetchData = () => {
    VolunteerApi.getVolunteerRequests()
      .then(res => {
        setTableData(res.volunteers)
      })
      .catch(err => {
        console.log(err)
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    columnHelper.accessor('full Name'),
    columnHelper.accessor('email'),
    columnHelper.accessor('linkedInURL', { header: 'LinkedIn URL' }), // Display LinkedIn URL
    columnHelper.accessor('mobilePhone', { header: 'Mobile Phone' }), // Display Mobile Phone
    columnHelper.accessor('telegramID', { header: 'Telegram ID' }), // Display Telegram ID
    columnHelper.accessor('communicationTools', { header: 'Communication Tools' }), // Display Communication Tools
    columnHelper.accessor('areasOfSupport', { header: 'Areas of Support' }), // Display Areas of Support
    columnHelper.accessor('businessAttire', { header: 'Business Attire' }), // Display Business Attire
    columnHelper.display({
      header: 'Action',
      id: 'actions',
      cell: props => (
        <>
          <div className="w-100 d-flex gap-2 flex-row justify-content-end">
            <a onClick={() => { DeleteBtnClick(props.row.original) }} className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
              <i className="ki-outline ki-trash fs-2"></i>
            </a>
          </div>
        </>
      ),
    }),
  ];

  const DeleteBtnClick = (row) => {
    swal.fire({
      title: 'Delete',
      text: 'Are you sure you want to delete this volunteer?',
      icon: 'error',
      confirmButtonText: 'Delete',
    })
      .then((result) => {
        if (result.isConfirmed) {
          VolunteerApi.deleteVolunteerRequest(row.id)
            .then((data) => {
              console.log(data);
              fetchData();
            })
            .catch(err => {
              console.log(err)
            });
        }
      });
  }

  return (
    <>
      <div className="d-flex flex-column flex-column-fluid">
        <div id="kt_app_toolbar" className="app-toolbar pt-3 pt-lg-3">
          <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
            <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
              <BreadcrumbCmp title={'Volunteers'} />
              <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bolder fs-3 m-0">Volunteers</h1>
            </div>
          </div>
        </div>
        <div id="kt_app_content" className="app-content flex-column-fluid mt-5 mt-lg-5">
          <TableCmp data={tableData} columns={columns} />
        </div>
      </div>
    </>
  );
});

export default VolunteerPage;
