import React, { useState, useEffect } from "react";
import { withSwal } from 'react-sweetalert2';
import { Modal, ModalBody, ModalFooter } from "../../components/global/Modal";
import TextField from "../../components/global/TextField";
import Button from "../../components/global/Button";
import BreadcrumbCmp from "../../components/global/Breadcrumb";
import TableCmp from "../../components/global/Table";
import SponsorshipAPI from "../../apis/dashboard/sponsorship";
import { useSpace } from "../../context/space.provider";
import { createColumnHelper } from '@tanstack/react-table';

const SponsorshipPage = withSwal((props) => {
    const { selectedSpace } = useSpace();
    const columnHelper = createColumnHelper();

    const { swal, ...rest } = props;

    const [tableData, setTableData] = useState([]);
    const [organizationId, setOrganizationId] = useState('');
    const [eventId, setEventId] = useState('');
    const [deckSent, setDeckSent] = useState(false);
    const [commitmentAmount, setCommitmentAmount] = useState('');
    const [reload, setReload] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [sponsorshipToUpdate, setSponsorshipToUpdate] = useState(null);

    const fetchData = () => {
        SponsorshipAPI.getSponsorship()
            .then(res => {
                setTableData(res.sponsorships);
                setReload(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (reload) {
            fetchData();
        }
    }, [reload]);

    const openModal = (sponsorship) => {
        if (sponsorship) {
            setOrganizationId(sponsorship.organization_id);
            setEventId(sponsorship.event_id);
            setDeckSent(sponsorship.deckSent);
            setCommitmentAmount(sponsorship.commitmentAmount);
            setIsEditMode(true);
            setSponsorshipToUpdate(sponsorship);
        } else {
            setOrganizationId('');
            setEventId('');
            setDeckSent(false);
            setCommitmentAmount('');
            setIsEditMode(false);
            setSponsorshipToUpdate(null);
        }
        setModalShow(true);
    };

    const handleOrganizationIdChange = (value) => {
        setOrganizationId(value);
    };

    const handleEventIdChange = (value) => {
        setEventId(value);
    };

    const handleDeckSentChange = (value) => {
        setDeckSent(value);
    };

    const handleCommitmentAmountChange = (value) => {
        setCommitmentAmount(value);
    };

    const addOrUpdateSponsorship = async () => {
        if (organizationId !== '' && eventId !== '' && commitmentAmount !== '') {
            const sponsorshipData = {
                organizationId,
                eventId,
                deckSent,
                commitmentAmount,
                space_id: selectedSpace?.space_id
            };
            try {
                if (isEditMode) {
                    await SponsorshipAPI.updateSponsorship(sponsorshipToUpdate.id, sponsorshipData);
                } else {
                    await SponsorshipAPI.addSponsorship(sponsorshipData);
                }
                setReload(true);
                setModalShow(false);
            } catch (err) {
                console.log("Error:", err);
            }
        }
    };
    const openEditModal = (sponsorship) => {
        openModal(sponsorship);
    };
    const columns = [
        columnHelper.accessor('organization_id'),
        columnHelper.accessor('event_id'),
        columnHelper.accessor('deckSent'),
        columnHelper.accessor('commitmentAmount', { header: 'commitment Amount' }),
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
            text: 'Are you sure you want to delete this sponsorship?',
            icon: 'error',
            confirmButtonText: 'Delete'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    SponsorshipAPI.deleteSponsorship(row.id)
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
                            <BreadcrumbCmp title={'Sponsorship'} />
                            <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bolder fs-3 m-0">Sponsorship</h1>
                        </div>
                        <div className="d-flex align-items-center gap-2 gap-lg-3">
                            <a onClick={() => { openModal() }} className="btn btn-sm btn-flex btn-dark align-self-center px-3">
                                <i className="ki-outline ki-plus-square fs-3"></i>New Sponsorship</a>
                        </div>
                    </div>
                </div>
                <div id="kt_app_content" className="app-content flex-column-fluid mt-5 mt-lg-5">
                    <TableCmp data={tableData} columns={columns} />
                </div>
            </div>
            <Modal show={modalShow} onHide={() => { setModalShow(false) }} title={isEditMode ? "Edit Sponsorship" : "New Sponsorship"}>
                <ModalBody>
                    <TextField label='Organization ID' required={true} name='organizationId' value={organizationId} onChange={(e) => { handleOrganizationIdChange(e.target.value) }} />
                    <TextField label='Event ID' required={true} name='eventId' value={eventId} onChange={(e) => { handleEventIdChange(e.target.value) }} />
                    <div className="form-check my-4">
                        <input className="form-check-input" type="checkbox" checked={deckSent} onChange={(e) => { handleDeckSentChange(e.target.checked) }} id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">Deck Sent</label>
                    </div>
                    <TextField label='Commitment Amount' required={true} name='commitmentAmount' value={commitmentAmount} onChange={(e) => { handleCommitmentAmountChange(e.target.value) }} />
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-sm btn-flex btn-secondary" onClick={() => { setModalShow(false) }}>
                        Cancel
                    </Button>
                    <Button className="btn btn-sm btn-flex btn-primary" onClick={() => { addOrUpdateSponsorship() }}>
                        {isEditMode ? "Update Sponsorship" : <><i className="ki-outline ki-plus-square fs-3"></i>&nbsp;Create Sponsorship</>}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
});

export default SponsorshipPage;
