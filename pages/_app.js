import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import "../styles/globals.css";
import { signIn } from "next-auth/react";
import { Router } from "next/router";
import Login from "./auth/login";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  let AuthorizedComponent;
  if (Component.auth) {
    if (Component.auth.role === "ADMIN") {
      AuthorizedComponent = AdminAuth;
    } else if (Component.auth.role === "STORE") {
      AuthorizedComponent = StoreAuth;
    }
  }

  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <AuthorizedComponent>
          <Component {...pageProps} />
        </AuthorizedComponent>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

function AdminAuth({ children }) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location = "/admin/login";
    },
  });
  const isUser = !!session?.user;
  if (isUser && session.user.role === "ADMIN") {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  // return (
  //   <Login login={"Admin Portal"} path={"/api/auth/callback/admin_login"} />
  // );
  return <div>Loading...</div>;
}

function StoreAuth({ children }) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      window.location = "/auth/login";
    },
  });
  const isUser = !!session?.user;
  if (isUser && session.user.role === "STORE") {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  // return (
  //   <Login login={"Store Portal"} path={"/api/auth/callback/store_login"} />
  // );
  return <div>Loading...</div>;
}

// function Redirect({ path }) {
//   return (
//     <>
//       <div>Redirecting...</div>
//       {/* <button onClick={signIn("admin", { redirect: path })}></button> */}
//       {() => Router.push(path)}
//     </>
//   );
// }
