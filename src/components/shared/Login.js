import React from 'react';

const Login = () => {
    return (
        <dialog id="my_modal_2" className="modal text-center">
            <div className="modal-box">
                <h3 className="font-bold text-xl mb-2">
                    লগিন করুন
                </h3>


                <div className="modal-action flex justify-center pb-5">
                    <form method="dialog">



                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default Login;