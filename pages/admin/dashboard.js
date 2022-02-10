import React from "react";

// components

import CardPageVisits from "../../components/Cards/CardPageVisits.js";
import CardSocialTraffic from "../../components/Cards/CardSocialTraffic.js";

// layout for page

import Admin from "../../layouts/Admin.js";

export default function Dashboard() {
  return (
    <>
      <Admin>
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardPageVisits />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardSocialTraffic />
          </div>
        </div>
      </Admin>
    </>
  );
}

Dashboard.auth = {
  role: "ADMIN",
  unauthorized: "/admin/login",
};

// AdminDashboard.auth = {
//   role: "ADMIN",
//   unauthorized: "/api/auth/signin", // redirect to this url
// };
