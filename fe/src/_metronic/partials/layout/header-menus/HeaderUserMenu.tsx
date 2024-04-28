import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../app/modules/auth';
import { toAbsoluteUrl } from '../../../helpers';
import { useTeam } from '../../../../app/context/Team.provider'; // Import the useTeam hook from TeamContext
import teamsApi from '../../../../app/apis/dashboard/teams';
import { Modal, ModalBody } from '../../../../app/components/global/Modal';
import TextField from '../../../../app/components/global/TextField';
import { ModalFooter, PlaceholderButton } from 'react-bootstrap';
import Button from '../../../../app/components/global/Button';

const HeaderUserMenu: FC = () => {
  const { currentUser, logout, auth } = useAuth();
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teams, setTeams] = useState([]);
  const { updateSelectedTeam, selectedTeamOver } = useTeam();
  const [showModalTeamCreate, setShowModalCreateTeam] = useState(false);
  const [showModalAddToTeamCreate, setShowModalAddToCreateTeam] = useState(false);
  const [teamIdError, setTeamIDError] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [teamNameError, setTeamNameError] = useState('');
  const [showSuccess, setShowSuccess] = useState('');
  const [errors, setError] = useState(null);

  useEffect(() => {
    teamsApi.getTeams(auth?.token).then((res) => setTeams(res?.userTeams))
  }, [])

  const handleTeamSelect = (team: any) => {
    setSelectedTeam(team?.team?.team_name);
    updateSelectedTeam(team);
  };

  // Function to handle adding user to a team
  const handleAddToTeam = () => {
    if (selectedTeamOver?.team_id == null) setTeamIDError(true);
    if (email === '') setEmailError('Email is required');

    teamsApi.addUserToTeam({ email, team_id: selectedTeamOver?.team_id }, auth?.token)
      .then((res) => {
        setShowSuccess(res?.response?.data?.message || res.message)
        setEmail('');
      }).catch((err) => {
        setError(err?.response?.data?.message || "Error occured");
        console.log("🚀 ~ .then ~ err: line no 49", err?.response?.data?.message)
      })

  };

  // Function to handle creating a new team
  const handleCreateTeam = () => {
    if (teamName === '') setTeamNameError('Team Name is required');
    teamsApi.addTeam({ team_name: teamName }, auth?.token)
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res)
        setShowSuccess(res?.response?.data?.message || res.message)
        teamsApi.getTeams(auth?.token).then((res) => setTeams(res?.userTeams))
        setTeamName('');
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

      {/* Team Selector */}
      <div className='menu-item px-5 mx-5 dropdown'>
        <button className='btn btn-link dropdown-toggle' type='button' id='teamSelectorDropdown' data-bs-toggle='dropdown' aria-expanded='false'>
          {selectedTeam ? selectedTeamOver?.team?.team_name : 'Select Team'}
        </button>
        <ul className='dropdown-menu overflow-auto' style={{ height: '200px' }} aria-labelledby='teamSelectorDropdown'>
          {teams.map((team: any, index) => (
            <li key={index} onClick={() => handleTeamSelect(team)} className='dropdown-item'>{team?.team?.team_name}</li>
          ))}
        </ul>
      </div>

      {/* Add to Team button */}
      <div className='menu-item px-5 '>
        <button onClick={() => setShowModalAddToCreateTeam(true)} className='btn menu-link w-100 rounded' style={{ paddingLeft: '15px' }}>
          + Add to Team
        </button>
      </div>
      {/* create team modal done */}
      <Modal show={showModalAddToTeamCreate} onHide={() => { setShowModalAddToCreateTeam(false); setTeamIDError(false); setShowSuccess('') }} title={"Add User To Team"}>
        <ModalBody>
          {teamIdError && <h6 className="p-2 text-danger display-6">Please select a team first</h6>}
          <TextField label='User Email' required={true} name='email' value={email} onChange={(e) => { setEmail(e.target.value) }} error={emailError} />
          {showSuccess != '' && <span className="p-2 text-success">{showSuccess}</span>}
          {errors != '' && <span className="p-2 text-success">{errors}</span>}
        </ModalBody>
        <ModalFooter>
          <Button isLoading={false} variant="primary" className="btn btn-sm btn-flex btn-secondary" onClick={() => { setShowModalAddToCreateTeam(false); setTeamIDError(false); setShowSuccess('') }}>
            Cancel
          </Button>
          <Button isLoading={false} variant="primary" className="btn btn-sm btn-flex btn-primary" onClick={handleAddToTeam}>
            <i className="ki-outline ki-plus-square fs-3"></i>&nbsp;Add
          </Button>
        </ModalFooter>
      </Modal>
      {/* Create Team button */}
      <div className='menu-item px-5'>
        <button onClick={() => setShowModalCreateTeam(true)} className='btn menu-link w-100 rounded' style={{ paddingLeft: '15px' }}>
          + Create Team
        </button>
      </div>
      {/* create team modal done */}
      <Modal show={showModalTeamCreate} onHide={() => { setShowModalCreateTeam(false); setTeamIDError(false); setShowSuccess('') }} title={"Create Team"}>
        <ModalBody>
          <TextField label='Team Name' required={true} name='teamname' value={teamName} onChange={(e) => { setTeamName(e.target.value) }} error={teamNameError} />
          {showSuccess != '' && <span className="p-2 text-success">{showSuccess}</span>}
        </ModalBody>
        <ModalFooter>
          <Button isLoading={false} variant="primary" className="btn btn-sm btn-flex btn-secondary" onClick={() => { setShowModalCreateTeam(false); setTeamIDError(false); setShowSuccess('') }}>
            Cancel
          </Button>
          <Button isLoading={false} variant="primary" className="btn btn-sm btn-flex btn-primary" onClick={handleCreateTeam}>
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
