import React from "react";

function SingleProfile({ user }) {
  return (
    <form>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4">
        <div>
          <label htmlFor={`block`}>ব্লকের নাম (ইংরেজী)</label>
          <input
            type="text"
            id={`block`}
            name={`block`}
            className="input input-bordered w-full"
            value={user?.block}
            readOnly
          />
        </div>

        <div>
          <label htmlFor={`blockB`}>ব্লকের নাম (বাংলা)</label>
          <input
            type="text"
            id={`blockB`}
            name={`blockB`}
            className="input input-bordered w-full"
            value={user?.blockB}
            readOnly
          />
        </div>

        <div>
          <label htmlFor={`union`}>ইউনিয়নের নাম (ইংরেজী)</label>
          <input
            type="text"
            id={`union`}
            name={`union`}
            className="input input-bordered w-full"
            value={user?.union}
            readOnly
          />
        </div>

        <div>
          <label htmlFor={`unionB`}>ইউনিয়নের নাম (বাংলা)</label>
          <input
            type="text"
            id={`unionB`}
            name={`unionB`}
            className="input input-bordered w-full"
            value={user?.unionB}
            readOnly
          />
        </div>
        <div>
          <label htmlFor={`username`}>ইউজার নাম</label>
          <input
            type="text"
            id={`username`}
            name={`username`}
            className="input input-bordered w-full"
            value={user?.username}
            readOnly
          />
        </div>
        <div>
          <label htmlFor={`password`}> পাসওয়ার্ড</label>
          <div className="flex items-center input input-bordered w-full">
            <input
              type="password"
              id={`password`}
              name={`password`}
              className="w-full"
              value={user?.password}
              readOnly
            />
          </div>
        </div>
        <div>
          <label htmlFor={`SAAO.name`}>উপসহকারী কৃষি অফিসারের নাম</label>
          <input
            type="text"
            id={`SAAO.name`}
            name={`SAAO.name`}
            className="input input-bordered w-full"
            value={user?.SAAO?.name}
            readOnly
          />
        </div>

        <div>
          <label htmlFor={`SAAO.mobile`}>
            উপসহকারী কৃষি অফিসারের মোবাইল নং
          </label>
          <input
            type="text"
            id={`SAAO.mobile`}
            name={`SAAO.mobile`}
            className="input input-bordered w-full"
            value={user?.SAAO?.mobile}
            readOnly
          />
        </div>
      </div>
    </form>
  );
}

export default SingleProfile;
