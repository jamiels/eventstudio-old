import { useState } from 'react';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../_metronic/helpers';
import TextField from '../../components/global/TextField';
import userApi from '../../apis/user';

export function CreatePassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const passwordSchema = Yup.object().shape({
        newPassword: Yup.string().required('New Password is required').min(8, 'Password is too short - should be 8 chars minimum.'),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required('Confirm Password is required')
    });

    const handlePasswordReset = async () => {
        try {
            await passwordSchema.validate({ newPassword, confirmPassword }, { abortEarly: false });

            const res = await userApi.createPassword({ newPassword, token });
            navigate('/login')
            setSuccessMessage(res.message);
            setError(null);
            setNewPassword('');
            setConfirmPassword('');
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
                <h1 className="fw-bolder text-gray-900 mb-5">Create Password</h1>
                <div className="fw-semibold fs-6 text-gray-500 mb-7">
                    Please enter your new password.
                </div>
                <div className="d-flex text-start flex-column">
                    <TextField
                        label='New Password'
                        required
                        type='password'
                        name='newPassword'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        error={error && error.newPassword}
                    />
                    <TextField
                        label='Confirm Password'
                        required
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={error && error.confirmPassword}
                    />
                </div>
                {error && typeof error === 'string' && <div className="text-red-500">{error}</div>}
                {successMessage && <div className="text-green-500">{successMessage}</div>}
                <div className="mb-5 mt-10">
                    <button className="btn btn-sm btn-primary" onClick={handlePasswordReset}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default CreatePassword;
