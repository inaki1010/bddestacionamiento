import {
  Navbar as NavbarUi,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";

export default function Navbar() {
  return (
    <NavbarUi style={{ backgroundColor: "#ffdd00" }}>
      <NavbarBrand className="flex justify-center">
        <p
          className=" text-lg font-bold text-inherit"
          style={{ color: "#1a1a1a" }}
        >
          CETYS Estacionamiento
        </p>
      </NavbarBrand>
    </NavbarUi>
  );
}
