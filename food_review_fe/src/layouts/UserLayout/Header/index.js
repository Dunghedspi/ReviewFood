import React from "react";
import AppBarSection from "./NavSection/AppBarSection";
function Header() {
  return (
    <AppBarSection
      color="white"
      fixed
      changeColorOnScroll={{
        height: 400,
        color: "white",
      }}
    />
  );
}

export default Header;
