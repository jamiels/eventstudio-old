import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link, useParams } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import TextField from '../../components/global/TextField'
import speakerReq from '../../apis/publicForms/speakingReq'

export function SpeakerReq() {
    const { id } = useParams();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [organization, setOrganization] = useState('');
    const [title, setTitle] = useState('');
    const [panelists, setPanelists] = useState(false);
    const [abstract, setAbstract] = useState('');
    const [linkedInURL, setLinkedInURL] = useState('');
    const [sponsorshipInterest, setSponsorshipInterest] = useState('Yes');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const speakerSchema = Yup.object().shape({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        organization: Yup.string().required('Organization is required'),
        title: Yup.string().required('Title is required'),
        panelists: Yup.boolean().required('Panelists is required'),
        abstract: Yup.string().required('Abstract is required'),
        linkedInURL: Yup.string().url('Invalid LinkedIn URL').required('LinkedIn URL is required'),
        sponsorshipInterest: Yup.string().required('Sponsorship Interest is required')
    });

    const handleSpeakerRequest = async () => {
        try {
            await speakerSchema.validate({
                fullName,
                email,
                organization,
                title,
                panelists: panelists,
                abstract,
                linkedInURL,
                sponsorshipInterest
            }, { abortEarly: false });

            // If validation passes, make the request
            const res = await speakerReq.addSpeakingRequest({
                fullName,
                email,
                organization,
                title,
                panelists,
                abstract,
                linkedInURL,
                sponsorshipInterest
            }, id);
            console.log("🚀 ~ handleSpeakerRequest ~ res:", res)
            setSuccessMessage(res.message);
            setError(null);
            setFullName('');
            setEmail('');
            setOrganization('');
            setTitle('');
            setPanelists(false);
            setAbstract('');
            setLinkedInURL('');
            setSponsorshipInterest('');
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
                <h1 className="fw-bolder text-gray-900 mb-5">Speaker Request</h1>
                <div className="fw-semibold fs-6 text-gray-500 mb-7">
                    Apply to be a speaker at the event.
                </div>
                <div className="d-flex text-start flex-column">
                    <TextField label='Full Name' required name='fullName' value={fullName} onChange={(e) => setFullName(e.target.value)} error={error && error.fullName} />
                    <TextField label='Email' required name='email' value={email} onChange={(e) => setEmail(e.target.value)} error={error && error.email} />
                    <TextField label='Organization' required name='organization' value={organization} onChange={(e) => setOrganization(e.target.value)} error={error && error.organization} />
                    <TextField label='Title' required name='title' value={title} onChange={(e) => setTitle(e.target.value)} error={error && error.title} />
                    <div className="form-group">
                        <label htmlFor="panelists" className="form-label">If you're proposing a panel, do you have panelists in mind you'd recruit? </label>
                        <select id="panelists" className="form-select" value={panelists} onChange={(e) => setPanelists(e.target.value)}>
                            <option value={true}> Yes, I can create a panel</option>
                            <option value={false}> No, I would need help filling a panel</option>
                        </select>
                        {error && error.panelists && <div className="text-red-500">{error.panelists}</div>}
                    </div>

                    <div data-mdb-input-init className="form-outline my-5">
                        <label className="form-label" for="textAreaExample">Provide a short abstract of your talk (max 200 characters)</label>
                        <textarea maxLength={200} value={abstract} onChange={(e) => setAbstract(e.target.value)} required className="form-control" id="textAreaExample1" rows="4"></textarea>
                    </div>

                    <TextField label='LinkedIn URL' required name='linkedInURL' value={linkedInURL} onChange={(e) => setLinkedInURL(e.target.value)} error={error && error.linkedInURL} />
                    <div className="form-group">
                        <label htmlFor="sponsorshipInterest" className="form-label">My organization may consider sponsoring events</label>
                        <select id="sponsorshipInterest" className="form-select" value={sponsorshipInterest} onChange={(e) => setSponsorshipInterest(e.target.value)}>
                            <option value="Yes">Yes</option>
                            <option value="Possibly">Possibly</option>
                            <option value="No">No</option>
                        </select>

                        {error && error.sponsorshipInterest && <div className="text-red-500">{error.sponsorshipInterest}</div>}
                    </div>
                </div>
                {error && typeof error === 'string' && <div className="text-red-500">{error}</div>}
                {successMessage && <div className="text-green-500">{successMessage}</div>}
                <div className="mb-5 mt-10">
                    <button className="btn btn-sm btn-primary" onClick={handleSpeakerRequest}>Submit</button>
                </div>
            </div>
        </div>
    )
}
