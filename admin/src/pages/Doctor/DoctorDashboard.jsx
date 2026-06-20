import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { currency, slotDateFormat } = useContext(AppContext);
  const {
    dashboardData,
    setDashboardData,
    getDashboardData,
    doctorToken,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (doctorToken) {
      getDashboardData();
    }
  }, [doctorToken]);

  return (
    dashboardData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div
            className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2
                         border-green-100 cursor-pointer hover:scale-105 transition-all"
          >
            <img src={assets.earning_icon} className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency} {dashboardData.earning}
              </p>
              <p className="text-gray-400">Earning</p>
            </div>
          </div>

          <div
            className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2
                         border-green-100 cursor-pointer hover:scale-105 transition-all"
          >
            <img src={assets.appointments_icon} className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div
            className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2
                         border-green-100 cursor-pointer hover:scale-105 transition-all"
          >
            <img src={assets.patients_icon} className="w-14" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashboardData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} />
            <p className="font-semibold">Latest Appointments</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashboardData.latestAppointments.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
              >
                <img src={item.userData.image} className="rounded-full w-10" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
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
      </div>
    )
  );
};

export default DoctorDashboard;
