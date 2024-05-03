import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
    createColumnHelper
} from '@tanstack/react-table';
import { withSwal } from 'react-sweetalert2';

import BreadcrumbCmp from "../../components/global/Breadcrumb";
import TableCmp from "../../components/global/Table";
import { Modal, ModalBody, ModalFooter } from "../../components/global/Modal";
import TextField from "../../components/global/TextField";
import DatePicker from "../../components/global/Datepicker";
import Select from "../../components/global/Select";
import Button from "../../components/global/Button";

import EventAPI from "../../apis/dashboard/events";
import { useAuth } from "../../modules/auth";
import { useSpace } from "../../context/space.provider";

const EventsPage = withSwal((props) => {
    const { selectedSpace } = useSpace();

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
    const [themes, setThemes] = useState('');
    const [sponsorshipDeckUrl, setSponsorshipDeckUrl] = useState('');
    const [nameError, setNameError] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const [tableData, setTableData] = useState([]);
    const [reload, setReload] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [eventToUpdate, setEventToUpdate] = useState(null);

    const { currentUser } = useAuth();
    const navigate = useNavigate();

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

    const fetchVenueNames = () => {
        EventAPI.getVeneue()
            .then(res => {
                setVeneueOptions(res.venueNames?.map(item => ({
                    value: item?.id,
                    label: item?.name
                })))

                setReload(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchData()
        fetchVenueNames()
    }, []);

    useEffect(() => {
        if (reload) {
            fetchData()
        }
    }, [reload]);


    const handleToggleActive = (event) => {
        const updatedEvent = { ...event, is_active: !event.is_active };
        EventAPI.updateEvent(event.id, updatedEvent)
            .then(res => {
                console.log("Event status updated:", res);
                // Reload data after successful update
                fetchData();
            })
            .catch(err => {
                console.error("Error updating event status:", err);
            });
    };

    const columns = [
        columnHelper.accessor('id'),
        columnHelper.accessor('name'),
        columnHelper.accessor('shortname'),
        columnHelper.display({
            header: 'landing Url',
            id: 'actions',
            cell: ({ row: { original } }) => (
                <a href={original.landingUrl} target="_blank" rel="noopener noreferrer">{original?.landingUrl}</a>
            ),
        }),
        columnHelper.accessor('sponsorshipDeckUrl', { header: 'sponsorship Deck Url' }),
        columnHelper.accessor('theme'),
        columnHelper.accessor('startdate'),
        columnHelper.accessor('enddate'),
        columnHelper.accessor(row => `${row.veneue ? row.veneue : ''}`, {
            id: 'veneue',
            header: 'VENEUE'
        }),
        columnHelper.display({
            header: 'Links',
            id: 'links',
            cell: ({ row: { original } }) => (
                <div className="d-flex flex-row gap-3">
                    <a href={`/public/speak/${original.uuid}`} target="_blank" rel="noopener noreferrer">Speak</a> |
                    <a href={`/public/sponsor/${original.uuid}`} target="_blank" rel="noopener noreferrer">Sponsor</a> |
                    <a href={`/public/onboard/${original.uuid}`} target="_blank" rel="noopener noreferrer">Onboard</a> |
                    <a href={`/public/volunteer/${original.uuid}`} target="_blank" rel="noopener noreferrer">Volunteer</a>
                </div>
            ),
        }),

        columnHelper.display({
            header: 'Action',
            id: 'actions',
            cell: props => (
                <>
                    <div className="w-100 d-flex flex-row gap-2 align-items-start justify-content-start">
                        <a onClick={() => { DeleteBtnClick(props.row.original) }} class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
                            <i class="ki-outline ki-trash fs-2"></i>
                        </a>
                        <a onClick={() => navigate(`/dashboard/events/details/${props.row.original.id}`)} class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm ml-3">
                            <i class="bi bi-ticket-detailed"></i>
                        </a>
                        <a onClick={() => openEditModal(props.row.original)} className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm ml-3">
                            <i className="bi bi-pencil"></i>
                        </a>
                        <div class="form-check form-switch d-flex justify-content-center align-items-center">
                            <input class="form-check-input" checked={props.row.original.is_active} onChange={() => handleToggleActive(props.row.original)} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            {/* <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label> */}
                        </div>
                    </div>
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
        if (endDate != null) {
            e > endDate ? setEndDateError("End Date must be later than Start Date.") : setEndDateError('');
        }
    }

    const handleEndDateChange = (e) => {
        setEndDate(e);
        e < startDate ? setEndDateError("End Date must be later than Start Date.") : setEndDateError('');
    }

    const handleNameChange = (txt) => {
        setName(txt);
        txt !== '' ? setNameError('') : setNameError('Name is required.');
    }

    const openModal = () => {
        setName('');
        setShortName('');
        setUrl('');
        setStartDate(null);
        setEndDate(null);
        setVeneue(0);
        setThemes('');
        setSponsorshipDeckUrl('');
        setModalShow(true);
        setIsEditMode(false);
        setEventToUpdate(null);
    }

    const addEventFunc = async () => {
        if (name === '') {
            setNameError("Name is required.");
        }
        if (startDate != null && endDate != null && endDate < startDate) {
            setEndDateError("End Date must be later than Start Date.");
        }

        if (name !== '' && endDateError === '') {
            const eventData = {
                name,
                shortName,
                landingURL: url,
                startdate: startDate != null ? startDate.toLocaleDateString() : '',
                enddate: endDate != null ? endDate.toLocaleDateString() : '',
                veneue: veneue !== 0 ? veneue : 0,
                themes,
                sponsorshipDeckUrl,
                space_id: selectedSpace?.space_id
            };

            if (isEditMode) {
                EventAPI.updateEvent(eventToUpdate.id, eventData)
                    .then(res => {
                        console.log("res", res);
                        setReload(true);
                        setModalShow(false);
                    })
                    .catch(err => {
                        console.log("Error updating event:", err);
                    });
            } else {
                EventAPI.addEvent(currentUser.id, eventData)
                    .then(res => {
                        console.log("res", res);
                        setReload(true);
                        setModalShow(false);
                    })
                    .catch(err => {
                        console.log("Error adding new event:", err);
                    });
            }
        }
    }

    const openEditModal = (event) => {
        setName(event.name);
        setShortName(event.shortname);
        setUrl(event.landingURL);
        setStartDate(event.startdate ? new Date(event.startdate) : null);
        setEndDate(event.enddate ? new Date(event.enddate) : null);
        setVeneue(event.veneue);
        setThemes(event.theme);
        setSponsorshipDeckUrl(event.sponsorshipDeckUrl);
        setModalShow(true);
        setIsEditMode(true);
        setEventToUpdate(event);
    };

    return (
        <>
            <div className="d-flex flex-column flex-column-fluid">
                <div id="kt_app_toolbar" className="app-toolbar pt-3 pt-lg-3">
                    <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                        <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
                            <BreadcrumbCmp title={'Events'} />
                            <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bolder fs-3 m-0">Events</h1>
                        </div>
                        <div className="d-flex align-items-center gap-2 gap-lg-3">
                            <button onClick={openModal} className="btn btn-sm btn-flex btn-dark align-self-center px-3">
                                <i className="ki-outline ki-plus-square fs-3"></i>New Event
                            </button>
                        </div>
                    </div>
                </div>

                <div id="kt_app_content" className="app-content flex-column-fluid mt-5 mt-lg-5">
                    <TableCmp data={tableData} columns={columns} />
                </div>
            </div>

            <Modal show={modalShow} onHide={() => { setModalShow(false) }} title={isEditMode ? "Edit Event" : "New Event"}>
                <ModalBody>
                    <TextField label='Name' required={true} name='name' value={name} onChange={(e) => { handleNameChange(e.target.value) }} error={nameError} />
                    <TextField label='ShortName' name='shortname' value={shortName} onChange={(e) => setShortName(e.target.value)} />
                    <TextField label='Landing Page URL' name='landingURL' value={url} onChange={(e) => setUrl(e.target.value)} />
                    <TextField label='Theme' name='themes' value={themes} onChange={(e) => setThemes(e.target.value)} />
                    <TextField label='Sponsorship Deck URL' name='sponsorshipDeckUrl' value={sponsorshipDeckUrl} onChange={(e) => setSponsorshipDeckUrl(e.target.value)} />
                    <DatePicker label='StartDate' onChange={(e) => { handleStartDateChange(e) }} value={startDate} />
                    <DatePicker label='EndDate' onChange={(e) => { handleEndDateChange(e) }} value={endDate} error={endDateError} />
                    <Select label='Veneue' name='veneue' options={veneueOptions} onChange={(e) => { setVeneue(e.value) }} />
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-sm btn-flex btn-secondary" onClick={() => { setModalShow(false) }}>
                        Cancel
                    </Button>
                    <Button className="btn btn-sm btn-flex btn-primary" onClick={() => { addEventFunc() }}>
                        {isEditMode ? "Update Event" : <><i className="ki-outline ki-plus-square fs-3"></i>&nbsp;Add Event</>}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
});

export default EventsPage;
