/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const PublicLayout = () => {
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
        <div className='d-flex flex-column flex-column-fluid' style={{backgroundImage: `url('${toAbsoluteUrl("/media/auth/bg8.jpg")}')`}}>
            <div className="d-flex flex-column flex-center text-center p-10 h-100">
                <Outlet />
            </div>
        </div>
    )
}

export {PublicLayout}
