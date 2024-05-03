import { Navigate, Route, Routes } from 'react-router-dom'
import { PublicLayout } from '../../modules/public/PublicLayout'
import { SponsorPage } from './SponsorRequest'
import { SpeakerReq } from './SpeakerReq'
import { Volunteer } from './volunteer'
import {SpeakerOnBoarding} from './SpeakerOnBoarding'

const PublicPage = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path='sponsor/:id' element={<SponsorPage />} />
      <Route index element={<Navigate to={'/public/sponsor/:id'} replace />} />
      <Route path='onboard/:id' element={<SpeakerOnBoarding />} />
      <Route index element={<Navigate to={'/public/onboard/:id'} replace />} />
      <Route path='speak/:id' element={<SpeakerReq />} />
      <Route index element={<Navigate to={'/public/speak/:id'} replace />} />
      <Route path='volunteer/:id' element={<Volunteer />} />
      <Route index element={<Navigate to={'/public/volunteer/:id'} replace />} />
      {/* <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} /> */}
    </Route>
  </Routes>
)

export { PublicPage }
