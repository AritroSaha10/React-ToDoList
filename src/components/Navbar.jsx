import React from "react";
import { Navbar as BSNavbar } from "react-bootstrap";

function Navbar() {
  return (
    <BSNavbar bg="light" variant="light">
      <BSNavbar.Brand href="#home">
        To-Do List
      </BSNavbar.Brand>
    </BSNavbar>
  );
}

export default Navbar;
