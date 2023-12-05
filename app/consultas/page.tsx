import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Card,
  CardBody,
  Image,
  Input,
  Button,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
const invitado = () => {
  const navbarHeight = 64;

  const divStyle = {
    height: `calc(100vh - ${navbarHeight}px)`,
  };
  return (
    <>
      <div
        style={divStyle}
        className="flex flex-col justify-center items-center"
      >
        <p className="text-white font-medium text-large">Usuarios</p>

        <br></br>
        <div className="flex gap-x-4">
          <Link href="/consultas/bajausuarios">
            <Button radius="full" size="lg">
              Baja
            </Button>
          </Link>
          <Link href="/consultas/cambiosusuarios">
            <Button radius="full" size="lg">
              Cambios
            </Button>
          </Link>
          <Link href="/consultas/reporteusuario">
            <Button radius="full" size="lg">
              Reporte
            </Button>
          </Link>
        </div>
        <br></br>
        <p className="text-white font-medium text-large">Cajones</p>

        <br></br>
        <div className="flex gap-x-4">
          <Link href="/consultas/bajacajones">
            <Button radius="full" size="lg">
              Baja
            </Button>
          </Link>
          <Link href="/consultas/cambioscajones">
            <Button radius="full" size="lg">
              Cambios
            </Button>
          </Link>
          <Link href="/consultas/reportecajones">
            <Button radius="full" size="lg">
              Reporte
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default invitado;
