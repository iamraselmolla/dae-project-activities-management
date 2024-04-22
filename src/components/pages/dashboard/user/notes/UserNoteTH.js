import React from "react";

const UserNoteTH = ({ text }) => {
  return (
    <th
      scope="col"
      className="py-4 font-extrabold px-2  text-black text-center uppercase"
    >
      {text}
    </th>
  );
};

export default UserNoteTH;
