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
  const [selectedId, setSelectedId] = React.useState("/alumno");

  const handleRadioChange = (id) => {
    setSelectedId(id);
    console.log(id);
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
          onValueChange={handleRadioChange}
        >
          <Radio value="/alumno" id="/alumno">
            Alumno
          </Radio>
          <Radio value="/admin" id="/alumno">
            Administrativo
          </Radio>
          <Radio value="/doc" id="/alumno">
            Docente
          </Radio>
          <Radio value="/invitado" id="/invitado">
            Invitado
          </Radio>
        </RadioGroup>
        <br></br>
        <Link href={selectedId}>
          <Button radius="full">Continuar</Button>
        </Link>
        <br></br>
        <Link href="/consultas">
          <Button variant="light" radius="full">
            Consultas
          </Button>
        </Link>
      </div>
    </>
  );
}
