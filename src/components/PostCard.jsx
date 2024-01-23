import React from "react";
import { Link } from "react-router-dom";

function Postcard({ $id, featuredImage, title }) {
  return (
    <Link to={`./post/${$id}`}>
      <div className="w-full rounded-xl p-4 bg-gray-400">
        <div className="w-full mb-4 justify-center">
          <img
            src={appwriteServices.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="font-blod text-xl">{title}</h2>
      </div>
    </Link>
  );
}

export default Postcard;
