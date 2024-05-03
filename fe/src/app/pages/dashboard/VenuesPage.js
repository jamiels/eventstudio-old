import React, { useState, useEffect } from "react";
import { withSwal } from 'react-sweetalert2';
import { Modal, ModalBody, ModalFooter } from "../../components/global/Modal";
import TextField from "../../components/global/TextField";
import Button from "../../components/global/Button";
import BreadcrumbCmp from "../../components/global/Breadcrumb";
import TableCmp from "../../components/global/Table";
import VenueAPI from "../../apis/dashboard/venue";
import { useSpace } from "../../context/space.provider";
import { createColumnHelper } from '@tanstack/react-table';

const VenuePage = withSwal((props) => {
    const { selectedSpace } = useSpace();
    const columnHelper = createColumnHelper();

    const { swal, ...rest } = props;

    const [tableData, setTableData] = useState([]);
    const [name, setName] = useState('');
    const [reload, setReload] = useState(false);
    const [nameError, setNameError] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [venueToUpdate, setVenueToUpdate] = useState(null);

    const fetchData = () => {
        VenueAPI.getVenue()
            .then(res => {
                setTableData(res.venueNames);
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

    const openModal = (venue) => {
        if (venue) {
            setName(venue.name);
            setIsEditMode(true);
            setVenueToUpdate(venue);
        } else {
            setName('');
            setIsEditMode(false);
            setVenueToUpdate(null);
        }
        setModalShow(true);
    };

    const handleNameChange = (txt) => {
        setName(txt);
        txt !== '' ? setNameError('') : setNameError('Name is required.');
    };

    const addOrUpdateVenue = async () => {
        if (name === '') {
            setNameError("Name is required.");
            return;
        }

        const venueData = { name, space_id: selectedSpace?.space_id };

        try {
            if (isEditMode) {
                await VenueAPI.updateVenue(venueToUpdate.id, venueData);
            } else {
                await VenueAPI.addVenue(venueData);
            }
            setReload(true);
            setModalShow(false);
        } catch (err) {
            console.log("Error:", err);
        }
    };

    const columns = [
        columnHelper.accessor('name'),
        columnHelper.display({
            header: 'Action',
            id: 'actions',
            cell: props => (
                <>
                    <div className="d-flex flex-row gap-2">
                        <a onClick={() => { DeleteBtnClick(props.row.original) }} class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
                            <i class="ki-outline ki-trash fs-2"></i>
                        </a>
                        <a onClick={() => openModal(props.row.original)} className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm ml-3">
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
            text: 'Are you sure you want to delete this venue?',
            icon: 'error',
            confirmButtonText: 'Delete'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    VenueAPI.deleteVenue(row.id)
                        .then((data) => {
                            console.log(data);
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
            <div class="d-flex flex-column flex-column-fluid">
                <div id="kt_app_toolbar" class="app-toolbar pt-3 pt-lg-3">
                    <div class="app-toolbar-wrapper d-flex flex-stack flex-wrap gap-4 w-100">
                        <div class="page-title d-flex flex-column justify-content-center gap-1 me-3">
                            <BreadcrumbCmp title={'Venues'} />
                            <h1 class="page-heading d-flex flex-column justify-content-center text-dark fw-bolder fs-3 m-0">Venues</h1>
                        </div>
                        <div class="d-flex align-items-center gap-2 gap-lg-3">
                            <a onClick={() => { openModal() }} class="btn btn-sm btn-flex btn-dark align-self-center px-3">
                                <i class="ki-outline ki-plus-square fs-3"></i>New Venue</a>
                        </div>
                    </div>
                </div>
                <div id="kt_app_content" class="app-content flex-column-fluid mt-5 mt-lg-5">
                    <TableCmp data={tableData} columns={columns} />
                </div>
            </div>
            <Modal show={modalShow} onHide={() => { setModalShow(false) }} title={isEditMode ? "Edit Venue" : "New Venue"}>
                <ModalBody>
                    <TextField label='Name' required={true} name='name' value={name} onChange={(e) => { handleNameChange(e.target.value) }} error={nameError} />
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-sm btn-flex btn-secondary" onClick={() => { setModalShow(false) }}>
                        Cancel
                    </Button>
                    <Button className="btn btn-sm btn-flex btn-primary" onClick={() => { addOrUpdateVenue() }}>
                        {isEditMode ? "Update Venue" : <><i class="ki-outline ki-plus-square fs-3"></i>&nbsp;Create Venue</>}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
});

export default VenuePage;
