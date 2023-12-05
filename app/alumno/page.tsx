"use client";
import React, { useState } from "react";
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
} from "@nextui-org/react";

const Alumno = () => {
  const navbarHeight = 64;

  const [matricula, setMatricula] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [userData, setUserData] = useState(null);

  const divStyle = {
    height: `calc(100vh - ${navbarHeight}px)`,
  };

  const handleContinue = async () => {
    // Make API request with the provided matricula
    try {
      const response = await fetch(
        `https://projecto-bases-api.salmonsky-d4aeca5c.eastus2.azurecontainerapps.io/api/Users/${matricula}`
      );
      const data = await response.json();
      setUserData(data);
      setShowForm(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <>
      {showForm ? (
        <div
          style={divStyle}
          className="flex flex-col justify-center items-center"
        >
          <p className="text-white font-medium text-large">
            Introduce tu matrícula:
          </p>
          <br></br>
          <div>
            <Input
              type="text"
              label="Matrícula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
          </div>
          <br></br>
          <Button radius="full" onClick={handleContinue}>
            Continuar
          </Button>
        </div>
      ) : (
        // Display user data after API call
        <div style={divStyle} className="flex flex-col items-center">
          {userData ? (
            <>
              <p className="text-white font-medium text-large">
                User Information:
              </p>
              <Card>
                <CardBody>
                  <p>{userData}</p>
                  {/* Add other user data fields as needed */}
                </CardBody>
              </Card>
            </>
          ) : (
            <p className="text-white">Loading user data...</p>
          )}
        </div>
      )}
    </>
  );
};

export default Alumno;
