import React, { useState, useEffect } from "react";
import { withSwal } from 'react-sweetalert2';
import { Modal, ModalBody, ModalFooter } from "../../components/global/Modal";
import TextField from "../../components/global/TextField";
import Button from "../../components/global/Button";
import BreadcrumbCmp from "../../components/global/Breadcrumb";
import TableCmp from "../../components/global/Table";
import SponsorshipAPI from "../../apis/dashboard/sponsorship";
import OrganizationAPI from "../../apis/dashboard/org";
import EventAPI from "../../apis/dashboard/events";
import { useSpace } from "../../context/space.provider";
import { createColumnHelper } from '@tanstack/react-table';

const SponsorshipPage = withSwal((props) => {
    const { selectedSpace } = useSpace();
    const columnHelper = createColumnHelper();

    const { swal, ...rest } = props;

    const [tableData, setTableData] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [events, setEvents] = useState([]);

    const [organizationId, setOrganizationId] = useState('');
    const [eventId, setEventId] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [contactEmailAddress, setContactEmailAddress] = useState('');
    const [invoicePerson, setInvoicePerson] = useState('');
    const [invoiceEmailAddress, setInvoiceEmailAddress] = useState('');
    const [deckSent, setDeckSent] = useState(false);
    const [contractSent, setContractSent] = useState(false);
    const [invoiceSent, setInvoiceSent] = useState(false);
    const [paymentReceived, setPaymentReceived] = useState(false);
    const [commitmentAmount, setCommitmentAmount] = useState('');
    const [reload, setReload] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [sponsorshipToUpdate, setSponsorshipToUpdate] = useState(null);

    const fetchData = () => {
        SponsorshipAPI.getSponsorship(selectedSpace?.space_id)
            .then(res => {
                setTableData(res.sponsorships);
                setReload(false);
            })
            .catch(err => {
                console.log(err);
            });

        OrganizationAPI.getActiveOrgs(selectedSpace?.space_id)
            .then(res => {
                setOrganizations(res.orgs);
            })
            .catch(err => {
                console.log(err);
            });

        EventAPI.getEvents(selectedSpace?.space_id)
            .then(res => {
                setEvents(res.events);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (selectedSpace && selectedSpace.space_id) {
            fetchData();
        }
    }, [selectedSpace]);

    useEffect(() => {
        if (reload) {
            fetchData();
        }
    }, [reload]);

    const openModal = (sponsorship) => {
        if (sponsorship) {
            setOrganizationId(sponsorship.organization_id);
            setEventId(sponsorship.event_id);
            setContactPerson(sponsorship.contact_person);
            setContactEmailAddress(sponsorship.contact_email_address);
            setInvoicePerson(sponsorship.invoice_person);
            setInvoiceEmailAddress(sponsorship.invoice_email_address);
            setDeckSent(sponsorship.deck_sent);
            setContractSent(sponsorship.contract_sent);
            setInvoiceSent(sponsorship.invoice_sent);
            setPaymentReceived(sponsorship.payment_received);
            setCommitmentAmount(sponsorship.commitment_amount);
            setIsEditMode(true);
            setSponsorshipToUpdate(sponsorship);
        } else {
            setOrganizationId('');
            setEventId('');
            setContactPerson('');
            setContactEmailAddress('');
            setInvoicePerson('');
            setInvoiceEmailAddress('');
            setDeckSent(false);
            setContractSent(false);
            setInvoiceSent(false);
            setPaymentReceived(false);
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

    const handleContactPersonChange = (value) => {
        setContactPerson(value);
    };

    const handleContactEmailAddressChange = (value) => {
        setContactEmailAddress(value);
    };

    const handleInvoicePersonChange = (value) => {
        setInvoicePerson(value);
    };

    const handleInvoiceEmailAddressChange = (value) => {
        setInvoiceEmailAddress(value);
    };

    const handleDeckSentChange = (value) => {
        setDeckSent(value);
    };

    const handleContractSentChange = (value) => {
        setContractSent(value);
    };

    const handleInvoiceSentChange = (value) => {
        setInvoiceSent(value);
    };

    const handlePaymentReceivedChange = (value) => {
        setPaymentReceived(value);
    };

    const handleCommitmentAmountChange = (value) => {
        // Regular expression to allow only numbers (including decimal numbers)
        const numberRegex = /^\d*\.?\d*$/;

        if (numberRegex.test(value)) {
            setCommitmentAmount(value);
        } else {
            swal.fire({
                title: 'Error',
                text: 'Invalid input: Please enter a valid number',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };


    const addOrUpdateSponsorship = async () => {
        if (organizationId !== '' && eventId !== '' && commitmentAmount !== '') {
            const sponsorshipData = {
                organizationId,
                eventId,
                contactPerson,
                contactEmailAddress,
                invoicePerson,
                invoiceEmailAddress,
                deckSent,
                contractSent,
                invoiceSent,
                paymentReceived,
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
        columnHelper.accessor('organization_id', { header: 'Organization' }),
        columnHelper.accessor('event_id', { header: 'Event' }),
        columnHelper.accessor('contact_person', { header: 'Contact Person' }),
        columnHelper.accessor('contact_email_address', { header: 'Contact Email Address' }),
        columnHelper.accessor('invoice_person', { header: 'Invoice Person' }),
        columnHelper.accessor('invoice_email_address', { header: 'Invoice Email Address' }),
        columnHelper.accessor('deck_sent', { header: 'Deck Sent' }),
        columnHelper.accessor('contract_sent', { header: 'Contract Sent' }),
        columnHelper.accessor('invoice_sent', { header: 'Invoice Sent' }),
        columnHelper.accessor('payment_received', { header: 'Payment Received' }),
        columnHelper.accessor('commitment_amount', { header: 'Commitment Amount' }),
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
                    <label htmlFor="organizationSelect">Organization</label>
                    <select id="organizationSelect" value={organizationId} onChange={(e) => { handleOrganizationIdChange(e.target.value) }} className="form-select">
                        <option value="" disabled>Select an organization</option>
                        {organizations?.map(org => (
                            <option key={org.id} value={org.id}>{org.name}</option>
                        ))}
                    </select>
                    <label htmlFor="eventSelect" className="mt-3">Event</label>
                    <select id="eventSelect" value={eventId} onChange={(e) => { handleEventIdChange(e.target.value) }} className="form-select">
                        <option value="" disabled>Select an event</option>
                        {events.map(event => (
                            <option key={event.id} value={event.id}>{event.name}</option>
                        ))}
                    </select>
                    <TextField label='Contact Person' required={true} name='contactPerson' value={contactPerson} onChange={(e) => { handleContactPersonChange(e.target.value) }} />
                    <TextField label='Contact Email Address' required={true} name='contactEmailAddress' value={contactEmailAddress} onChange={(e) => { handleContactEmailAddressChange(e.target.value) }} />
                    <TextField label='Invoice Person' required={true} name='invoicePerson' value={invoicePerson} onChange={(e) => { handleInvoicePersonChange(e.target.value) }} />
                    <TextField label='Invoice Email Address' required={true} name='invoiceEmailAddress' value={invoiceEmailAddress} onChange={(e) => { handleInvoiceEmailAddressChange(e.target.value) }} />
                    <div className="form-check my-4">
                        <input className="form-check-input" type="checkbox" checked={deckSent} onChange={(e) => { handleDeckSentChange(e.target.checked) }} id="deckSent" />
                        <label className="form-check-label" htmlFor="deckSent">Deck Sent</label>
                    </div>
                    <div className="form-check my-4">
                        <input className="form-check-input" type="checkbox" checked={contractSent} onChange={(e) => { handleContractSentChange(e.target.checked) }} id="contractSent" />
                        <label className="form-check-label" htmlFor="contractSent">Contract Sent</label>
                    </div>
                    <div className="form-check my-4">
                        <input className="form-check-input" type="checkbox" checked={invoiceSent} onChange={(e) => { handleInvoiceSentChange(e.target.checked) }} id="invoiceSent" />
                        <label className="form-check-label" htmlFor="invoiceSent">Invoice Sent</label>
                    </div>
                    <div className="form-check my-4">
                        <input className="form-check-input" type="checkbox" checked={paymentReceived} onChange={(e) => { handlePaymentReceivedChange(e.target.checked) }} id="paymentReceived" />
                        <label className="form-check-label" htmlFor="paymentReceived">Payment Received</label>
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
