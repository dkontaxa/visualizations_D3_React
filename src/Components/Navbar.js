import React from "react";
// import React, { useState, useEffect } from "react";

// import { Link } from "react-router-dom";
import OutlinedCard from "./Card";
import { NavLink } from "react-router-dom";

const Navbar = ({ dataCISATotal, dataNVDTotal }) => {
  //   const [dataNVDTotal, setDataNVDTotal] = useState([]);

  //   useEffect(() => {
  //     fetch("/.netlify/functions/apiNVD")
  //       .then((response) => response.json())
  //       .then((jsonResponse) => {
  //         setDataNVDTotal(jsonResponse);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, []);

  return (
    <>
      <NavLink to="/">
        <OutlinedCard
          title="CISA "
          description="Number of vulnerabilities:"
          subtitle={dataCISATotal ? ` ${dataCISATotal}` : "loading..."}
          subtitle2="vulnerabilities"
          buttonText="Learn More"
        />
      </NavLink>
      <NavLink to="NVD">
        <OutlinedCard
          title="NVD "
          description="Number of vulnerabilities:"
          subtitle={
            dataNVDTotal.totalResults
              ? ` ${dataNVDTotal.totalResults}`
              : "loading..."
          }
          subtitle2="vulnerabilities"
          buttonText="Learn More"
        />
      </NavLink>
    </>
  );
};

export default Navbar;
