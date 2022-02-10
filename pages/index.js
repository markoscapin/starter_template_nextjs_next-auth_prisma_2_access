import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signOut } from "next-auth/react";
import { Router } from "next/router";

export default function Home() {
  return (
    <>
      <button onClick={() => signOut()}>LogOut</button>
    </>
  );
}

Home.auth = {
  role: "STORE",
};
