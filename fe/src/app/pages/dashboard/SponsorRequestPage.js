import React, { useState, useEffect } from "react";
import { createColumnHelper } from '@tanstack/react-table';
import { withSwal } from 'react-sweetalert2';
import BreadcrumbCmp from "../../components/global/Breadcrumb";
import TableCmp from "../../components/global/Table";
import SponsorReqApi from "../../apis/publicForms/sponsorReq";

const SponsorshipRequestPage = withSwal((props) => {
  const columnHelper = createColumnHelper();
  const { swal } = props;
  const [tableData, setTableData] = useState([]);

  const fetchData = () => {
    SponsorReqApi.getSponsorRequests()
      .then(res => {
        setTableData(res.sponsorRequests)
      })
      .catch(err => {
        console.log(err)
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    columnHelper.accessor('name'),
    columnHelper.accessor('email'),
    columnHelper.accessor('involvement'),
    columnHelper.display({
      header: 'linkedIn',
      id: 'actions',
      cell: ({ row: { original } }) => (
        <>
          <a href={original.linkedIn} target="_blank" rel="noopener noreferrer">{original?.linkedIn}</a>
        </>
      ),
    }),
    columnHelper.display({
      header: 'Action',
      id: 'actions',
      cell: props => (
        <>
          <a onClick={() => { DeleteBtnClick(props.row.original) }} className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
            <i className="ki-outline ki-trash fs-2"></i>
          </a>
        </>
      ),
    }),
  ];

  const DeleteBtnClick = (row) => {
    swal.fire({
      title: 'Delete',
      text: 'Are you sure you want to delete this sponsorship request?',
      icon: 'error',
      confirmButtonText: 'Delete',
    })
      .then((result) => {
        if (result.isConfirmed) {
          SponsorReqApi.deleteSponsorRequest(row.id)
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
              <BreadcrumbCmp title={'Sponsorship Requests'} />
              <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bolder fs-3 m-0">Sponsorship Requests</h1>
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

export default SponsorshipRequestPage;
