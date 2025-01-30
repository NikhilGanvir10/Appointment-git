import React, { useState } from 'react'
import firebase from 'firebase/compat/app'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Login() {

  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [sucess, setSucess] = useState('')

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try{
      if(state === 'Sign Up'){
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        setSucess("Registration Successful")
        setError('')
        await signOut(auth)
        
      }
      else{
        await firebase.auth().signInWithEmailAndPassword(email, password)
        setSucess("Login Successful")
        setError('')
        navigate('/')
      }
    }
    catch(err){
      setError(err.message)
      setSucess('')
    }

  }

  // const [email, setEmail] = useState('');

  // const handleEmail = (e) => setEmail(e.target.value);
  // const handlePassword = (e) => setPassword(e.target.value)

  // const onSubmit = async () => {
  //   try {
  //     const res = await firebase.auth().signInWithEmailAndPassword(email, password)

  //   }
  //   catch (err){
  //     setError(err.message)
  //   }
  // }

  // const Submit = () => {
  //   const res = 
    
  //   setSucess("registration")

    
  // }



  return (

    <div>

      {/* <form onClick={onSubmitHandler} className='min-h-[80vh] flex items-center' action=""> */}
      <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center' >
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
          <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
          <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>

          {
            state === "Sign Up" && <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=> setName(e.target.value)} value={name} />
          </div>
          }      
    
          <div className='w-full'>
            <p>Email</p>
            {/* <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" name="" id="" onChange={(e)=> setEmail(e.target.value)} value={email}/> */}
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=> setEmail(e.target.value)} value={email}/>
          </div>

          <div className='w-full'>
            <p>Password</p>
            {/* <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" name="" id="" onChange={(e)=> setPassword(e.target.value)} value={password}/> */}
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=> setPassword(e.target.value)} value={password}/>
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}
          {sucess && <p className='text-green-500 text-sm'>{sucess}</p>}
          
          {/* <button { state == "Sign Up" ? onClick={Submit} : onclick(onSubmit)} className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ,  ? "Create Account" : "Login"}</button> */}
          <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up'  ? "Create Account" : "Login"}</button>
          {
            state === "Sign Up"
            ? <p>Already have an account? <span onClick={()=> setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
            : <p>Create an new account? <span onClick={()=> setState('Sign Up')} className='text-primary underline cursor-pointer'>click here</span></p>
          }
        </div>
      </form>

    </div>
  )
}


// function Login() {

//   const [state, setState] = useState('Sign Up');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     try {
//       if (state === 'Sign Up') {
//         // Sign-up logic
//         await firebase.auth().createUserWithEmailAndPassword(email, password);
//         setSuccess('Registration successful!');
//         setError('');
//         await signOut(auth);
//       } else {
//         // Login logic
//         await firebase.auth().signInWithEmailAndPassword(email, password);
//         setSuccess('Login successful!');
//         setError('');
//       }
//     } catch (err) {
//       setError(err.message);
//       setSuccess('');
//     }
//   };

//   return (
//     <div>
//       <form
//         className="min-h-[80vh] flex items-center"
//         onSubmit={onSubmitHandler}
//       >
//         <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
//           <p className="text-2xl font-semibold">
//             {state === 'Sign Up' ? 'Create Account' : 'Login'}
//           </p>
//           <p>
//             Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an
//             appointment
//           </p>

//           {state === 'Sign Up' && (
//             <div className="w-full">
//               <p>Full Name</p>
//               <input
//                 className="border border-zinc-300 rounded w-full p-2 mt-1"
//                 type="text"
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//               />
//             </div>
//           )}

//           <div className="w-full">
//             <p>Email</p>
//             <input
//               className="border border-zinc-300 rounded w-full p-2 mt-1"
//               type="email"
//               onChange={(e) => setEmail(e.target.value)}
//               value={email}
//             />
//           </div>

//           <div className="w-full">
//             <p>Password</p>
//             <input
//               className="border border-zinc-300 rounded w-full p-2 mt-1"
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           {success && <p className="text-green-500 text-sm">{success}</p>}

//           <button
//             type="submit"
//             className="bg-primary text-white w-full py-2 rounded-md text-base"
//           >
//             {state === 'Sign Up' ? 'Create Account' : 'Login'}
//           </button>

//           {state === 'Sign Up' ? (
//             <p>
//               Already have an account?{' '}
//               <span
//                 onClick={() => setState('Login')}
//                 className="text-primary underline cursor-pointer"
//               >
//                 Login here
//               </span>
//             </p>
//           ) : (
//             <p>
//               Create a new account?{' '}
//               <span
//                 onClick={() => setState('Sign Up')}
//                 className="text-primary underline cursor-pointer"
//               >
//                 Click here
//               </span>
//             </p>
//           )}
//         </div>
//       </form>
//     </div>
//   );

// }

export default Login