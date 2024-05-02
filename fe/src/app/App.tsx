import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { I18nProvider } from '../_metronic/i18n/i18nProvider'
import { LayoutProvider, LayoutSplashScreen } from '../_metronic/layout/core'
import { MasterInit } from '../_metronic/layout/MasterInit'
import { AuthInit } from './modules/auth'
import { ThemeModeProvider } from '../_metronic/partials'
import { SpaceProvider } from './context/space.provider'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <SpaceProvider>
          <LayoutProvider>
            <ThemeModeProvider>
              <AuthInit>
                <Outlet />
                <MasterInit />
              </AuthInit>
            </ThemeModeProvider>
          </LayoutProvider>
        </SpaceProvider>
      </I18nProvider>
    </Suspense>
  )
}

export { App }
