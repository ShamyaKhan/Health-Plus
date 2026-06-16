import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, getAllDoctors, adminToken, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      getAllDoctors();
    }
  }, [adminToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll no-scrollbar">
      <h1>All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((doc, idx) => (
          <div
            key={idx}
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden 
                       cursor-pointer group"
          >
            <img
              src={doc.image}
              className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
            />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">{doc.name}</p>
              <p className="text-zinc-600 text-sm">{doc.specialty}</p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={doc.available}
                  onChange={() => changeAvailability(doc._id)}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
