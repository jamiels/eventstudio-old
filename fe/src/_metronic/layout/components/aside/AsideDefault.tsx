import React, { FC } from 'react'
import clsx from 'clsx'
import { useLayout } from '../../core'
import { Link, NavLink } from 'react-router-dom'

const AsideDefault: FC = () => {
  const { config, classes } = useLayout()
  const { aside } = config

  return (
    <div
      id='kt_aside'
      className={clsx('aside', classes.aside.join(' '), { 'd-none': !aside.display })}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '225px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_toggle'
    >
      <div
        className='hover-scroll-overlay-y my-5 my-lg-5 w-100 ps-4 ps-lg-0 pe-4 me-1'
        id='kt_aside_menu_wrapper'
        data-kt-scroll='true'
        data-kt-scroll-activate='{default: false, lg: true}'
        data-kt-scroll-height='auto'
        data-kt-scroll-dependencies='#kt_header'
        data-kt-scroll-wrappers='#kt_aside'
        data-kt-scroll-offset='5px'
      >

        <div
          className='menu menu-column menu-active-bg menu-hover-bg menu-title-gray-700 fs-6 menu-rounded w-100'
          id='#kt_aside_menu'
          data-kt-menu='true'
        >
          <div className='menu-item'>
            <div className='menu-content pb-2'>
              <span className='menu-section text-muted text-uppercase fs-7 fw-bolder'>Dashboard</span>
            </div>
          </div>

          <div className="menu-item">
            <NavLink to='/dashboard/events' className='menu-link'>
              <span className="menu-title">Events</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink to='/dashboard/organizations' className='menu-link'>
              <span className="menu-title">Organizations</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink to='/dashboard/venues' className='menu-link'>
              <span className="menu-title">Venues</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink to='/dashboard/speakers' className='menu-link'>
              <span className="menu-title">Speakers</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink to='/dashboard/sponsorships' className='menu-link'>
              <span className="menu-title">Sponsorships</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink to='/dashboard/producers' className='menu-link'>
              <span className="menu-title">Producers</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink to='/dashboard/sponsor-requests' className='menu-link'>
              <span className="menu-title">Sponsor Requests</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink to='/dashboard/speaking-requests' className='menu-link'>
              <span className="menu-title">Speaking Requests</span>
            </NavLink>
          </div>

          <div className="menu-item">
            <NavLink to='/dashboard/speaker-onboard' className='menu-link'>
              <span className="menu-title">Speaker Onboarding</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export { AsideDefault }
