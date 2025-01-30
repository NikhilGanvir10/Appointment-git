import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/appContext'
import { assets } from '../assets/assets'
import RelatedDocts from '../components/relatedDoctors'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

// function Appointment() {

//   const {docId} = useParams()
//   const {doctors, currencySymbol} = useContext(AppContext)
//   // const {currencySymbol} = useContext(AppContext)
//   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

//   const [docInfo, setDocInfo] = useState(null)
//   const [docSlots, setDocSlots] = useState([])
//   const [slotIndex, setSlotIndex] = useState(0)
//   const [slotTime, setSlotTime] = useState('')

//   const fetchDocInfo = () => {
//     const docInfo = doctors.find(doc => doc._id === docId)
//     setDocInfo(docInfo)
//     console.log(docInfo)
//   }

//   const getAvailableSlot = async () => {

//     setDocSlots([]);

//     let today = new Date()

//     for(let i = 0; i < 7; i++){
//       let currentDate = new Date(today)
//       currentDate.setDate(today.getDate() + i)

//       let endTime = new Date()
//       endTime.setDate(today.getDate() + i)
//       endTime.setHours(21, 0, 0, 0)

//       if(today.getDate() === currentDate.getDate()){
//         currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
//         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)

//       }
//       else{
//         currentDate.setHours(10)
//         currentDate.setMinutes(0)
//       }

//       let timeSlots = []

//       while(currentDate < endTime){
//         let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

//         timeSlots.push({
//           datetime: new Date(currentDate),
//           time: formattedTime
//         })

//         currentDate.setMinutes(currentDate.getMinutes() + 30)
//       }

//       setDocSlots(prev => ([...prev, timeSlots]))
//     }
//   }

//   useEffect(()=> {
//     fetchDocInfo()
//   },[doctors, docId])

//   useEffect(() => {
//     getAvailableSlot()
//   }, [docInfo])

//   useEffect(() => {
//     console.log(docSlots)
//   }, [docSlots])

//   return docInfo (

//     <div>

//       <div>
//         <div className='flex flex-col sm:flex-row gap-4'>
//           <div>
//             {/* <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image || src/assets/doc1.png} alt="" /> */}
//             <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image } />
//           </div>

//         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
//           <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
//             {docInfo.name}
//             <img className='w-5' src={assets.verified_icon} alt="" /> 
//           </p>

//           <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
//             <p>{docInfo.degree} - {docInfo.speciality}</p>
//             <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
//           </div>

//           <div>
//             <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
//               About <img src={assets.info_icon} alt="" />
//             </p>
//             <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
//           </div>

//           <p className='text-gray-500 font-medium mt-4'>
//             Appointment fee: <span className='text-gray-600'>{currencySymbol} {docInfo.fees}</span>
//           </p>
//         </div>
//         </div >

//         <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>

//           <p>Booking slots</p>
//           <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//             {
//               docSlots.length && docSlots.map((item, index) => (
//                 <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-300'}`}>
//                   {/* <p></p> */}
//                   <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
//                   <p>{item[0] && item[0].datetime.getDate()}</p>
//                 </div>
//               ))
//             }
//           </div>

//           <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
//             {docSlots.length && docSlots[slotIndex].map((item, index)=> (
//               <p onClick={()=> setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white ' : 'text-gray-400 border border-gray-300' }` } key={index}>
//                 {item.time.toLowerCase()}
//               </p>
//             ))}
//           </div>

//           <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full '>Book Appointment</button>
//         </div>


//         <RelatedDocts docId={docId} speciality={docInfo.speciality} />

//       </div>
//     </div>

//   )
// }

function Appointment() {

  const { docId } = useParams();
  const { doctors, currencySymbol, appointments, setAppointments } = useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const [token] = useAuthState(auth)
  // const [show, setShow] = useState(false)
  const [show, setShow] = useState('')

  // Fetch doctor information based on docId
  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const doctor = doctors.find((doc) => doc._id === docId);
      if (doctor) {
        setDocInfo(doctor);
      } else {
        console.error("Doctor not found for the provided ID:", docId);
      }
    }
  }, [doctors, docId]);

  // Generate available time slots for booking
  useEffect(() => {
    if (docInfo) {
      const generateSlots = () => {
        const today = new Date();
        const slots = [];

        for (let i = 0; i < 7; i++) {
          const currentDate = new Date(today);
          currentDate.setDate(today.getDate() + i);

          const endTime = new Date(currentDate);
          endTime.setHours(21, 0, 0, 0);

          if (today.getDate() === currentDate.getDate()) {
            currentDate.setHours(Math.max(currentDate.getHours(), 10));
            currentDate.setMinutes(currentDate.getMinutes() > 30 ? 60 : 30);
          } else {
            currentDate.setHours(10, 0, 0, 0);
          }

          const timeSlots = [];
          while (currentDate < endTime) {
            const formattedTime = currentDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            timeSlots.push({
              datetime: new Date(currentDate),
              time: formattedTime,
            });
            currentDate.setMinutes(currentDate.getMinutes() + 30);
          }
          slots.push(timeSlots);
        }
        setDocSlots(slots);
      };

      generateSlots();
    }
  }, [docInfo]);


  const handleBookAppointment = () => {
    if (slotTime && docInfo) {
      const selectedSlot = docSlots[slotIndex].find((slot) => slot.time === slotTime);
      const appointment = {
        doctor: docInfo,
        date: selectedSlot.datetime.toLocaleDateString(),
        time: selectedSlot.time,
      };
      setAppointments((prev) => [...prev, appointment]); // Save the appointment globally
      alert("Appointment booked successfully!");
    } else {
      alert("Please select a date and time.");
    }
  };

  // useEffect(()=>{
  //   if(!token){
      
  //   }
  // })

  const handle = () => {
    setShow("Please login to book appointment")
  }


  // Handle loading or missing doctor info
  if (!docInfo) {
    return <p>Loading doctor details...</p>;
  }

  return (
    <div>
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Doctor Image */}
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

          {/* Doctor Information */}
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="Verified" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience} years
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="Info" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol} {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-300"
                  }`}
                >
                  <p>{daysOfWeek[item[0]?.datetime.getDay()]}</p>
                  <p>{item[0]?.datetime.getDate()}</p>
                </div>
              ))}
          </div>

          {/* Slot Times */}
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots[slotIndex]?.map((slot, idx) => (
                <p
                  key={idx}
                  onClick={() => setSlotTime(slot.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    slot.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                >
                  {slot.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* <svg style={{color: 'black'}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg> */}

          <br />
          {/* Book Button */}
            
          <button onClick={token ? handleBookAppointment : handle} className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full">
            Book Appointment
          </button>
        
          {show && <p className='mt-4 text-red-400'>{show}</p>}
</div>
        {/* Related Doctors */}
        <RelatedDocts docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  );

}


export default Appointment