import Lottie from "lottie-react";
import error from "../assets/lottieFiles/error.json";

import { Link } from "react-router-dom";
function Error() {
  return (
    <>
      <div className=" flex flex-col items-center ">
        <div className="">
          {" "}
          <Lottie
            animationData={error}
            style={{ width: "500px", height: "350px" }}
          />
        </div>
        <Link
          className="text-[20px] text-gray-500 text-center"
          to="/"
          replace={true}
        >
          Looks like you have reached a non-existent page.
          <br />
          How about going back to safety?
          <br />
          Click Here
        </Link>
      </div>
    </>
  );
}

export default Error;
