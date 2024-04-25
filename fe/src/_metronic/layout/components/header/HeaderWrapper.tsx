/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {useThemeMode} from '../../../partials'
import {useLayout} from '../../core'
import {Header} from './Header'
import {Topbar} from './Topbar'

export function HeaderWrapper() {
  const {config, classes, attributes} = useLayout()

  const {header, aside} = config
  const {mode} = useThemeMode()

  const [offset, setOffset] = useState<string>(``)
  // useEffect(() => {
  //   let newString = `{default: '200px', lg: '250px'}`
  //   if (header.fixed.desktop) {
  //     if (!header.fixed.tabletAndMobile) {
  //       newString = `{lg: '250px'}`
  //     }
  //   } else {
  //     newString = `{default: '200px', lg: false}`
  //   }

  //   setOffset(newString)
  // }, [header.fixed])

  const [height, setHeight] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      setHeight(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch')}
      {...attributes.headerMenu}
      data-kt-sticky='true'
      data-kt-sticky-name='header'
      // data-kt-sticky-offset={offset}
      style={height > 0 ? {zIndex: 99, right: 0, width: '100%'}: {}}
    >

      <div
        className={clsx(
          classes.headerContainer.join(' '),
          'd-flex align-items-stretch justify-content-between px-8'
        )}
      >
        {/* begin::Aside mobile toggle */}


        <div className='d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-5'>
          <div
            className='btn btn-icon btn-active-icon-primary ms-n2 me-2 d-flex d-lg-none'
            id='kt_aside_toggle'
          >
            <KTIcon iconName='abstract-14' iconType='outline' className='fs-1' />
          </div>

          <Link to='/'>
            {mode === 'light' && (
              <img
                alt='Logo'
                src={toAbsoluteUrl('/event_logo.png')}
                className='d-lg-inline h-30px theme-light-show'
              />
            )}
            {mode === 'dark' && (
              <img
                alt='Logo'
                src={toAbsoluteUrl('/event_logo.png')}
                className='d-lg-inline h-30px theme-dark-show'
              />
            )}
          </Link>
        </div>

        <div className='d-flex align-items-stretch justify-content-between flex-lg-grow-1'>
          <div className='d-flex align-items-stretch'>
            {header.left === 'menu' && (
              <div className='d-flex align-items-stretch' id='kt_header_nav'>
                <Header />
              </div>
            )}
          </div>

          <Topbar />
        </div>
      </div>
    </div>
  )
}
