import React, { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import {
    createColumnHelper
} from '@tanstack/react-table';
import {withSwal} from 'react-sweetalert2';
import { Modal, ModalBody, ModalFooter } from "../../components/global/Modal";
import TextField from "../../components/global/TextField";
import Button from "../../components/global/Button";
import BreadcrumbCmp from "../../components/global/Breadcrumb";
import TableCmp from "../../components/global/Table";
import { useAuth } from "../../modules/auth";
import Producer from "../../apis/dashboard/producer";
const ProducerPage = withSwal((props) => {
    const columnHelper = createColumnHelper();

    const { swal, ...rest } = props;

    const [tableData, setTableData] = useState([]);
    const [name, setName] = useState('');
    const [reload, setReload] = useState(false);
    const [veneueOptions, setVeneueOptions] = useState([]);
    const [nameError, setNameError] = useState('');
    const [modalShow, setModalShow] = useState(false);

    const {currentUser} = useAuth();

    console.log(currentUser);


    const fetchData = () => {
      Producer.getProducer()
      .then(res => {
          setTableData(res.producerNames)
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
      columnHelper.display({
        header: 'Action',
        id: 'actions',
        cell: props => (
          <>
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
          confirmButtonText: 'Delete'
      })
      .then((result) => {
          if (result.isConfirmed) {
              Producer.deleteProducer(row.id)
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


    const handleNameChange = (txt) => {
      setName(txt); 
      txt != '' ? setNameError('') : setNameError('Name is required.');
  }
    const openModal = () => {
      setVeneueOptions(veneueOptions?.map(item => ({
          value: item?.id,
          label: item?.name
      })));
      

        
      setName('');
      setModalShow(true);
  }
  const addEventFunc = async () => {
    if(name == '') {
        setNameError("Name is required.");
    }
    
    
    if(name != '') {
        const ProducerData = {};
        ProducerData.name = name;
        Producer.addProducer( ProducerData)
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
                            <BreadcrumbCmp title={'Producers'} />
                            {/* <!--end::Breadcrumb--> */}

                            {/* <!--begin::Title--> */}
                            <h1 class="page-heading d-flex flex-column justify-content-center text-dark fw-bolder fs-3 m-0">Producers</h1>
                            {/* <!--end::Title--> */}
                        </div>
                        {/* <!--end::Page title--> */}

                        {/* <!--begin::Actions--> */}
                        <div class="d-flex align-items-center gap-2 gap-lg-3">
                            <a onClick={() => {openModal()}} class="btn btn-sm btn-flex btn-secondary align-self-center px-3">
                            <i class="ki-outline ki-plus-square fs-3"></i>New Producers</a>
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
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-sm btn-flex btn-secondary" onClick={() => {setModalShow(false)}}>
                        Cancel
                    </Button>
                    <Button className="btn btn-sm btn-flex btn-primary" onClick={() => {addEventFunc()}}>
                        <i class="ki-outline ki-plus-square fs-3"></i>&nbsp;Create Producers
                    </Button>
                </ModalFooter>
            </Modal>


        </>
    );
});

export default ProducerPage;