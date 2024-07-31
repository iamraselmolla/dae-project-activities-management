import { toBengaliNumber } from 'bengali-number';
import React from 'react';

const CropsModal = ({ isOpen, closeModal, crops }) => {
    return (
        <dialog id="my_modal_3" className="modal" open={isOpen}>
            <div className="modal-box">
                <form method="dialog">
                    <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className="py-4">
                    {crops?.map((crop, index) => (
                        <div key={index} className="py-1 flex gap-1">
                            {toBengaliNumber(index + 1)}. {crop}
                        </div>
                    ))}
                </div>
            </div>
        </dialog>
    );
};

export default CropsModal;
