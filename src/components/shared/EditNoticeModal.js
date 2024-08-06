// src/shared/EditNoticeModal.js
import React, { useState } from 'react';

const EditNoticeModal = ({ onClose, notice, onSave }) => {
    const [formValues, setFormValues] = useState(notice);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formValues);
    };

    return (
        <div className="modal">
            <div className="modal-box">
                <h2 className="font-bold text-lg">নোটিশ সম্পাদনা করুন</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">বিষয়</label>
                        <input
                            type="text"
                            name="subject"
                            value={formValues.subject}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">বিষয়বস্তু</label>
                        <textarea
                            name="content"
                            value={formValues.content}
                            onChange={handleChange}
                            className="textarea textarea-bordered"
                            required
                        />
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={onClose}>বাতিল</button>
                        <button type="submit" className="btn btn-primary">সংরক্ষণ</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNoticeModal;
