// src/shared/DeleteConfirmationModal.js
import React from 'react';

const DeleteConfirmationModal = ({ onClose, onConfirm, notice }) => {
    return (
        <div className="modal">
            <div className="modal-box">
                <h2 className="font-bold text-lg">নিশ্চিতকরণ</h2>
                <p>আপনি কি নিশ্চিতভাবে নোটিশটি মুছে ফেলতে চান?</p>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={onClose}>না</button>
                    <button type="button" className="btn btn-error" onClick={onConfirm}>হ্যাঁ</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
