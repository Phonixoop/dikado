"use client";

import React from "react";
import { motion } from "framer-motion";
export default function DikadoLogo({ className = "w-9" }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.0445 8.35522H10.9556C10.3445 8.35522 9.849 8.85068 9.849 9.46185V12.7448C9.849 13.356 10.3445 13.8515 10.9556 13.8515H24.8359C25.3452 13.8515 25.758 14.2644 25.758 14.7737V29.3627C25.758 29.872 25.3452 30.2849 24.8359 30.2849H19.4623C18.8511 30.2849 18.3557 30.7804 18.3557 31.3915V34.6745C18.3557 35.2857 18.8511 35.7812 19.4623 35.7812H26.0445C26.2867 35.7812 26.5192 35.6859 26.6917 35.5158L31.7251 30.5558C31.901 30.3825 32 30.1459 32 29.899V14.2374C32 13.9905 31.901 13.7539 31.7251 13.5806L26.6917 8.62056C26.5192 8.45053 26.2867 8.35522 26.0445 8.35522Z"
        fill="#E49933"
      />
      <motion.rect
        x="9.849"
        y="16.5627"
        width="4.07608"
        height="4.18674"
        rx="0.737752"
        fill="#ED217C"
        // animate={{
        //   x: [0, 1.5], // Moves to the right as it shrinks
        //   width: [4.07608, 2], // Shrinks in width
        // }}
        // transition={{
        //   duration: 2, // Animation duration
        //   repeat: Infinity,
        //   repeatType: "reverse",
        //   ease: "linear", // Easing function
        // }}
      />{" "}
      <motion.rect
        x="5.97583"
        y="22.7045"
        width="7.94928"
        height="4.18674"
        rx="0.737752"
        fill="#00AEEF"
        // animate={{
        //   x: [0, 4.5], // Moves to the right as it shrinks
        //   width: [7.94928, 2], // Shrinks in width
        // }}
        // transition={{
        //   duration: 2, // Animation duration
        //   repeat: Infinity,
        //   repeatType: "reverse",
        //   ease: "linear", // Easing function
        // }}
      />
      <motion.rect
        y="28.8463"
        width="13.9251"
        height="4.18674"
        rx="0.737752"
        fill="#39B54A"
        // animate={{
        //   x: [0, 10], // Moves to the right as it shrinks
        //   width: [13.9251, 2], // Shrinks in width
        // }}
        // transition={{
        //   duration: 2, // Animation duration
        //   repeat: Infinity,
        //   repeatType: "reverse",
        //   ease: "linear", // Easing function
        // }}
      />
      <path
        d="M14.2499 5.76065C13.6532 5.76065 13.0809 5.5236 12.659 5.10165C12.237 4.67971 12 4.10743 12 3.51071C12 2.91399 12.237 2.34171 12.659 1.91976C13.0809 1.49782 13.6532 1.26077 14.2499 1.26077C15.1181 1.24564 15.9689 1.66689 16.6913 2.46958C17.4138 3.27227 17.9743 4.41915 18.2998 5.76065C18.6254 4.41915 19.1859 3.27227 19.9083 2.46958C20.6307 1.66689 21.4815 1.24564 22.3497 1.26077C22.9464 1.26077 23.5187 1.49782 23.9407 1.91976C24.3626 2.34171 24.5997 2.91399 24.5997 3.51071C24.5997 4.10743 24.3626 4.67971 23.9407 5.10165C23.5187 5.5236 22.9464 5.76065 22.3497 5.76065"
        stroke="#E84137"
        strokeWidth="1.79995"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2916 5.47799C10.2916 5.07054 10.6219 4.74023 11.0294 4.74023H25.6184C26.0259 4.74023 26.3562 5.07054 26.3562 5.47799V6.65839C26.3562 7.06584 26.0259 7.39614 25.6184 7.39614H11.0294C10.6219 7.39614 10.2916 7.06584 10.2916 6.65839V5.47799Z"
        fill="#E84137"
      />
    </motion.svg>
  );
}
