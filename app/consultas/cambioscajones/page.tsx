"use client";
import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Card,
  CardBody,
  Input,
  Button,
} from "@nextui-org/react";
interface ParkingSpot {
  parkingSpotID: number;
  location: string;
  isOccupied: boolean;
  type: string;
  buildingID: number;
  building: null;
  parkingSpotAssignments: null;
  // Add other properties as needed
}
const BajaAlumno = () => {
  const navbarHeight = 64;

  const [matricula, setMatricula] = useState("");
  const [name1, setName] = useState("");
  const [type, setType] = useState("");
  const [occupied, setOccupied] = useState("");
  const [location, setLocation] = useState("");
  const [userData, setUserData] = useState(null);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [buildingName, setBuildingName] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [showReservationText, setShowReservationText] = useState(false);

  const divStyle = {
    height: `calc(100vh - ${navbarHeight}px)`,
  };

  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const response = await fetch(
          `https://projecto-bases-api.salmonsky-d4aeca5c.eastus2.azurecontainerapps.io/api/Buildings/${userData?.buildingID}`
        );

        if (response.ok) {
          const buildingData = await response.json();
          setBuildingName(buildingData.name);
        } else {
          console.error("Error fetching building data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (userData) {
      fetchBuildingData();
    }
  }, [userData]);

  const handleContinue = async () => {
    try {
      const response = await fetch(
        `https://projecto-bases-api.salmonsky-d4aeca5c.eastus2.azurecontainerapps.io/api/ParkingSpots/${matricula}`
      );

      if (!response.ok) {
        console.error("Error fetching user data:", response.statusText);
        return;
      }

      const userData = await response.json();
      setUserData(userData);
      const modifyResponse = await fetch(
        `https://projecto-bases-api.salmonsky-d4aeca5c.eastus2.azurecontainerapps.io/api/ParkingSpots/${matricula}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: location !== "" ? location : userData.location,
            isOccupied: userData.isOccupied,
            type: type !== "" ? type : userData.type,
            buildingID: userData.buildingID,
          }),
        }
      );
      setShowForm(false);
      setShowReservationText(true);
    } catch (error) {
      console.error("Error:", error);
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
            Introduce el ID del cajon:
          </p>
          <br />
          <div>
            <Input
              type="text"
              label="ID"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
          </div>
          <p className="text-white font-medium text-large">
            Introduce los datos a cambiar:
          </p>
          <br />
          <div>
            <Input
              size="sm"
              type="text"
              label="Localizacion"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <Input
              size="sm"
              type="text"
              label="Tipo"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <br />
          <Button radius="full" onClick={handleContinue}>
            Continuar
          </Button>
        </div>
      ) : showReservationText ? (
        <>
          <br></br>
          <div style={divStyle} className="flex flex-col items-center">
            <p className="text-white font-medium text-large">
              Usuario modificado.
            </p>
          </div>
        </>
      ) : (
        <div style={divStyle} className="flex flex-col items-center">
          <br></br>
          <p className="text-white font-medium text-large">
            Hola {userData.name}
          </p>
          <p className="text-white font-medium text-large">
            Cajones en {buildingName}
          </p>
          {parkingSpots.length > 0 ? (
            <div className="flex flex-wrap justify-center">
              {parkingSpots.map((spot) => (
                <div key={spot.type} className="m-4 cursor-pointer">
                  <Card className="h-auto w-52">
                    <CardBody>
                      <p>Numero de cajon: {spot.location}</p>
                      <p>Tipo de cajon: {spot.type}</p>
                      <p>Occupied: {spot.isOccupied ? "Yes" : "No"}</p>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <>
              <br></br>
              <p className="text-white text-large">Error.</p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default BajaAlumno;
