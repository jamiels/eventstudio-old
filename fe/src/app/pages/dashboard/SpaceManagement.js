import React, { useState, useEffect } from "react";
import { withSwal } from 'react-sweetalert2';
import { Modal, ModalBody, ModalFooter } from "../../components/global/Modal";
import TextField from "../../components/global/TextField";
import Button from "../../components/global/Button";
import BreadcrumbCmp from "../../components/global/Breadcrumb";
import TableCmp from "../../components/global/Table";
import { useSpace } from "../../context/space.provider";
import { createColumnHelper } from '@tanstack/react-table';
import spaceApi from "../../apis/dashboard/space";
import { useAuth } from "../../modules/auth";

const SpaceManagementPage = withSwal((props) => {

    const { selectedSpace, updateSelectedSpace, setSpaces, spaces } = useSpace();
    const { currentUser, logout, auth } = useAuth();

    const columnHelper = createColumnHelper();

    const { swal, ...rest } = props;

    const [tableData, setTableData] = useState([]);
    const [spaceName, setSpaceName] = useState('');
    const [reload, setReload] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [spaceToUpdate, setSpaceToUpdate] = useState(null);
    const [showModalAddToSpaceCreate, setShowModalAddToCreateSpace] = useState(false); // Change showModalAddToTeamCreate to showModalAddToSpaceCreate
    const [showSuccess, setShowSuccess] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [errors, setError] = useState(null);
    const [nameError, setNameError] = useState(null);
    const [name, setName] = useState('');

    const fetchData = () => {
        spaceApi.getSpaces()
            .then(res => {
                console.log("responso data", res);
                setTableData(res?.userSpaces);
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

    const openModal = (space) => {
        if (space) {
            setIsEditMode(true);
            setSpaceToUpdate(space);
        } else {
            setIsEditMode(false);
            setSpaceToUpdate(null);
        }
        setModalShow(true);
    };

    const handleSpaceName = (value) => {
        setSpaceName(value);
    };

    const addOrUpdateSpace = async () => {
        if (spaceName !== '') {
            try {
                if (isEditMode) {
                    await spaceApi.updateSpace(spaceToUpdate.space_id, { space_name: spaceName }, auth?.token);
                } else {
                    await spaceApi.addSpace({ space_name: spaceName }, auth?.token) // Change addTeam to addSpace
                        .then((res) => {
                            setShowSuccess(res?.response?.data?.message || res.message)
                            setSpaceName('');
                        }).catch((err) => {
                            console.log("🚀 ~ .then ~ err:", err)
                        })
                }
                setReload(true);
                setModalShow(false);
            } catch (err) {
                console.log("Error:", err);
            }
        }
    };

    const columns = [
        columnHelper.accessor('space.space_name', { header: 'Space Name' }),
        columnHelper.display({
            accessor: 'isAdmin',
            id: 'role',
            header: 'Role',
            cell: ({ row: { original } }) => (
                <span>{original?.isAdmin ? 'Admin' : 'Member'}</span>
            ),
        }),
        columnHelper.display({
            header: 'Links',
            id: 'links',
            cell: ({ row: { original } }) => (
                <div className="d-flex flex-row gap-3">
                    <a href={`/public/speak/${original.space.uuid}`} target="_blank" rel="noopener noreferrer">Speak</a> |
                    <a href={`/public/sponsor/${original.space.uuid}`} target="_blank" rel="noopener noreferrer">Sponsor</a> |
                    <a href={`/public/onboard/${original.space.uuid}`} target="_blank" rel="noopener noreferrer">Onboard</a> |
                    <a href={`/public/volunteer/${original.space.uuid}`} target="_blank" rel="noopener noreferrer">Volunteer</a>
                </div>
            ),
        }),
        columnHelper.display({
            header: 'Actions',
            id: 'actions',
            cell: ({ row }) => (
                <div className="w-100 d-flex gap-2 flex-row justify-content-end">
                    <>
                        {row?.original?.isAdmin &&
                            <a onClick={() => { renameSpace(row.original) }} className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm">
                                <i className="bi bi-pencil"></i>
                            </a>
                        }
                        {row?.original?.isAdmin &&
                            <a onClick={() => { handleAddUser(row.original) }} className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm ml-3">
                                <i className="bi bi-person-plus"></i>
                            </a>
                        }
                        {!row?.original?.isAdmin &&
                            <a onClick={() => { leaveSpace(row.original) }} className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm ml-3">
                                <i className="bi bi-door-closed"></i>
                            </a>
                        }
                    </>
                </div>
            ),
        }),
    ];

    const renameSpace = (space) => {
        console.log("🚀 ~ renameSpace ~ space:", space)
        setSpaceToUpdate(space);
        setSpaceName(space.space.space_name);
        setIsEditMode(true);
        setModalShow(true);
    };
    const handleAddUser = (curr_space) => {
        setShowSuccess('');
        setShowModalAddToCreateSpace(true);
        setSpaceToUpdate(curr_space); // Assuming you have state to hold the current space
    };

    const addUser = (curr_space) => {
        if (email === '') setEmailError('Email is required');
        if (name === '') setNameError('Name is required');

        spaceApi.addUserToSpace({ name, email, space_id: spaceToUpdate.space_id }, auth?.token)
            .then((res) => {
                setShowSuccess(res?.response?.data?.message || res.message)
                setEmail('');
                setName('');
                setShowModalAddToCreateSpace(false);
            }).catch((err) => {
                setError(err?.response?.data?.message || "Error occurred");
                console.log("Error:", err?.response?.data?.message);
            });
    };

    const leaveSpace = (row) => {
        swal.fire({
            title: 'Delete',
            text: 'Are you sure you want to delete this Space?',
            icon: 'error',
            confirmButtonText: 'Delete'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    spaceApi.deleteSpace(row.space.id, auth?.token)
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
                            <BreadcrumbCmp title={'Space Management'} />
                            <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bolder fs-3 m-0">Space Management</h1>
                        </div>
                        <div className="d-flex align-items-center gap-2 gap-lg-3">
                            <a onClick={() => { openModal() }} className="btn btn-sm btn-flex btn-dark align-self-center px-3">
                                <i className="bi bi-plus-square"></i>Create Space</a>
                        </div>
                    </div>
                </div>
                <div id="kt_app_content" className="app-content flex-column-fluid mt-5 mt-lg-5">
                    <TableCmp data={tableData} columns={columns} />
                </div>
            </div>
            <Modal show={modalShow} onHide={() => { setModalShow(false) }} title={isEditMode ? "Edit Space" : "New Space"}>
                <ModalBody>
                    <TextField label='Space Name' required={true} name='space name' value={spaceName} onChange={(e) => { handleSpaceName(e.target.value) }} />
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-sm btn-flex btn-secondary" onClick={() => { setModalShow(false) }}>
                        Cancel
                    </Button>
                    <Button className="btn btn-sm btn-flex btn-primary" onClick={() => { addOrUpdateSpace() }}>
                        {isEditMode ? "Update Space" : <><i className="bi bi-plus-square"></i>&nbsp;Create Space</>}
                    </Button>
                </ModalFooter>
            </Modal>
            {/* create space modal done */}
            <Modal show={showModalAddToSpaceCreate} onHide={() => { setShowModalAddToCreateSpace(false); setShowSuccess('') }} title={"Add User To Space"}>
                <ModalBody>
                    <TextField label='User Name' required={true} name='name' value={name} onChange={(e) => { setName(e.target.value) }} error={nameError} />
                    <TextField label='User Email' required={true} name='email' value={email} onChange={(e) => { setEmail(e.target.value) }} error={emailError} />
                    {showSuccess != '' && <span className="p-2 text-success">{showSuccess}</span>}
                    {errors != '' && <span className="p-2 text-success">{errors}</span>}
                </ModalBody>
                <ModalFooter>
                    <Button isLoading={false} variant="primary" className="btn btn-sm btn-flex btn-secondary" onClick={() => { setShowModalAddToCreateSpace(false); setShowSuccess('') }}>
                        Cancel
                    </Button>
                    <Button isLoading={false} variant="primary" className="btn btn-sm btn-flex btn-primary" onClick={addUser}>
                        <i className="ki-outline ki-plus-square fs-3"></i>&nbsp;Add
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
});

export default SpaceManagementPage;
