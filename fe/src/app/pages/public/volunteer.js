import { useState } from 'react';
import * as Yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../_metronic/helpers';
import TextField from '../../components/global/TextField';
import volunteerApi from '../../apis/publicForms/volunteer'; // Assuming you have a function to send volunteer request

export function Volunteer() {
    const { id } = useParams();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobilePhone, setMobilePhone] = useState('');
    const [communicationTools, setCommunicationTools] = useState([]);
    const [telegramId, setTelegramId] = useState('');
    const [linkedInURL, setLinkedInURL] = useState('https://linkedin.com/in/');
    const [areasOfSupport, setAreasOfSupport] = useState([]);
    const [businessAttire, setBusinessAttire] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const volunteerSchema = Yup.object().shape({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        mobilePhone: Yup.string(),
        communicationTools: Yup.array().of(Yup.string()).min(1, 'Please select at least one communication tool').required('Communication Tools are required'),
        telegramId: Yup.string(),
        linkedInURL: Yup.string().url('Invalid LinkedIn URL').required('LinkedIn URL is required'),
        areasOfSupport: Yup.array().of(Yup.string()).min(1, 'Please select at least one area of support').required('Areas of Support are required'),
        businessAttire: Yup.boolean(),
    });

    const handleVolunteerRequest = async () => {
        try {
            await volunteerSchema.validate({
                fullName,
                email,
                mobilePhone,
                communicationTools,
                telegramId,
                linkedInURL,
                areasOfSupport,
                businessAttire,
            }, { abortEarly: false });
            // If validation passes, make the request
            const res = await volunteerApi.addVolunteerRequest({
                fullName,
                email,
                mobilePhone,
                communicationTools,
                telegramID: telegramId,
                linkedInURL,
                areasOfSupport,
                businessAttire,
            }, id);

            setSuccessMessage(res.message);
            setError(null);
            // Reset form fields after successful submission
            setFullName('');
            setEmail('');
            setMobilePhone('');
            setCommunicationTools([]);
            setTelegramId('');
            setLinkedInURL('');
            setAreasOfSupport([]);
            setBusinessAttire(true);
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = err.inner.reduce((acc, val) => {
                    acc[val.path] = val.message;
                    return acc;
                }, {});
                setError(errors);
            } else {
                setError(err.message || 'An error occurred');
            }
        }
    };

    return (
        <div className="card card-flush w-md-650px py-5">
            <div className="card-body py-15 py-lg-20">
                <div className="mb-7">
                    <Link to={'/auth'} className="">
                        <img alt="Logo" src={toAbsoluteUrl('/event_logo.png')} className="h-40px" />
                    </Link>
                </div>
                <h1 className="fw-bolder text-gray-900 mb-5">Volunteer Request</h1>
                <div className="fw-semibold fs-6 text-gray-500 mb-7">Apply to be a volunteer at the event.</div>
                <div className="d-flex text-start flex-column">
                    <TextField label="Full Name" required name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} error={error && error.fullName} />
                    <TextField label="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} error={error && error.email} />
                    <TextField label="Mobile Phone #" name="mobilePhone" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} />
                    <div className="form-group">
                        <label className="form-label">For team communications, we use several tools. Which of the followings tools are you comfortable with?</label>
                        <div className="mb-2">
                            <input type="checkbox" id="whatsapp" value="WhatsApp" checked={communicationTools.includes('WhatsApp')} onChange={(e) => setCommunicationTools(e.target.checked ? [...communicationTools, e.target.value] : communicationTools.filter(tool => tool !== e.target.value))} />
                            <label htmlFor="whatsapp" className="ms-2">WhatsApp</label>
                        </div>
                        <div className="mb-2">
                            <input type="checkbox" id="telegram" value="Telegram" checked={communicationTools.includes('Telegram')} onChange={(e) => setCommunicationTools(e.target.checked ? [...communicationTools, e.target.value] : communicationTools.filter(tool => tool !== e.target.value))} />
                            <label htmlFor="telegram" className="ms-2">Telegram</label>
                        </div>
                        <div className="mb-2">
                            <input type="checkbox" id="slack" value="Slack" checked={communicationTools.includes('Slack')} onChange={(e) => setCommunicationTools(e.target.checked ? [...communicationTools, e.target.value] : communicationTools.filter(tool => tool !== e.target.value))} />
                            <label htmlFor="slack" className="ms-2">Slack</label>
                        </div>
                    </div>
                    <TextField label="Telegram ID" name="telegramId" value={telegramId} onChange={(e) => setTelegramId(e.target.value)} />
                    <TextField label="LinkedIn URL" required name="linkedInURL" value={linkedInURL} onChange={(e) => setLinkedInURL(e.target.value)} error={error && error.linkedInURL} />
                    <div className="form-group">
                        <label className="form-label">What areas of support do you feel you can best assist in?</label>
                        <div className="mb-2">
                            <input type="checkbox" id="checkin" value="Check-in / Registration Desk" checked={areasOfSupport.includes('Check-in / Registration Desk')} onChange={(e) => setAreasOfSupport(e.target.checked ? [...areasOfSupport, e.target.value] : areasOfSupport.filter(area => area !== e.target.value))} />
                            <label htmlFor="checkin" className="ms-2">Check-in / Registration Desk</label>
                        </div>
                        <div className="mb-2">
                            <input type="checkbox" id="socialmedia" value="Social media posts" checked={areasOfSupport.includes('Social media posts')} onChange={(e) => setAreasOfSupport(e.target.checked ? [...areasOfSupport, e.target.value] : areasOfSupport.filter(area => area !== e.target.value))} />
                            <label htmlFor="socialmedia" className="ms-2">Social media posts</label>
                        </div>
                        <div className="mb-2">
                            <input type="checkbox" id="photography" value="Photography" checked={areasOfSupport.includes('Photography')} onChange={(e) => setAreasOfSupport(e.target.checked ? [...areasOfSupport, e.target.value] : areasOfSupport.filter(area => area !== e.target.value))} />
                            <label htmlFor="photography" className="ms-2">Photography</label>
                        </div>
                        <div className="mb-2">
                            <input type="checkbox" id="escorting" value="Escorting and Directing Guest Traffic" checked={areasOfSupport.includes('Escorting and Directing Guest Traffic')} onChange={(e) => setAreasOfSupport(e.target.checked ? [...areasOfSupport, e.target.value] : areasOfSupport.filter(area => area !== e.target.value))} />
                            <label htmlFor="escorting" className="ms-2">Escorting and Directing Guest Traffic</label>
                        </div>
                        <div className="mb-2">
                            <input type="checkbox" id="avsetup" value="A/V Setup and Management" checked={areasOfSupport.includes('A/V Setup and Management')} onChange={(e) => setAreasOfSupport(e.target.checked ? [...areasOfSupport, e.target.value] : areasOfSupport.filter(area => area !== e.target.value))} />
                            <label htmlFor="avsetup" className="ms-2">A/V Setup and Management</label>
                        </div>
                        <div className="mb-2">
                            <input type="checkbox" id="promoting" value="Promoting Events (You're an influencer)" checked={areasOfSupport.includes('Promoting Events (You\'re an influencer)')} onChange={(e) => setAreasOfSupport(e.target.checked ? [...areasOfSupport, e.target.value] : areasOfSupport.filter(area => area !== e.target.value))} />
                            <label htmlFor="promoting" className="ms-2">Promoting Events (You're an influencer)</label>
                        </div>
                        <div className="mb-2">
                            <input type="checkbox" id="caterer" value="Managing Caterer" checked={areasOfSupport.includes('Managing Caterer')} onChange={(e) => setAreasOfSupport(e.target.checked ? [...areasOfSupport, e.target.value] : areasOfSupport.filter(area => area !== e.target.value))} />
                            <label htmlFor="caterer" className="ms-2">Managing Caterer</label>
                        </div>
                        <div className="mb-2">
                            <input type="checkbox" id="other" value="Other" checked={areasOfSupport.includes('Other')} onChange={(e) => setAreasOfSupport(e.target.checked ? [...areasOfSupport, e.target.value] : areasOfSupport.filter(area => area !== e.target.value))} />
                            <label htmlFor="other" className="ms-2">Other</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Are you ok with wearing business casual attire at our events?</label>
                        <div>
                            <input type="radio" id="yesAttire" value="true" checked={businessAttire} onChange={(e) => setBusinessAttire(true)} />
                            <label htmlFor="yesAttire" className="ms-2">Yes</label>
                        </div>
                        <div>
                            <input type="radio" id="noAttire" value="false" checked={!businessAttire} onChange={(e) => setBusinessAttire(false)} />
                            <label htmlFor="noAttire" className="ms-2">No</label>
                        </div>
                        {error && error.businessAttire && <div className="text-red-500">{error.businessAttire}</div>}
                    </div>
                </div>
                {error && typeof error === 'string' && <div className="text-red-500">{error}</div>}
                {successMessage && <div className="text-green-500">{successMessage}</div>}
                <div className="mb-5 mt-10">
                    <button className="btn btn-sm btn-primary" onClick={handleVolunteerRequest}>Send</button>
                </div>
            </div>
        </div>
    );
}
