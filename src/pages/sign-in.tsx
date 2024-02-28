import React, { useState } from "react";

import validator from "validator";

import welcomeBack from '../../public/welcome-back.png';
import Image from "next/image";

import styles from '@/styles/SignIn.module.css';
import Link from "next/link";

import { Github, Google, Linkedin } from '../theme/icons/index';

const SignIn: React.FC = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // MockData
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    login: "invalid login",
    password: "invalid password"
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { login, password } = document.forms[0];

    const userData = login.find((user: any) => user.username === login.value)

    if(userData) {
      if (userData.password !== password.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.password });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "login", message: errors.login });
    }
  };

  const renderErrorMessage = (name: any) =>
  name === errorMessages.name && (
    <div className="error">{errorMessages.message}</div>
  );

 return (
  <div style={{ height: '100vh', display: 'flex' }}>
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src={welcomeBack} alt="Welcome back image" sizes="100%" fill objectFit="contain" />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.text}>
            Welcome back!
        </div>
        <div className={styles.icons}>
            <Github className={styles.icon} />
            <Linkedin className={styles.icon} />
            <Google className={styles.icon} />
        </div>
        <div className={styles.containerForm}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="input-container">
              <label className={styles.label}>Email</label>
              <input type="text" name="login" required className={styles.input} />
              {renderErrorMessage("login")}
            </div>
            <div className="input-container">
              <label className={styles.label}>Password</label>
              <input type="password" name="password" required className={styles.input} />
              {renderErrorMessage("pass")}
            </div>
            <div className={styles.additionalContainer}>
              <div className={styles.checkmark}>
                <input type="checkbox" />
                <label>remember me</label>
              </div>
                <Link href='/'>Forgot Password?</Link>
            </div>
            <div className={styles.buttonContainer}>
              <input value="Log in" type="button" className={styles.buttonGreen} />
              <input value="Sign up" type="button" className={styles.buttonWhite} />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)};

export default SignIn;
