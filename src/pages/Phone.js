import React from "react";
import Phone from "../components/Phone"
import Header from "../components/Header";

export default function PhoneForm() {
  return (
    <>
        <Header
                heading="Sgin in with Phone"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
      <Phone />
    </>
  );
}
