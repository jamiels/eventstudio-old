import React, { useState, useEffect } from "react";
import { createColumnHelper } from '@tanstack/react-table';
import { withSwal } from 'react-sweetalert2';
import BreadcrumbCmp from "../../components/global/Breadcrumb";
import TableCmp from "../../components/global/Table";
import SponsorOnboardingApi from "../../apis/publicForms/speakerBoarding";

const SpeakerOnboardingPage = withSwal((props) => {
  const columnHelper = createColumnHelper();
  const { swal } = props;
  const [tableData, setTableData] = useState([]);

  const fetchData = () => {
    SponsorOnboardingApi.getSpeakerOnboardings()
      .then(res => {
        setTableData(res.speakerOnboardings)
      })
      .catch(err => {
        console.log(err)
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    columnHelper.accessor('fullName'),
    columnHelper.accessor('email'),
    columnHelper.accessor('bio'),
    columnHelper.accessor('linkedInURL', {
      Header: 'LinkedIn',
      Cell: ({ value }) => <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>
    }),
    columnHelper.accessor('twitterURL', {
      Header: 'Twitter',
      Cell: ({ value }) => <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>
    }),
    columnHelper.accessor('headshotURL', {
      Header: 'Headshot',
      Cell: ({ value }) => <img src={value} alt="Headshot" style={{ width: '50px', height: '50px' }} />
    }),
    columnHelper.accessor('title'),
    columnHelper.accessor('organization'),
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
      text: 'Are you sure you want to delete this sponsor onboarding request?',
      icon: 'error',
      confirmButtonText: 'Delete',
    })
      .then((result) => {
        if (result.isConfirmed) {
          SponsorOnboardingApi.deleteSpeakerOnboarding(row.id)
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
              <BreadcrumbCmp title={'Speaker Onboarding'} />
              <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bolder fs-3 m-0">Speaker Onboarding</h1>
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

export default SpeakerOnboardingPage;
