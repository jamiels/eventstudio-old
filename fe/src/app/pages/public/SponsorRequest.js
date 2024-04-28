import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link, useParams } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import TextField from '../../components/global/TextField'
import sponsorReq from '../../apis/publicForms/sponsorReq'

export function SponsorPage() {
    const { eventUUID } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [involvement, setInvolvement] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const sponsorSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        involvement: Yup.string().required('Involvement is required'),
        linkedIn: Yup.string().required('LinkedIn is required')
    });

    const handleSponsorRequest = async () => {
        try {
            await sponsorSchema.validate({
                name,
                email,
                involvement,
                linkedIn
            }, { abortEarly: false });

            // If validation passes, make the request
            const res = await sponsorReq.addSponsorRequest({
                name,
                email,
                involvement,
                linkedIn
            }, eventUUID);

            setSuccessMessage(res.message);
            setError(null);
            setName('');
            setEmail('');
            setInvolvement('');
            setLinkedIn('');
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = err.inner.reduce((acc, val) => {
                    acc[val.path] = val.message;
                    return acc;
                }, {});
                setError(errors);
            } else {
                setError(err.message || "An error occurred");
            }
        }
    };

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
                    <TextField label='Name' required name='name' value={name} onChange={(e) => setName(e.target.value)} error={error && error.name} />
                    <TextField label='Email' required name='email' value={email} onChange={(e) => setEmail(e.target.value)} error={error && error.email} />
                    <TextField label='Involvement' required name='involvement' value={involvement} onChange={(e) => setInvolvement(e.target.value)} error={error && error.involvement} />
                    <TextField label='LinkedIn' required name='linkedIn' value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} error={error && error.linkedIn} />
                </div>
                {error && typeof error === 'string' && <div className="text-red-500">{error}</div>}
                {successMessage && <div className="text-green-500">{successMessage}</div>}
                <div className="mb-5 mt-10">
                    <button className="btn btn-sm btn-primary" onClick={handleSponsorRequest}>Request Sponsor</button>
                </div>
            </div>
        </div>
    )
}
