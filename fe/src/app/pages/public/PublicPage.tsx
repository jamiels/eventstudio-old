import {Navigate, Route, Routes} from 'react-router-dom'
import { PublicLayout } from '../../modules/public/PublicLayout'
import { SponsorPage } from './SponsorRequest'
import { SponsorBoarding } from './SponsorBoarding'
import { SpeakerReq } from './SpeakerReq'

const PublicPage = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path='sponsor/:eventUUID' element={<SponsorPage />} />
      <Route index element={<Navigate to={'/public/sponsor/:eventUUID'} replace />} />
      <Route path='onboard/:eventUUID' element={<SponsorBoarding />} />
      <Route index element={<Navigate to={'/public/onboard/:eventUUID'} replace />} />
      <Route path='speak/:eventUUID' element={<SpeakerReq />} />
      <Route index element={<Navigate to={'/public/speak/:eventUUID'} replace />} />
      {/* <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} /> */}
    </Route>
  </Routes>
)

export {PublicPage}
