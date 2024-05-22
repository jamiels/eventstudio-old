import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../app/modules/auth';
import { toAbsoluteUrl } from '../../../helpers';
import { Modal, ModalBody, ModalFooter } from '../../../../app/components/global/Modal';
import TextField from '../../../../app/components/global/TextField';
import Button from '../../../../app/components/global/Button';

const HeaderUserMenu: FC = () => {
  const { currentUser, logout } = useAuth();
  console.log("🚀 ~ currentUser:", currentUser)
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [name, setName] = useState(currentUser?.name || '');

  // Function to handle updating profile
  const handleUpdateProfile = () => {
    // Perform validation, for simplicity, I'm just checking if new password matches confirm password
    if (newPassword !== confirmNewPassword) {
      setPasswordError('New password and confirm password must match');
      return;
    }
    // Implement your logic for updating profile here
    // Example: userService.updateProfile({ name: newName, password: newPassword })
    // Then close the modal
    setShowProfileModal(false);
  };

  return (
    <div className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px' data-kt-menu='true'>
      {/* User information */}
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          {/* <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
          </div> */}

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.name}
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
        <span className='menu-link px-5' onClick={() => setShowProfileModal(true)}>
          My Profile
        </span>
      </div>

      {/* Sign Out link */}
      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>

      {/* Profile Modal */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} title={"Edit Profile"}>
        <ModalBody>
          <TextField label='Name' required={true} value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label='Current Password' type="password" required={true} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          <TextField label='New Password' type="password" required={true} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <TextField label='Confirm New Password' type="password" required={true} value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} error={passwordError} />
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleUpdateProfile} isLoading={false} className="">
            Update
          </Button>
          <Button variant="secondary" onClick={() => setShowProfileModal(false)} isLoading={false} className="">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div >
  );
};

export { HeaderUserMenu };
