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
        <p className="text-white font-medium text-large">
          ¿A que lugar te diriges?
        </p>
        <br></br>
        <div>
          <RadioGroup defaultValue="alumno" className="size-lg">
            <Radio value="alumno">Ingeniería</Radio>
            <Radio value="administrativo">Idiomas</Radio>
            <Radio value="docente">CASE</Radio>
            <Radio value="invitado">Preparatoria</Radio>
          </RadioGroup>
        </div>
        <br></br>
        <Link href="/alumno">
          <Button radius="full">Continuar</Button>
        </Link>
      </div>
    </>
  );
};
export default invitado;
