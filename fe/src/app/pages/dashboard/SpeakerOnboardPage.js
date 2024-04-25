import React, { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import {
    createColumnHelper
} from '@tanstack/react-table';
import {withSwal} from 'react-sweetalert2';

import BreadcrumbCmp from "../../components/global/Breadcrumb";
import TableCmp from "../../components/global/Table";
import { useAuth } from "../../modules/auth";

const SpeakerOnboardPage = withSwal((props) => {
    const columnHelper = createColumnHelper();

    const { swal, ...rest } = props;

    const [tableData, setTableData] = useState([]);

    const columns = [
      columnHelper.accessor('name'),
      columnHelper.accessor('email'),
      columnHelper.accessor('speaker'),
      columnHelper.display({
        header: 'Action',
        id: 'actions',
        cell: props => (
          <>
            <a onClick={() => {console.log("click")}} class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
              <i class="ki-outline ki-trash fs-2"></i>
            </a>
          </>
        ),
      }),
    ]


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
                            <BreadcrumbCmp title={'Speaker Onboarding'} />
                            {/* <!--end::Breadcrumb--> */}

                            {/* <!--begin::Title--> */}
                            <h1 class="page-heading d-flex flex-column justify-content-center text-dark fw-bolder fs-3 m-0">Speaker Onboarding</h1>
                            {/* <!--end::Title--> */}
                        </div>
                        {/* <!--end::Page title--> */}

                    </div>
                    {/* <!--end::Toolbar wrapper--> */}
                </div>

                <div id="kt_app_content" class="app-content flex-column-fluid mt-5 mt-lg-5">
                        <TableCmp data={tableData} columns={columns}/>
                </div>

            </div>

        </>
    );
});

export default SpeakerOnboardPage;