import { FC, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { DisableSidebar } from '../../_metronic/layout/core'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import EventDetailsPage from '../pages/dashboard/EventDetails'
import SpaceManagementPage from '../pages/dashboard/SpaceManagement'
import { useSpace } from '../context/space.provider'

const PrivateRoutes = () => {
  const { selectedSpace } = useSpace();
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const DevPage = lazy(() => import('../modules/apps/dev/DevPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard/events' />} />
        {/* Pages */}
        <Route path='dashboard/events' element={<DashboardWrapper sidebar="events" />} />
        <Route path='dashboard/space-management' element={<SpaceManagementPage />} />
        <Route path='dashboard/events/details/:eventId' element={<EventDetailsPage />} />
        <Route path='dashboard/organizations' element={<DashboardWrapper sidebar="organizations" />} />
        <Route path='dashboard/venues' element={<DashboardWrapper sidebar="venues" />} />
        <Route path='dashboard/speakers' element={<DashboardWrapper sidebar="speakers" />} />
        <Route path='dashboard/sponsorships' element={<DashboardWrapper sidebar="sponsorships" />} />
        <Route path='dashboard/producers' element={<DashboardWrapper sidebar="producers" />} />
        <Route path='dashboard/sponsor-requests' element={<DashboardWrapper sidebar="sponsor-requests" />} />
        <Route path='dashboard/speaking-requests' element={<DashboardWrapper sidebar="speaking-requests" />} />
        <Route path='dashboard/speaker-onboard' element={<DashboardWrapper sidebar="speaker-onboard" />} />
        <Route path='dashboard/volunteer' element={<DashboardWrapper sidebar="volunteer" />} />
        {/* Conditional route based on isAdmin */}
        <Route
          path='dashboard/users'
          element={
            selectedSpace?.isAdmin ? (
              <DashboardWrapper sidebar="Users" />
            ) : (
              <Navigate to='/dashboard/events' />
            )
          }
        />
        <Route path='dashboard' element={<Navigate to='/dashboard/events' />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/devs/*'
          element={
            <SuspensedView>
              <DevPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return (
    <Suspense fallback={<TopBarProgress />}>
      <DisableSidebar>{children}</DisableSidebar>
    </Suspense>
  )
}

export { PrivateRoutes }
