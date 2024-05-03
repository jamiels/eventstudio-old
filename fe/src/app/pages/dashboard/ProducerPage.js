import React, { useState, useEffect } from "react";
import { withSwal } from 'react-sweetalert2';
import { Modal, ModalBody, ModalFooter } from "../../components/global/Modal";
import TextField from "../../components/global/TextField";
import Button from "../../components/global/Button";
import BreadcrumbCmp from "../../components/global/Breadcrumb";
import TableCmp from "../../components/global/Table";
import ProducerAPI from "../../apis/dashboard/producer";
import { useSpace } from "../../context/space.provider";
import { createColumnHelper } from '@tanstack/react-table';

const ProducerPage = withSwal((props) => {
    const { selectedSpace } = useSpace();
    const columnHelper = createColumnHelper();
    const { swal, ...rest } = props;

    const [tableData, setTableData] = useState([]);
    const [name, setName] = useState('');
    const [reload, setReload] = useState(false);
    const [nameError, setNameError] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [producerToUpdate, setProducerToUpdate] = useState(null);

    const fetchData = () => {
        ProducerAPI.getProducer()
            .then(res => {
                setTableData(res.producerNames);
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

    const openModal = (producer) => {
        if (producer) {
            setName(producer.name);
            setIsEditMode(true);
            setProducerToUpdate(producer);
        } else {
            setName('');
            setIsEditMode(false);
            setProducerToUpdate(null);
        }
        setModalShow(true);
    };

    const handleNameChange = (value) => {
        setName(value);
    };

    const addOrUpdateProducer = async () => {
        if (name !== '') {
            const producerData = {
                name,
                space_id: selectedSpace?.space_id
            };
            try {
                if (isEditMode) {
                    await ProducerAPI.updateProducer(producerToUpdate.id, producerData);
                } else {
                    await ProducerAPI.addProducer(producerData);
                }
                setReload(true);
                setModalShow(false);
            } catch (err) {
                console.log("Error:", err);
            }
        } else {
            setNameError('Name is required.');
        }
    };
    const openEditModal = (producer) => {
        openModal(producer);
    };
    const columns = [
        columnHelper.accessor('name'),
        columnHelper.display({
            header: 'Action',
            id: 'actions',
            cell: props => (
                <>
                    <div className="d-flex flex-row gap-2">
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
            text: 'Are you sure you want to delete this producer?',
            icon: 'error',
            confirmButtonText: 'Delete'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    ProducerAPI.deleteProducer(row.id)
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
                            <BreadcrumbCmp title={'Producers'} />
                            <h1 className="page-heading d-flex flex-column justify-content-center text-dark fw-bolder fs-3 m-0">Producers</h1>
                        </div>
                        <div className="d-flex align-items-center gap-2 gap-lg-3">
                            <a onClick={() => { openModal() }} className="btn btn-sm btn-flex btn-dark align-self-center px-3">
                                <i className="ki-outline ki-plus-square fs-3"></i>New Producer</a>
                        </div>
                    </div>
                </div>
                <div id="kt_app_content" className="app-content flex-column-fluid mt-5 mt-lg-5">
                    <TableCmp data={tableData} columns={columns} />
                </div>
            </div>
            <Modal show={modalShow} onHide={() => { setModalShow(false) }} title={isEditMode ? "Edit Producer" : "New Producer"}>
                <ModalBody>
                    <TextField label='Name' required={true} name='name' value={name} onChange={(e) => { handleNameChange(e.target.value) }} error={nameError} />
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-sm btn-flex btn-secondary" onClick={() => { setModalShow(false) }}>
                        Cancel
                    </Button>
                    <Button className="btn btn-sm btn-flex btn-primary" onClick={() => { addOrUpdateProducer() }}>
                        {isEditMode ? "Update Producer" : <><i className="ki-outline ki-plus-square fs-3"></i>&nbsp;Create Producer</>}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
});

export default ProducerPage;
