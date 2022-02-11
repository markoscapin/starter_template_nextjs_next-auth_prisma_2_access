import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signOut, useSession } from "next-auth/react";
import { Router } from "next/router";
import HandleRedirect from "./auth/handleRedirect";

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
