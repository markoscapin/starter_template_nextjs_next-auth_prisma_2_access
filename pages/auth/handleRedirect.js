import { Router } from "next/router";
import { useEffect } from "react";

export default function HandleRedirect({ path }) {
  useEffect(() => {
    window.location = path;
  });
  return (
    <>
      <div>Redirecting...</div>
    </>
  );
}
