import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link, useParams } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import TextField from '../../components/global/TextField'
import sponsorboarding from '../../apis/publicForms/sponsorBoarding'

export function SponsorBoarding() {
    const { id } = useParams();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [linkedInURL, setLinkedInURL] = useState('');
    const [twitterURL, setTwitterURL] = useState('');
    const [headshotURL, setHeadshotURL] = useState('');
    const [title, setTitle] = useState('');
    const [organization, setOrganization] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const sponsorSchema = Yup.object().shape({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        bio: Yup.string().required('Bio is required'),
        twitterURL: Yup.string().url('Invalid twitter URL').required('Twitter URL is required'),
        linkedInURL: Yup.string().url('Invalid LinkedIn URL').required('LinkedIn URL is required'),
        headshotURL: Yup.string().url('Invalid headshot URL').required('Headshot URL is required'),
        title: Yup.string().required('Title is required'),
        organization: Yup.string().required('Organization is required')
    });

    const handleSponsorBoarding = async () => {
        try {
            await sponsorSchema.validate({
                fullName,
                email,
                bio,
                linkedInURL,
                twitterURL,
                headshotURL,
                title,
                organization
            }, { abortEarly: false });

            // If validation passes, make the request
            const res = await sponsorboarding.addSponsorOnboarding({
                fullName,
                email,
                bio,
                linkedInURL,
                twitterURL,
                headshotURL,
                title,
                organization
            }, id);

            setSuccessMessage(res.message);
            setError(null);
            setFullName('');
            setEmail('');
            setBio('');
            setLinkedInURL('');
            setTwitterURL('');
            setHeadshotURL('');
            setTitle('');
            setOrganization('');
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
                <h1 className="fw-bolder text-gray-900 mb-5">Sponsor Boarding</h1>
                <div className="fw-semibold fs-6 text-gray-500 mb-7">
                    Complete the form to apply for sponsorship.
                </div>
                <div className="d-flex text-start flex-column">
                    <TextField label='Full Name' required name='fullName' value={fullName} onChange={(e) => setFullName(e.target.value)} error={error && error.fullName} />
                    <TextField label='Email' required name='email' value={email} onChange={(e) => setEmail(e.target.value)} error={error && error.email} />
                    <TextField label='Bio' required name='bio' value={bio} onChange={(e) => setBio(e.target.value)} error={error && error.bio} />
                    <TextField label='LinkedIn URL' required name='linkedInURL' value={linkedInURL} onChange={(e) => setLinkedInURL(e.target.value)} error={error && error.linkedInURL} />
                    <TextField label='Twitter URL' required name='twitterURL' value={twitterURL} onChange={(e) => setTwitterURL(e.target.value)} error={error && error.twitterURL} />
                    <TextField label='Headshot URL' required name='headshotURL' value={headshotURL} onChange={(e) => setHeadshotURL(e.target.value)} error={error && error.headshotURL} />
                    <TextField label='Title' required name='title' value={title} onChange={(e) => setTitle(e.target.value)} error={error && error.title} />
                    <TextField label='Organization' required name='organization' value={organization} onChange={(e) => setOrganization(e.target.value)} error={error && error.organization} />
                </div>
                {error && typeof error === 'string' && <div className="text-red-500">{error}</div>}
                {successMessage && <div className="text-green-500">{successMessage}</div>}
                <div className="mb-5 mt-10">
                    <button className="btn btn-sm btn-primary" onClick={handleSponsorBoarding}>Submit</button>
                </div>
            </div>
        </div>
    )
}
