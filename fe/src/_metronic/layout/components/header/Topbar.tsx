import clsx from 'clsx'
import React, {FC} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {
  HeaderNotificationsMenu,
  HeaderUserMenu,
  QuickLinks,
  Search,
  ThemeModeSwitcher,
} from '../../../partials'

const toolbarButtonMarginClass = 'ms-1 ms-lg-3',
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px',
  toolbarButtonIconSizeClass = 'fs-1'

const Topbar: FC = () => {
  return (
    <div className='d-flex align-items-stretch flex-shrink-0'>
      <div className='topbar d-flex align-items-stretch flex-shrink-0'>

        {/* begin::Theme mode */}
        {/* <div className={'d-flex align-items-center ms-lg-5'}>
          <ThemeModeSwitcher toggleBtnClass='btn btn-active-light d-flex align-items-center bg-hover-light py-2 px-2 px-md-3' />
        </div> */}
        {/* end::Theme mode */}

        {/* begin::User */}
        <div className='d-flex align-items-center ms-lg-5' id='kt_header_user_menu_toggle'>
          <div
            className='btn btn-active-light d-flex align-items-center bg-hover-light py-2 px-2 px-md-3'
            data-kt-menu-trigger='click'
            data-kt-menu-attach='parent'
            data-kt-menu-placement='bottom-end'
          >
            <div className='symbol symbol-30px symbol-md-40px'>
              <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='avatar' />
            </div>
          </div>
          <HeaderUserMenu />
        </div>
        {/* end::User */}

        {/* Header menu toggle */}
        <div className='d-flex d-lg-none align-items-center me-n2' title='Show header menu'>
          <button
            className='btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTIcon iconName='burger-menu-2' className='fs-1' iconType='outline' />
          </button>
        </div>
      </div>
    </div>
  )
}

export {Topbar}
