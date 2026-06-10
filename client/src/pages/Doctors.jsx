import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { specialty } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [filterDoctors, setFilterDoctors] = useState([]);

  const applyFilter = () => {
    if (specialty) {
      setFilterDoctors(doctors.filter((doc) => doc.specialty === specialty));
    } else {
      setFilterDoctors(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, specialty]);

  return (
    <div>
      <p className="text-gray-600">Browse through specialist doctors.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          <p
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 
                       rounded transition-all cursor-pointer 
                       ${specialty === "General Physician" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() =>
              specialty === "General Physician"
                ? navigate("/doctors")
                : navigate("/doctors/General Physician")
            }
          >
            General Physician
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 
                       rounded transition-all cursor-pointer
                       ${specialty === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() =>
              specialty === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
          >
            Gynecologist
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 
                       rounded transition-all cursor-pointer
                       ${specialty === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() =>
              specialty === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
          >
            Dermatologist
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 
                       rounded transition-all cursor-pointer
                       ${specialty === "Pediatrician" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() =>
              specialty === "Pediatrician"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatrician")
            }
          >
            Pediatrician
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 
                       rounded transition-all cursor-pointer
                       ${specialty === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() =>
              specialty === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
          >
            Neurologist
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 
                       rounded transition-all cursor-pointer
                       ${specialty === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}
            onClick={() =>
              specialty === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoctors.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer
                       hover:-translate-y-2.5 transition-all duration-500"
            >
              <img src={item.image} className="bg-blue-50" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
