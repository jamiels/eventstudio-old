/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import TextField from '../../components/global/TextField'


export function SponsorPage() {

    return (
        <div className="card card-flush w-md-650px py-5">
            <div className="card-body py-15 py-lg-20">

                <div className="mb-7">
                    <Link to={"/auth"} className="">
                        <img alt="Logo" src={toAbsoluteUrl("/event_logo.png")} className="h-40px" />
                    </Link>
                </div>
                
                <h1 className="fw-bolder text-gray-900 mb-5">Welcome to Event Studio</h1>
                
                <div className="fw-semibold fs-6 text-gray-500 mb-7">
                    This is your opportunity to get sponsor!!!
                </div>

                <div className="d-flex text-start flex-column">
                    <TextField label='Email' required={true} name='email' onChange={(e) => {console.log(e.target.value)}} />

                    <TextField label='Name' required={true} name='name' onChange={(e) => {console.log(e.target.value)}} />

                    {/* <Select label='Veneue' name='veneue' options={[]} onChange={(e) => {console.log(e.value)}} /> */}
                </div>

                <div className="mb-5 mt-10">
                    <Link to={"/auth"} className="btn btn-sm btn-primary">Request Sponsor</Link>
                </div>
                
            </div>
        </div>
    )
}
