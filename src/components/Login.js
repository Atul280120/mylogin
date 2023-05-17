import { useState } from 'react';
import { loginFields } from "../constants/formField";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { auth,  } from "../firebase";
import {  GoogleAuthProvider } from 'firebase/auth';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

const LoginForm = () => {
  const [loginState, setLoginState] = useState(fieldsState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginState);
    signInWithEmailAndPassword(auth, loginState['email-address'], loginState.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login successful", user);
        // Add additional logic or redirect to a new page
        navigate("/dashboard"); // Example: Redirect to the dashboard page
      })
      .catch((error) => {
        // Login failed
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Login failed", errorCode, errorMessage);
        // Handle error or display error message to the user
      });
  };

const Signinwithgoogle = async (e) => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
  } catch (err) {
    console.error(err);
  }
};

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
       <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
      onClick={Signinwithgoogle}>Signinwithgoogle</button>
    </form>
  );
};

export default LoginForm;
