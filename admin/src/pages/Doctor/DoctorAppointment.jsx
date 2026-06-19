import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const {
    doctorToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (doctorToken) {
      getAppointments();
    }
  }, [doctorToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div
        className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] 
                   overflow-y-scroll no-scrollbart"
      >
        <div
          className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 
                     px-6 py-3 border-b"
        >
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.reverse().map((item, idx) => (
          <div
            key={idx}
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid
                       grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center px-6 py-3 
                     text-gray-500 border-b hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{idx + 1}</p>
            <div className="flex items-center gap-2">
              <img src={item.userData.image} className="w-8 rounded-full" />
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p className="text-xs inline border border-primary px-2 rounded-full">
                {item.payment ? "Online" : "Cash"}
              </p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isComplete ? (
              <p className="text-green-500 text-xs font-medium">Complete</p>
            ) : (
              <div className="flex">
                <img
                  src={assets.cancel_icon}
                  className="w-10 cursor-pointer"
                  onClick={() => cancelAppointment(item._id)}
                />
                <img
                  src={assets.tick_icon}
                  className="w-10 cursor-pointer"
                  onClick={() => completeAppointment(item._id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
