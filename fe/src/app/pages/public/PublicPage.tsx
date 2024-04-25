import {Navigate, Route, Routes} from 'react-router-dom'
import { PublicLayout } from '../../modules/public/PublicLayout'
import { SponsorPage } from './SponsorRequest'

const PublicPage = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path='sponsor' element={<SponsorPage />} />
      <Route index element={<Navigate to={'/public/sponsor'} replace />} />
      {/* <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} /> */}
    </Route>
  </Routes>
)

export {PublicPage}
