import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../app/modules/auth';
import { toAbsoluteUrl } from '../../../helpers';
import { useSpace } from '../../../../app/context/space.provider';
import spaceApi from '../../../../app/apis/dashboard/space';
import { Modal, ModalBody } from '../../../../app/components/global/Modal';
import TextField from '../../../../app/components/global/TextField';
import { ModalFooter, PlaceholderButton } from 'react-bootstrap';
import Button from '../../../../app/components/global/Button';

const HeaderUserMenu: FC = () => {
  const { currentUser, logout, auth } = useAuth();
  const { selectedSpace, setSpaces } = useSpace(); // Change selectedTeam to selectedSpace
  const [showModalSpaceCreate, setShowModalCreateSpace] = useState(false); // Change showModalTeamCreate to showModalSpaceCreate
  const [showModalAddToSpaceCreate, setShowModalAddToCreateSpace] = useState(false); // Change showModalAddToTeamCreate to showModalAddToSpaceCreate
  const [spaceName, setSpaceName] = useState(''); // Change teamName to spaceName
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [spaceNameError, setSpaceNameError] = useState('');
  const [showSuccess, setShowSuccess] = useState('');
  const [errors, setError] = useState(null);

  // Function to handle adding user to a space
  const handleAddToSpace = () => {
    if (email === '') setEmailError('Email is required');

    spaceApi.addUserToSpace({ email, space_id: selectedSpace?.space_id }, auth?.token)
      .then((res) => {
        setShowSuccess(res?.response?.data?.message || res.message)
        setEmail('');
      }).catch((err) => {
        setError(err?.response?.data?.message || "Error occured");
        console.log("🚀 ~ .then ~ err: line no 49", err?.response?.data?.message)
      })

  };

  // Function to handle creating a new space
  const handleCreateSpace = () => {
    if (spaceName === '') setSpaceNameError('Space Name is required'); // Change Team Name to Space Name
    spaceApi.addSpace({ space_name: spaceName }, auth?.token) // Change addTeam to addSpace
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res)
        setShowSuccess(res?.response?.data?.message || res.message)
        spaceApi.getSpaces(auth?.token).then((res) => setSpaces(res?.userSpaces)) // Change getTeams to getSpaces
        setSpaceName('');
      }).catch((err) => {
        console.log("🚀 ~ .then ~ err:", err)
      })
  };

  return (
    <div className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px' data-kt-menu='true'>
      {/* User information */}
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.first_name} {currentUser?.last_name}
              <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span>
            </div>
            <div className='row d-flex'>
              <a href='#' className='fw-bold text-muted text-hover-primary fs-7' style={{ maxWidth: '180px', overflowWrap: 'anywhere' }}>
                {currentUser?.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className='separator my-2'></div>

      {/* My Profile link */}
      <div className='menu-item px-5'>
        <Link to={'/'} className='menu-link px-5'>
          My Profile
        </Link>
      </div>

      {/* Add to Space button */}
      <div className='menu-item px-5 '>
        <button onClick={() => setShowModalAddToCreateSpace(true)} className='btn menu-link w-100 rounded' style={{ paddingLeft: '15px' }}>
          + Add to Space
        </button>
      </div>
      {/* create space modal done */}
      <Modal show={showModalAddToSpaceCreate} onHide={() => { setShowModalAddToCreateSpace(false); setShowSuccess('') }} title={"Add User To Space"}>
        <ModalBody>
          <TextField label='User Email' required={true} name='email' value={email} onChange={(e) => { setEmail(e.target.value) }} error={emailError} />
          {showSuccess != '' && <span className="p-2 text-success">{showSuccess}</span>}
          {errors != '' && <span className="p-2 text-success">{errors}</span>}
        </ModalBody>
        <ModalFooter>
          <Button isLoading={false} variant="primary" className="btn btn-sm btn-flex btn-secondary" onClick={() => { setShowModalAddToCreateSpace(false); setShowSuccess('') }}>
            Cancel
          </Button>
          <Button isLoading={false} variant="primary" className="btn btn-sm btn-flex btn-primary" onClick={handleAddToSpace}>
            <i className="ki-outline ki-plus-square fs-3"></i>&nbsp;Add
          </Button>
        </ModalFooter>
      </Modal>
      {/* Create Space button */}
      <div className='menu-item px-5'>
        <button onClick={() => setShowModalCreateSpace(true)} className='btn menu-link w-100 rounded' style={{ paddingLeft: '15px' }}>
          + Create Space
        </button>
      </div>
      {/* create space modal done */}
      <Modal show={showModalSpaceCreate} onHide={() => { setShowModalCreateSpace(false); setShowSuccess('') }} title={"Create Space"}>
        <ModalBody>
          <TextField label='Space Name' required={true} name='spacename' value={spaceName} onChange={(e) => { setSpaceName(e.target.value) }} error={spaceNameError} />
          {showSuccess != '' && <span className="p-2 text-success">{showSuccess}</span>}
        </ModalBody>
        <ModalFooter>
          <Button isLoading={false} variant="primary" className="btn btn-sm btn-flex btn-secondary" onClick={() => { setShowModalCreateSpace(false); setShowSuccess('') }}>
            Cancel
          </Button>
          <Button isLoading={false} variant="primary" className="btn btn-sm btn-flex btn-primary" onClick={handleCreateSpace}>
            <i className="ki-outline ki-plus-square fs-3"></i>&nbsp;Create
          </Button>
        </ModalFooter>
      </Modal>
      {/* Sign Out link */}
      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div >
  );
};

export { HeaderUserMenu };
