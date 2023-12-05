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
  const [userData, setUserData] = useState(null);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [buildingName, setBuildingName] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [showReservationText, setShowReservationText] = useState(false);

  const divStyle = {
    height: `calc(100vh - ${navbarHeight}px)`,
  };

  useEffect(() => {}, [parkingSpots]);

  const handleContinue = async () => {
    try {
      const fetchBuildingData = async () => {
        try {
          const response = await fetch(
            `https://projecto-bases-api.salmonsky-d4aeca5c.eastus2.azurecontainerapps.io/api/Buildings/${parkingSpots?.buildingID}`
          );
          console.log("win");
          if (response.ok) {
            console.log("fail");
            const buildingData = await response.json();
            setBuildingName(buildingData.name);
          } else {
            console.error("Error fetching building data:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      const reportResponse = await fetch(
        `https://projecto-bases-api.salmonsky-d4aeca5c.eastus2.azurecontainerapps.io/api/ParkingSpots/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (reportResponse.ok) {
        const jsonResponse = await reportResponse.json();
        setParkingSpots(jsonResponse);
      }
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
          <br />

          <br />
          <Button radius="full" onClick={handleContinue}>
            Generar reporte
          </Button>
        </div>
      ) : showReservationText ? (
        <>
          <div className="flex flex-wrap justify-center">
            {parkingSpots.map((user) => (
              <div key={user.userID} className="m-4 cursor-pointer">
                <Card className="h-auto w-52">
                  <CardBody>
                    <p>ID: {user.parkingSpotID}</p>
                    <p>Localizacion: {user.location}</p>
                    <p>Ocupado: {user.isOccupied ? "Si" : "No"}</p>
                    <p>Tipo: {user.type}</p>
                    <p>Edificio: {user.buildingID}</p>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={divStyle} className="flex flex-col items-center">
          <br></br>
          <p className="text-white font-medium text-large">
            Cajones en {buildingName}
          </p>
          {parkingSpots.length > 0 ? (
            <div className="flex flex-wrap justify-center">
              {parkingSpots.map((spot) => (
                <div key={spot.type} className="m-4 ">
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
              <p className="text-white text-large">
                No parking spots available for this building.
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default BajaAlumno;
