import React, { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import {
    createColumnHelper
} from '@tanstack/react-table';
import {withSwal} from 'react-sweetalert2';

import BreadcrumbCmp from "../../components/global/Breadcrumb";
import TableCmp from "../../components/global/Table";
import { Modal, ModalBody, ModalFooter } from "../../components/global/Modal";
import TextField from "../../components/global/TextField";
import DatePicker from "../../components/global/Datepicker";
import Select from "../../components/global/Select";
import Button from "../../components/global/Button";

import EventAPI from "../../apis/dashboard/events";
import { useAuth } from "../../modules/auth";

const EventsPage = withSwal((props) => {
    const columnHelper = createColumnHelper();

    const { swal, ...rest } = props;

    const [modalShow, setModalShow] = useState(false);
    const [veneueOptions, setVeneueOptions] = useState([]);
    const [name, setName] = useState('');
    const [shortName, setShortName] = useState('');
    const [url, setUrl] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [veneue, setVeneue] = useState(0);
    const [nameError, setNameError] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const [tableData, setTableData] = useState([]);
    const [reload, setReload] = useState(false);

    const {currentUser} = useAuth();

    console.log(currentUser);
    // const { user: currentUser } = useSelector((state) => state.auth);

    const fetchData = () => {
        EventAPI.getEvents()
        .then(res => {
            setTableData(res.events)
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
        if(reload == true) {
            fetchData()
        }
    }, [reload]);


    const columns = [
      columnHelper.accessor('name'),
      columnHelper.accessor('shortname'),
      columnHelper.accessor(row => `${row.landingUrl ? row.landingUrl : ''}`, {
        id: 'landingUR',
        header: 'Landing URL'
      }),
      columnHelper.accessor('startdate'),
      columnHelper.accessor('enddate'),
      columnHelper.accessor(row => `${row.veneue ? row.veneue : ''}`, {
        id: 'veneue',
        header: 'VENEUE'
      }),
      columnHelper.display({
        header: 'Action',
        id: 'actions',
        cell: props => (
          <>
            {/* <a onClick={() => {EditBtnClick(props.row.original)}} class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
              <i class="ki-outline ki-switch fs-2"></i>
            </a>
            <a class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
              <i class="ki-outline ki-pencil fs-2"></i>
            </a> */}
            <a onClick={() => {DeleteBtnClick(props.row.original)}} class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
              <i class="ki-outline ki-trash fs-2"></i>
            </a>
          </>
        ),
      }),
    ]

    const DeleteBtnClick = (row) => {
        swal.fire({
            title: 'Delete',
            text: 'Are you sure delete this event?',
            icon: 'error',
            confirmButtonText: 'Delete',
        })
        .then((result) => {
            if (result.isConfirmed) {
                EventAPI.deleteEvent(row.id)
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

    const handleStartDateChange = (e) => {
        setStartDate(e); 
        if(endDate != null) {
            e > endDate ? setEndDateError("End Date must be later than Start Date.") : setEndDateError('');
        }
    }

    const handleEndDateChange = (e) => {
        setEndDate(e); 
        e < startDate ? setEndDateError("End Date must be later than Start Date.") : setEndDateError('');
    }

    const handleNameChange = (txt) => {
        setName(txt); 
        txt != '' ? setNameError('') : setNameError('Name is required.');
    }

    const openModal = () => {
        setVeneueOptions([
            { value: 1, label: 'Chocolate' },
            { value: 2, label: 'Strawberry' },
            { value: 3, label: 'Vanilla' },
        ])
        setName('');
        setShortName('');
        setUrl('');
        setStartDate(null);
        setEndDate(null);
        setVeneue(0);

        setModalShow(true);
    }

    const addEventFunc = async () => {
        if(name == '') {
            setNameError("Name is required.");
        }
        if(startDate != null && endDate != null && endDate < startDate) {
            setEndDateError("End Date must be later than Start Date.");
        }
        
        if(name != '' && endDateError == '') {
            const eventData = {};
            eventData.name = name;
            eventData.shortName = shortName;
            eventData.landingURL = url;
            eventData.startdate = startDate != null ? startDate.toLocaleDateString() : '';
            eventData.enddate = endDate != null ? endDate.toLocaleDateString() : '';
            eventData.veneue = veneue != 0 ? veneue : 0;
    
            EventAPI.addEvent(currentUser.id, eventData)
            .then(res => {
                setReload(true);
                setModalShow(false);
                
            })
            .catch(err => {
                console.log("Error")
            })
        }
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
                            <BreadcrumbCmp title={'Events'} />
                            {/* <!--end::Breadcrumb--> */}

                            {/* <!--begin::Title--> */}
                            <h1 class="page-heading d-flex flex-column justify-content-center text-dark fw-bolder fs-3 m-0">Events</h1>
                            {/* <!--end::Title--> */}
                        </div>
                        {/* <!--end::Page title--> */}

                        {/* <!--begin::Actions--> */}
                        <div class="d-flex align-items-center gap-2 gap-lg-3">
                            <a onClick={() => {openModal()}} class="btn btn-sm btn-flex btn-secondary align-self-center px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_invite_friends">
                            <i class="ki-outline ki-plus-square fs-3"></i>New Event</a>
                        </div>
                        {/* <!--end::Actions--> */}
                    </div>
                    {/* <!--end::Toolbar wrapper--> */}
                </div>

                <div id="kt_app_content" class="app-content flex-column-fluid mt-5 mt-lg-5">
                        <TableCmp data={tableData} columns={columns}/>
                </div>

            </div>

            <Modal show={modalShow} onHide={() => {setModalShow(false)}} title={"New Event"}>
                <ModalBody>
                    <TextField label='Name' required={true} name='name' value={name} onChange={(e) => {handleNameChange(e.target.value)}} error={nameError}/>
                    <TextField label='ShortName' name='shortname' value={shortName} onChange={(e) => setShortName(e.target.value)} />
                    <TextField label='Landing Page URL' name='landingURL' value={url} onChange={(e) => setUrl(e.target.value)} />
                    <DatePicker label='StartDate' onChange={(e) => {handleStartDateChange(e)}} value={startDate} />
                    <DatePicker label='EndDate' onChange={(e) => {handleEndDateChange(e)}} value={endDate} error={endDateError} />
                    <Select label='Veneue' name='veneue' options={veneueOptions} onChange={(e) => {setVeneue(e.value)}} />
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-sm btn-flex btn-secondary" onClick={() => {setModalShow(false)}}>
                        Cancel
                    </Button>
                    <Button className="btn btn-sm btn-flex btn-primary" onClick={() => {addEventFunc()}}>
                        <i class="ki-outline ki-plus-square fs-3"></i>&nbsp;Add Event
                    </Button>
                </ModalFooter>
            </Modal>

            {/* <!--end::Content wrapper--> */}
        </>
    );
});

export default EventsPage;