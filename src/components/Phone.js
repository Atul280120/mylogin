import { useState } from 'react';
import { PhoneFields } from "../constants/formField";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { auth } from "../firebase";
import { signInWithPhoneNumber, getAuth, RecaptchaVerifier } from 'firebase/auth';

const fields = PhoneFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

const PhoneLoginForm = () => {
  const [loginState, setLoginState] = useState(fieldsState);
  const [showOtpBox, setShowOtpBox] = useState(false); 
  const [confirmObj, setConfirmObj] = useState(fieldsState);
  const [error, setError] = useState("");
  const [otp,setOtp]=useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleGetOtp = async (e) => {
    e.preventDefault();
    const phoneNumber =   loginState['country-code'] + loginState['phone-number'];
    if (phoneNumber === "" || phoneNumber === undefined) return "Enter valid no";
    try {
      const appVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible', 
      }, auth);
      setShowOtpBox(true);
      const response = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      console.log(response);
      setConfirmObj(response);
    } catch (err) {
      setError(err.message);
    }
    console.log(phoneNumber);
  };
  
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    console.log(otp);
    if (otp === "" || otp === null) return;
    try {
      setError("");
      await confirmObj.confirm(otp);
      console.log(otp)
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <form className="mt-8 space-y-6" onSubmit={showOtpBox ? handleOtpSubmit : handleGetOtp}>
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

      <div id="recaptcha-container"></div>
      {showOtpBox ? (
        <div className="-space-y-px">
          <Input
            handleChange={(e) => setOtp(e.target.value)}
            value={otp}
            labelText="OTP"
            labelFor="otp"
            id="otp"
            name="otp"
            type="text"
            isRequired={true}
            placeholder="Enter OTP"
          />
        </div>
      ) : null}
      <FormExtra />
      <FormAction handleSubmit={showOtpBox ? handleOtpSubmit : handleGetOtp} text={showOtpBox ? "Verify OTP" : "Get OTP"} />
    </form>
  );
};

export default PhoneLoginForm;
