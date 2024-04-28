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
import Speaker from "../../apis/dashboard/speaker";
const SpeakerPage = withSwal((props) => {
    const columnHelper = createColumnHelper();

    const { swal, ...rest } = props;

    const [tableData, setTableData] = useState([]);
    const [firstName, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [primaryAffiliation, setPrimaryAffiliation] = useState('');
    const [headshot, setHeadShot] = useState('');
    const [linkedInURL, setLinkedInURL] = useState('');
    const [twitterURL, setTwitterURL] = useState('');
    const [bio, setBio] = useState('');
    const [adminFullName, setAdminFullName] = useState('');
    const [adminEmailAddress, setAdminEmailAddress] = useState('');
    const [reload, setReload] = useState(false);
    const [veneueOptions, setVeneueOptions] = useState([]);
    const [nameError, setNameError] = useState('');
    const [modalShow, setModalShow] = useState(false);

    const {currentUser} = useAuth();

    console.log(currentUser);


    const fetchData = () => {
      Speaker.getSpeaker()
      .then(res => {
          setTableData(res.speakers)
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
      columnHelper.accessor('firstName'),
      columnHelper.accessor('lastName'),
      columnHelper.accessor('emailAddress'),
      columnHelper.accessor('primaryAffiliation'),
      columnHelper.accessor('title'),
      columnHelper.accessor('headshot'),
      columnHelper.accessor('linkedInURL'),
      columnHelper.accessor('twitterURL'),
      columnHelper.accessor('bio'),
      columnHelper.accessor('adminFullName'),
      columnHelper.accessor('adminEmailAddress'),
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
      console.log("row",row)
      swal.fire({
          title: 'Delete',
          text: 'Are you sure delete this event?',
          icon: 'error',
          confirmButtonText: 'Delete'
      })
      .then((result) => {
          if (result.isConfirmed) {
              Speaker.deleteSpeaker(row.id)
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
      setLastName('');
      setEmail('');
      setPrimaryAffiliation('');
      setTitle('');
      setHeadShot('');
      setLinkedInURL('');
      setTwitterURL('');
      setBio('');
      setAdminFullName('');
      setAdminEmailAddress('');
      setModalShow(true);
  }
  const addEventFunc = async () => {
    if(firstName == '') {
        setNameError("Name is required.");
    }
    
    
    if(firstName != '') {
        const speakerData = {};
        speakerData.firstName = firstName;
        speakerData.lastName=lastname;
        speakerData.emailAddress=email;
        speakerData.title=title;
        speakerData.primaryAffiliation=primaryAffiliation;
        speakerData.headshot=headshot;
        speakerData.linkedInURL=linkedInURL;
        speakerData.twitterURL=twitterURL;
        speakerData.bio=bio;
        speakerData.adminFullName=adminFullName;
        speakerData.adminEmailAddress=adminEmailAddress;
        Speaker.addSpeaker( speakerData)
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
                            <BreadcrumbCmp title={'Speakers'} />
                            {/* <!--end::Breadcrumb--> */}

                            {/* <!--begin::Title--> */}
                            <h1 class="page-heading d-flex flex-column justify-content-center text-dark fw-bolder fs-3 m-0">Speakers</h1>
                            {/* <!--end::Title--> */}
                        </div>
                        {/* <!--end::Page title--> */}

                        {/* <!--begin::Actions--> */}
                        <div class="d-flex align-items-center gap-2 gap-lg-3">
                            <a onClick={() => {openModal()}} class="btn btn-sm btn-flex btn-secondary align-self-center px-3">
                            <i class="ki-outline ki-plus-square fs-3"></i>New Speaker</a>
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
                    <TextField label='First Name' required={true} name='first name' value={firstName} onChange={(e) => {handleNameChange(e.target.value)}} error={nameError}/>
                    <TextField label='Last Name' name='last name' value={lastname} onChange={(e) => setLastName(e.target.value)} />
                    <TextField label='Email Address' name='emailAddress' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField label='Primary Affiliation' name='primaryAffiliation' value={primaryAffiliation} onChange={(e) => setPrimaryAffiliation(e.target.value)} /> 
                     <TextField label='Title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} /> 
                      <TextField label='Headshot' name='headshot' value={headshot} onChange={(e) => setHeadShot(e.target.value)} />
                      <TextField label='LinkedInURL' name='linkedInURL' value={linkedInURL} onChange={(e) => setLinkedInURL(e.target.value)} />
                      <TextField label='TwitterURL' name='twitterURL' value={twitterURL} onChange={(e) => setTwitterURL(e.target.value)} />
                      <TextField label='Bio' name='bio' value={bio} onChange={(e) => setBio(e.target.value)} />
                      <TextField label='Admin Full Name' name='adminFullName' value={adminFullName} onChange={(e) => setAdminFullName(e.target.value)} />
                      <TextField label='Admin Email Address' name='adminEmailAddress' value={adminEmailAddress} onChange={(e) => setAdminEmailAddress(e.target.value)} />
                    
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-sm btn-flex btn-secondary" onClick={() => {setModalShow(false)}}>
                        Cancel
                    </Button>
                    <Button className="btn btn-sm btn-flex btn-primary" onClick={() => {addEventFunc()}}>
                        <i class="ki-outline ki-plus-square fs-3"></i>&nbsp;Create Speaker
                    </Button>
                </ModalFooter>
            </Modal>


        </>
    );
});

export default SpeakerPage;