"use client";
import Image from "next/image";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
export default function Home() {
  const navbarHeight = 64;

  const divStyle = {
    height: `calc(100vh - ${navbarHeight}px)`,
  };
  const [selected, setSelected] = React.useState("/alumno");
  return (
    <>
      <div
        style={divStyle}
        className="flex flex-col justify-center items-center"
      >
        <p className="text-white font-medium text-large">
          Seleccione su posición
        </p>
        <br></br>
        <RadioGroup
          defaultValue="/alumno"
          className="size-lg"
          value={selected}
          onValueChange={setSelected}
        >
          <Radio value="/alumno">Alumno</Radio>
          <Radio value="/administrativo">Administrativo</Radio>
          <Radio value="/docente">Docente</Radio>
          <Radio value="/invitado">Invitado</Radio>
        </RadioGroup>
        <br></br>
        <Link href={selected}>
          <Button radius="full">Continuar</Button>
        </Link>
      </div>
    </>
  );
}
