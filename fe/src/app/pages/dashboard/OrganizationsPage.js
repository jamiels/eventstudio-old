import React, { useState, useEffect } from "react";
import { withSwal } from 'react-sweetalert2';
import { Modal, ModalBody, ModalFooter } from "../../components/global/Modal";
import TextField from "../../components/global/TextField";
import Button from "../../components/global/Button";
import BreadcrumbCmp from "../../components/global/Breadcrumb";
import TableCmp from "../../components/global/Table";
import OrgAPI from "../../apis/dashboard/org";
import { useSpace } from "../../context/space.provider";
import { createColumnHelper } from '@tanstack/react-table';

const OrganizationPage = withSwal((props) => {
    const { selectedSpace } = useSpace();

    const columnHelper = createColumnHelper();

    const { swal, ...rest } = props;

    const [tableData, setTableData] = useState([]);
    const [name, setName] = useState('');
    const [reload, setReload] = useState(false);
    const [nameError, setNameError] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [organizationToUpdate, setOrganizationToUpdate] = useState(null);

    const fetchData = () => {
        OrgAPI.getOrg(selectedSpace?.space_id)
            .then(res => {
                setTableData(res.orgNames);
                setReload(false);
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

    const openModal = (organization) => {
        if (organization) {
            setName(organization.name);
            setIsEditMode(true);
            setOrganizationToUpdate(organization);
        } else {
            setName('');
            setIsEditMode(false);
            setOrganizationToUpdate(null);
        }
        setModalShow(true);
    };

    const handleNameChange = (txt) => {
        setName(txt);
        txt !== '' ? setNameError('') : setNameError('Name is required.');
    };

    const addOrUpdateOrganization = async () => {
        if (name === '') {
            setNameError("Name is required.");
            return;
        }

        const orgData = { name, space_id: selectedSpace?.space_id };

        try {
            if (isEditMode) {
                await OrgAPI.updateOrg(organizationToUpdate.id, orgData);
            } else {
                await OrgAPI.addOrg(orgData);
            }
            setReload(true);
            setModalShow(false);
        } catch (err) {
            console.log("Error:", err);
        }
    };

    const openEditModal = (organization) => {
        openModal(organization);
    };

    const columns = [
        columnHelper.accessor('id'),
        columnHelper.accessor('name'),

        columnHelper.display({
            header: 'Action',
            id: 'actions',
            cell: props => (
                <>
                    <div className="w-100 d-flex gap-2 flex-row justify-content-end">
                        <a onClick={() => { DeleteBtnClick(props.row.original) }} class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
                            <i class="ki-outline ki-trash fs-2"></i>
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
            text: 'Are you sure you want to delete this organization?',
            icon: 'error',
            confirmButtonText: 'Delete'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    OrgAPI.deleteOrg(row.id)
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
                            <BreadcrumbCmp title={'Organizations'} />
                            <h1 class="page-heading d-flex flex-column justify-content-center text-dark fw-bolder fs-3 m-0">Organizations</h1>
                        </div>
                        <div class="d-flex align-items-center gap-2 gap-lg-3">
                            <a onClick={() => { openModal() }} class="btn btn-sm btn-flex btn-dark align-self-center px-3">
                                <i class="ki-outline ki-plus-square fs-3"></i>New Organization</a>
                        </div>
                    </div>
                </div>
                <div id="kt_app_content" class="app-content flex-column-fluid mt-5 mt-lg-5">
                    <TableCmp data={tableData} columns={columns} />
                </div>
            </div>
            <Modal show={modalShow} onHide={() => { setModalShow(false) }} title={isEditMode ? "Edit Organization" : "New Organization"}>
                <ModalBody>
                    <TextField label='Name' required={true} name='name' value={name} onChange={(e) => { handleNameChange(e.target.value) }} error={nameError} />
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-sm btn-flex btn-secondary" onClick={() => { setModalShow(false) }}>
                        Cancel
                    </Button>
                    <Button className="btn btn-sm btn-flex btn-primary" onClick={() => { addOrUpdateOrganization() }}>
                        {isEditMode ? "Update Organization" : <><i class="ki-outline ki-plus-square fs-3"></i>&nbsp;Create Organization</>}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
});

export default OrganizationPage;
