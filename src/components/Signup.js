import { useState } from 'react';
import { signupFields } from "../constants/formField"
import FormAction from "./FormAction";
import Input from "./Input";
import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

const SignupForm = () => {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSignupState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform signup logic
    createUserWithEmailAndPassword(auth, signupState['email-address'], signupState.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Signup successful", user);
        // Add additional logic or redirect to a new page
      })
      .catch((error) => {
        // Signup failed
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Signup failed", errorCode, errorMessage);
        // Handle error or display error message to the user
      });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
      <Link to="/phone">
      <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
    >Login with Mobile </button>
    </Link>
    </form>
  );
};

export default SignupForm;
