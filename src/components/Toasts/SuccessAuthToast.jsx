import React from "react";

import CountdownTimer from "components/Shared/CountDownTimer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const SuccessAuthToast = ({t, title, subtitle}) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 pt-0.5">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="h-10 w-10 text-green-500"
            />
          </div>
          <div className="ml-3 grow">
            <p className="text-sm font-medium text-gray-900">
              {title}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {subtitle}
            </p>
          </div>
          <div>
            <CountdownTimer initialTime={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessAuthToast;
