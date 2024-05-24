/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {EnableSidebar, PageTitle} from '../../../_metronic/layout/core'
import {Questions} from '../../modules/apps/dev/components/partials/Questions'
import EventsPage from './EventsPage'
import VenuesPage from './VenuesPage'
import SpeakerPage from './SpeakersPage'
import SponsorshipPage from './SponsorshipPage'
import ProducerPage from './ProducerPage'
import OrganizationPage from './OrganizationsPage'
import SponsorshipRequestPage from './SponsorRequestPage'
import SpeakingRequestPage from './SpeakingRequestPage'
import SpeakerOnboardPage from './SpeakerOnboardPage'
import VolunteerPage from './VolunteerPage'
import UserList from './UserList'

interface DashboardWrapperProps {
  sidebar: string;
}

const DashboardWrapper: FC<DashboardWrapperProps> = ({sidebar}) => {
  // const intl = useIntl()
  return (
    <EnableSidebar>
      {
        sidebar == "events" ? 
        <EventsPage />
        : sidebar == "organizations" ? 
        <OrganizationPage />
        : sidebar == "venues" ? 
        <VenuesPage />
        : sidebar == "speakers" ? 
        <SpeakerPage />
        : sidebar == "sponsorships" ? 
        <SponsorshipPage />
        : sidebar == "producers" ? 
        <ProducerPage />
        : sidebar == "sponsor-requests" ? 
        <SponsorshipRequestPage />
        : sidebar == "speaking-requests" ? 
        <SpeakingRequestPage />
        : sidebar == "speaker-onboard" ? 
        <SpeakerOnboardPage />
        : sidebar == "Users" ? 
        <UserList />
        : sidebar == "volunteer" ? 
        <VolunteerPage />
        : ''
      }
    </EnableSidebar>
  )
}

export {DashboardWrapper}
