import React, { useState, useEffect } from "react";
import { withSwal } from 'react-sweetalert2';
import { Modal, ModalBody, ModalFooter } from "../../components/global/Modal";
import TextField from "../../components/global/TextField";
import Button from "../../components/global/Button";
import BreadcrumbCmp from "../../components/global/Breadcrumb";
import TableCmp from "../../components/global/Table";
import SpeakerAPI from "../../apis/dashboard/speaker";
import EventsApi from "../../apis/dashboard/events";
import { useSpace } from "../../context/space.provider";
import { createColumnHelper } from '@tanstack/react-table';

const SpeakerPage = withSwal((props) => {
    const { selectedSpace } = useSpace();
    const columnHelper = createColumnHelper();

    const { swal, ...rest } = props;

    const [tableData, setTableData] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [primaryAffiliation, setPrimaryAffiliation] = useState('');
    const [title, setTitle] = useState('');
    const [headshot, setHeadshot] = useState('');
    const [linkedInURL, setLinkedInURL] = useState('');
    const [twitterURL, setTwitterURL] = useState('');
    const [bio, setBio] = useState('');
    const [adminFullName, setAdminFullName] = useState('');
    const [adminEmailAddress, setAdminEmailAddress] = useState('');
    const [reload, setReload] = useState(false);
    const [activeEvents, setActiveEvents] = useState([]);
    const [selectedActiveEvent, setSelectedActiveEvent] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [speakerToUpdate, setSpeakerToUpdate] = useState(null);

    const fetchData = () => {
        SpeakerAPI.getSpeaker()
            .then(res => {
                setTableData(res.speakers);
                setReload(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const fetchActiveEvents = async () => {
        try {
            const res = await EventsApi.getActiveEvents();
            setActiveEvents(res.events);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchActiveEvents();
    }, []);

    useEffect(() => {
        if (reload) {
            fetchData();
        }
    }, [reload]);

    const openModal = (speaker) => {
        if (speaker) {
            setFirstName(speaker.firstName);
            setLastName(speaker.lastName);
            setEmailAddress(speaker.emailAddress);
            setPrimaryAffiliation(speaker.primaryAffiliation);
            setTitle(speaker.title);
            setHeadshot(speaker.headshot);
            setLinkedInURL(speaker.linkedInURL);
            setTwitterURL(speaker.twitterURL);
            setBio(speaker.bio);
            setAdminFullName(speaker.adminFullName);
            setAdminEmailAddress(speaker.adminEmailAddress);
            setSelectedActiveEvent(speaker.event_id);
            setIsEditMode(true);
            setSpeakerToUpdate(speaker);
        } else {
            setFirstName('');
            setLastName('');
            setEmailAddress('');
            setPrimaryAffiliation('');
            setTitle('');
            setHeadshot('');
            setLinkedInURL('');
            setTwitterURL('');
            setBio('');
            setAdminFullName('');
            setAdminEmailAddress('');
            setSelectedActiveEvent('');
            setIsEditMode(false);
            setSpeakerToUpdate(null);
        }
        setModalShow(true);
    };

    const handleNameChange = (value) => {
        setFirstName(value);
    };

    const handleEmailChange = (value) => {
        setEmailAddress(value);
    };

    const handleEventChange = (value) => {
        setSelectedActiveEvent(value);
    };

    const addOrUpdateSpeaker = async () => {
        try {
            if (firstName !== '' && emailAddress !== '' && selectedActiveEvent !== '') {
                const speakerData = {
                    firstName,
                    lastName,
                    emailAddress,
                    primaryAffiliation,
                    title,
                    headshot,
                    linkedInURL,
                    twitterURL,
                    bio,
                    adminFullName,
                    adminEmailAddress,
                    space_id: selectedSpace?.space_id,
                    event_id: selectedActiveEvent
                };
                if (isEditMode) {
                    await SpeakerAPI.updateSpeaker(speakerToUpdate.id, speakerData);
                } else {
                    await SpeakerAPI.addSpeaker(speakerData);
                }
                setReload(true);
                setModalShow(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const openEditModal = (speaker) => {
        openModal(speaker);
    };
    const columns = [
        columnHelper.accessor('firstName'),
        columnHelper.accessor('lastName'),
        columnHelper.accessor('emailAddress', { header: 'email Address' }),
        columnHelper.accessor('primaryAffiliation', { header: 'primary Affiliation' }),
        columnHelper.accessor('title'),
        columnHelper.accessor('headshot'),
        columnHelper.accessor('linkedInURL', { header: 'linkedIn URL' }),
        columnHelper.accessor('twitterURL', { header: 'twitter URL' }),
        columnHelper.accessor('bio'),
        columnHelper.accessor('adminFullName', { header: 'admin FullName' }),
        columnHelper.accessor('adminEmailAddress', { header: 'admin Email Address' }),
        columnHelper.display({
            header: 'Action',
            id: 'actions',
            cell: props => (
                <>
                    <div className="w-100 d-flex gap-2 flex-row justify-content-end">
                        <a onClick={() => { DeleteBtnClick(props.row.original) }} className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
                            <i className="ki-outline ki-trash fs-2"></i>
                        </a>
                        <a onClick={() => openEditModal(props.row.original)} className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm ml-3">
                            <i className="bi bi-pencil"></i>
                        </a>
                    </div>
                </>
            ),
        }),
    ];

    const DeleteBtnClick = (row) => {
        swal.fire({
            title: 'Delete',
            text: 'Are you sure you want to delete this speaker?',
            icon: 'error',
            confirmButtonText: 'Delete'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    SpeakerAPI.deleteSpeaker(row.id)
                        .then(() => {
                            setReload(true);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            });
    };

    return (
        <>
            <div className="d-flex flex-column flex-column-fluid">
                <div id="kt_app_toolbar" className="app-toolbar pt-3 pt-lg-3">
                    <div className="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                        <div className="page-title d-flex flex-column justify-content-center gap-1 me-3">
                            <BreadcrumbCmp title={'Speakers'} />
                            <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bolder fs-3 m-0">Speakers</h1>
                        </div>
                        <div className="d-flex align-items-center gap-2 gap-lg-3">
                            <a onClick={() => { openModal() }} className="btn btn-sm btn-flex btn-dark align-self-center px-3">
                                <i className="ki-outline ki-plus-square fs-3"></i>New Speaker</a>
                        </div>
                    </div>
                </div>
                <div id="kt_app_content" className="app-content flex-column-fluid mt-5 mt-lg-5">
                    <TableCmp data={tableData} columns={columns} />
                </div>
            </div>
            <Modal show={modalShow} onHide={() => { setModalShow(false) }} title={isEditMode ? "Edit Speaker" : "New Speaker"}>
                <ModalBody>
                    <div className="mb-3">
                        <label htmlFor="Events" className="form-label">Event</label>
                        <select className="form-select" id="Events" value={selectedActiveEvent} onChange={(e) => handleEventChange(e.target.value)}>
                            <option value="">Select an active event</option>
                            {activeEvents.map(event => (
                                <option key={event.id} value={event.id}>{event.name}</option>
                            ))}
                        </select>
                    </div>
                    <TextField label='First Name' required={true} name='first name' value={firstName} onChange={(e) => handleNameChange(e.target.value)} />
                    <TextField label='Last Name' name='last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <TextField label='Email Address' required={true} name='emailAddress' value={emailAddress} onChange={(e) => handleEmailChange(e.target.value)} />
                    <TextField label='Primary Affiliation' name='primaryAffiliation' value={primaryAffiliation} onChange={(e) => setPrimaryAffiliation(e.target.value)} />
                    <TextField label='Title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <TextField label='Headshot' name='headshot' value={headshot} onChange={(e) => setHeadshot(e.target.value)} />
                    <TextField label='LinkedInURL' name='linkedInURL' value={linkedInURL} onChange={(e) => setLinkedInURL(e.target.value)} />
                    <TextField label='TwitterURL' name='twitterURL' value={twitterURL} onChange={(e) => setTwitterURL(e.target.value)} />
                    <TextField label='Bio' name='bio' value={bio} onChange={(e) => setBio(e.target.value)} />
                    <TextField label='Admin Full Name' name='adminFullName' value={adminFullName} onChange={(e) => setAdminFullName(e.target.value)} />
                    <TextField label='Admin Email Address' name='adminEmailAddress' value={adminEmailAddress} onChange={(e) => setAdminEmailAddress(e.target.value)} />
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-sm btn-flex btn-secondary" onClick={() => { setModalShow(false) }}>
                        Cancel
                    </Button>
                    <Button className="btn btn-sm btn-flex btn-primary" onClick={() => { addOrUpdateSpeaker() }}>
                        {isEditMode ? "Update Speaker" : <><i className="ki-outline ki-plus-square fs-3"></i>&nbsp;Create Speaker</>}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
});

export default SpeakerPage;
