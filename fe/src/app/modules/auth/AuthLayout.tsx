/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid' style={{backgroundImage: `url('${toAbsoluteUrl("/media/auth/bg10.jpeg")}')`}}>
      <div className="d-flex flex-lg-row-fluid">
        <div className="d-flex flex-column flex-center pb-0 pb-lg-10 p-10 w-100">
            <img className="theme-light-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20" src={toAbsoluteUrl("/event_logo.png")} alt="" />
        </div>
      </div>

      <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 h-100">
        <div className="bg-body d-flex flex-column flex-center rounded-4 w-md-600px p-10">
          <div className="d-flex flex-center flex-column align-items-stretch h-lg-100 w-md-400px">
            <div className="d-flex flex-center flex-column flex-column-fluid pb-15 pb-lg-20">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {AuthLayout}
