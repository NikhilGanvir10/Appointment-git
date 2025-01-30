import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/appContext'

// function MyAppointment() {

//   const { doctors } = useContext(AppContext)

//   return (

//     <div>
//       <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
//       <div>
//         {doctors.slice(0, 4).map((item, index)=>(
//           <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
//             <div>
//               <img className='w-32 bg-indigo-50' src={item.image} alt="" />
//             </div>
//             <div className='flex-1 text-sm text-zinc-600'>
//               <p className='text-neutral-800 font-semibold'>{item.name}</p>
//               <p>{item.speciality}</p>
//               <p className='text-zinc-700 font-medium mt-1'>Address:</p>
//               <p className='text-xs'>{item.address.line1}</p>
//               <p className='text-xs'>{item.address.line2}</p>
//               <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> 25, July, 2024 | 8:30 PM</p>
//             </div>
//             <div></div>
//             <div className='flex flex-col gap-2 justify-end'>
//               <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>
//               <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover: bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

function MyAppointment() {
  const { appointments, setAppointments } = useContext(AppContext); // Access appointments from context 

  const cancelAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index); // Remove the appointment at the given index
    setAppointments(updatedAppointments); // Update the appointments in the context
  };

  const [showPaymentModal, setShowPaymentModal] = useState(false)
  // const [selectAppointment, setAppointments] = useState(true)
  const [selectAppointment, setAppointment] = useState(null)

  const handlePayOnline = (appointment) => {
    setAppointment(appointment); // Set the selected appointment
    setShowPaymentModal(true); // Open the payment modal
  };

  const proceedPayment = (method) => {
    // Example: Handle payment logic here
    alert(`Proceeding with ${method} payment for ${selectAppointment.doctor.name}`);
    setShowPaymentModal(false); // Close the modal after payment
  };

  if (appointments.length === 0) {
    return <p className="mt-12 text-center text-zinc-700">No appointments booked yet.</p>;
  }

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>
      <div>
        {appointments.map((appointment, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            {/* Doctor's Image */}
            <div>
              <img
                className="w-32 bg-indigo-50 rounded-lg"
                src={appointment.doctor.image}
                alt={appointment.doctor.name}
              />
            </div>

            {/* Appointment Details */}
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{appointment.doctor.name}</p>
              <p>{appointment.doctor.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{appointment.doctor.address.line1}</p>
              <p className="text-xs">{appointment.doctor.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">Date & Time:</span>{" "}
                {appointment.date} | {appointment.time}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 justify-center">
              <button onClick={()=> handlePayOnline(appointment)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                Pay Online
              </button>
              <button onClick={()=> cancelAppointment(index)} className="text-sm text-black text-center sm:min-w-48 py-2 border rounded bg-red-600 hover:bg-red-600 hover:text-white transition-all duration-300">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {/* Payment for {setAppointments.doctor.name} */}
              Payment for {selectAppointment.doctor.name}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Please select a payment method for your appointment with{" "}
              {/* {setAppointments.doctor.name} on {setAppointments.date} at{" "} */}
              {selectAppointment.doctor.name} on {selectAppointment.date} at{" "}
              {/* {setAppointments.time}. */}
              {selectAppointment.time}.
            </p>
            <div className="flex flex-col gap-4">
              <button onClick={()=> proceedPayment("Credit / Debit Card")} className="w-full py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                Credit/Debit Card
              </button>
              <button onClick={()=> proceedPayment("UPI")} className="w-full py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                UPI
              </button>
              <button onClick={()=> proceedPayment("Net Banking")} className="w-full py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                Net Banking
              </button>
            </div>
            <button
              onClick={() => setShowPaymentModal(false)} // Close the modal
              className="mt-6 w-full py-2 border rounded bg-red-700 text-white hover:bg-red-700 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );


}


export default MyAppointment