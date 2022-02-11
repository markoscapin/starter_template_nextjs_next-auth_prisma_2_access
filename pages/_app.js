import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Router } from "next/router";
import HandleRedirect from "./auth/handleRedirect";
import "../styles/globals.css";

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
  } else if (isUser && session.user.role !== "ADMIN") {
    return <HandleRedirect path="/admin/login" />;
  }

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
  } else if (isUser && session.user.role !== "STORE") {
    return <HandleRedirect path="/auth/login" />;
  }

  return <div>Loading...</div>;
}
