import React, { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import {
  createColumnHelper
} from '@tanstack/react-table';
import { withSwal } from 'react-sweetalert2';

import BreadcrumbCmp from "../../components/global/Breadcrumb";
import TableCmp from "../../components/global/Table";
import { useAuth } from "../../modules/auth";
import SpeakingReqApi from "../../apis/publicForms/speakingReq";


const SpeakingRequestPage = withSwal((props) => {
  const columnHelper = createColumnHelper();

  const { swal, ...rest } = props;

  const [tableData, setTableData] = useState([]);
  const [reload, setReload] = useState(false);


  const fetchData = () => {
    SpeakingReqApi.getSpeakingRequests()
      .then(res => {
        setTableData(res.speakingRequests)
        setReload(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    if (reload == true) {
      fetchData()
    }
  }, [reload]);








  const columns = [
    columnHelper.accessor('fullName', { header: 'Full Name' }),
    columnHelper.accessor('email', { header: 'Email' }),
    columnHelper.accessor('organization', { header: 'Organization' }),
    columnHelper.accessor('title', { header: 'Title' }),
    columnHelper.accessor('panelists', { header: 'Panelists', Cell: ({ value }) => value ? 'Yes' : 'No' }),
    columnHelper.accessor('abstract', { header: 'Abstract' }),
    columnHelper.display({
      header: 'linkedIn URL',
      id: 'actions',
      cell: ({ row: { original } }) => (
        <>
          <a href={original.linkedInURL} target="_blank" rel="noopener noreferrer">{original?.linkedInURL}</a>
        </>
      ),
    }),
    columnHelper.accessor('sponsorshipInterest', {
      header: 'Sponsorship Interest',
      Cell: ({ value }) => {
        console.log("🚀 ~ SpeakingRequestPage ~ value:", value)
        if (value?.toLowerCase() === 'yes') return 'Yes';
        else if (value?.toLowerCase() === 'possibly') return 'Possibly';
        else return 'No';
      }
    }), columnHelper.display({
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
  ]


  const DeleteBtnClick = (row) => {
    swal.fire({
      title: 'Delete',
      text: 'Are you sure delete this speakingRequest?',
      icon: 'error',
      confirmButtonText: 'Delete',
    })
      .then((result) => {
        if (result.isConfirmed) {
          SpeakingReqApi.deleteSpeakingRequest(row.id)
            .then((data) => {
              console.log(data);
              setReload(true);
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
  }

  return (
    <>
      {/* <!--begin::Content wrapper--> */}
      <div class="d-flex flex-column flex-column-fluid">
        <div id="kt_app_toolbar" class="app-toolbar pt-3 pt-lg-3">

          {/* <!--begin::Toolbar wrapper--> */}
          <div class="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">

            {/* <!--begin::Page title--> */}
            <div class="page-title d-flex flex-column justify-content-center gap-1 me-3">
              {/* <!--begin::Breadcrumb--> */}
              <BreadcrumbCmp title={'Speaking Requests'} />
              {/* <!--end::Breadcrumb--> */}

              {/* <!--begin::Title--> */}
              <h1 class="page-heading d-flex flex-column justify-content-center text-dark fw-bolder fs-3 m-0">Speaking Requests</h1>
              {/* <!--end::Title--> */}
            </div>
            {/* <!--end::Page title--> */}

          </div>
          {/* <!--end::Toolbar wrapper--> */}
        </div>

        <div id="kt_app_content" class="app-content flex-column-fluid mt-5 mt-lg-5">
          <TableCmp data={tableData} columns={columns} />
        </div>

      </div>

    </>
  );
});

export default SpeakingRequestPage;