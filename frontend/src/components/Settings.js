import React, { useEffect, useState } from 'react';
import { loadSetting, saveSetting } from '../actions/settings';
import { useDispatch } from 'react-redux';
import './__styles__/Settings.css';

function Settings() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setLoading(true)
        loadSetting((response) => {
                setName(response.data.name)
                setPassword(response.data.password)
                setLoading(false)
            }, dispatch);
    }, [dispatch]);

    const nameChangeHandler = (event) => setName(event.target.value);
    const passwordChangeHandler = (event) => setPassword(event.target.value);

    const onSubmit = (event) => {
        dispatch(saveSetting(name, password));
        event.preventDefault();
    };
    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="settings-container">
                <form onSubmit={onSubmit}>
                    <div className="field-container">
                        <label className="field-label">Name</label>
                        <input defaultValue={name} onChange={nameChangeHandler} className="field-value" />
                    </div>
                    <div className="field-container">
                        <label className="field-label">Password</label>
                        <input defaultValue={password} type="password" onChange={passwordChangeHandler} className="field-value" />
                    </div>
                    <div className="button-container">
                        <input type='submit' value='Apply' className="apply-button" />
                    </div>
                </form>
            </div>
        );
    }
}

export default Settings;
