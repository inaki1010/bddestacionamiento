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
  RadioGroup,
  Radio,
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
const Alumno = () => {
  const navbarHeight = 64;

  const [matricula, setMatricula] = useState("");
  const [userData, setUserData] = useState(null);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [buildingName, setBuildingName] = useState("");
  const [buildingID2, setBuildingID2] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [showReservationText, setShowReservationText] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Ingenieria");

  const divStyle = {
    height: `calc(100vh - ${navbarHeight}px)`,
  };
  const handleRadioChange = (value) => {
    setSelectedOption(value);
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
          setBuildingID2(buildingData.buildingID);
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
      const response1 = await fetch(
        `https://projecto-bases-api.salmonsky-d4aeca5c.eastus2.azurecontainerapps.io/api/Users/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "inv",
            role: "Invitado",
            buildingID: buildingID2,
            email: "string",
            phone: "string",
          }),
        }
      );
      const response = await fetch(
        `https://projecto-bases-api.salmonsky-d4aeca5c.eastus2.azurecontainerapps.io/api/Users?role=Invitado`
      );

      if (!response.ok) {
        console.error("Error fetching user data:", response.statusText);
        return;
      }

      const userData = await response.json();
      if (userData.length > 0) {
        const firstUser = userData[0];
        setUserData(firstUser);
      } else {
        console.error("No users found in the response");
      }

      const buildingID = selectedOption;

      const parkingSpotsResponse = await fetch(
        `https://projecto-bases-api.salmonsky-d4aeca5c.eastus2.azurecontainerapps.io/api/ParkingSpots?buildingID=${buildingID}`
      );

      if (!parkingSpotsResponse.ok) {
        console.error(
          "Error fetching parking spots:",
          parkingSpotsResponse.statusText
        );
        return;
      }

      const parkingSpotsData = await parkingSpotsResponse.json();
      setParkingSpots(parkingSpotsData);
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCardClick = async (spot: ParkingSpot) => {
    try {
      // Check if the spot is not occupied before updating
      if (!spot.isOccupied) {
        // Update the isOccupied property
        const updateResponse = await fetch(
          `https://projecto-bases-api.salmonsky-d4aeca5c.eastus2.azurecontainerapps.io/api/ParkingSpots/${spot.parkingSpotID}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              parkingSpotID: spot.parkingSpotID,
              location: spot.location,
              isOccupied: true,
              type: spot.type,
              buildingID: spot.buildingID,
              building: spot.building,
              parkingSpotAssignments: spot.parkingSpotAssignments,
            }),
          }
        );
        const updateResponse2 = await fetch(
          `https://projecto-bases-api.salmonsky-d4aeca5c.eastus2.azurecontainerapps.io/api/Vehicles`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "string",
              model: "string",
              color: "string",
              licensePlate: "string",
              userID: userData.userID,
            }),
          }
        );
        const updateResponse3 = await fetch(
          `https://projecto-bases-api.salmonsky-d4aeca5c.eastus2.azurecontainerapps.io/api/Vehicles?userID=${userData.userID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const vehiclesData = await updateResponse3.json();
        const vehicleIDs = vehiclesData.map((vehicle) => vehicle.vehicleID);
        console.log("test");
        console.log(vehicleIDs);
        const updateResponse4 = await fetch(
          `https://projecto-bases-api.salmonsky-d4aeca5c.eastus2.azurecontainerapps.io/api/ParkingRecords`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              parkingSpotID: spot.parkingSpotID,
              userID: userData.userID,
              vehicleID: vehicleIDs[vehicleIDs.length - 1],
              entryTime: "2023-12-05T18:46:29.598Z",
            }),
          }
        );

        if (
          updateResponse.ok &&
          updateResponse2.ok &&
          updateResponse3.ok &&
          updateResponse4.ok
        ) {
          // Update the local state to reflect the change
          const updatedSpots = parkingSpots.map((s) =>
            s.parkingSpotID === spot.parkingSpotID
              ? { ...s, isOccupied: true }
              : s
          );
          setParkingSpots(updatedSpots);
          setShowReservationText(true);
        } else {
          console.error(
            "Error updating parking spot:",
            updateResponse.statusText
          );
        }
      } else {
        window.alert("Este lugar esta ocupado.");
      }
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
            ¿A qué lugar te diriges?
          </p>
          <br></br>
          <div>
            <RadioGroup
              value={selectedOption}
              onChange={handleRadioChange}
              className="size-lg"
            >
              <Radio value="Ingenieria">Ingeniería</Radio>
              <Radio value="Idiomas">Idiomas</Radio>
              <Radio value="CASE">CASE</Radio>
              <Radio value="Sorteos">Sorteos</Radio>
              <Radio value="Preparatoria">Preparatoria</Radio>
            </RadioGroup>
          </div>
          <br></br>
          <Button radius="full" onClick={handleContinue}>
            Continuar
          </Button>
        </div>
      ) : showReservationText ? (
        <>
          <br></br>
          <div style={divStyle} className="flex flex-col items-center">
            <p className="text-white font-medium text-large">
              Lugar reservado.
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
            Cajones en {selectedOption}
          </p>
          {parkingSpots.length > 0 ? (
            <div className="flex flex-wrap justify-center">
              {parkingSpots.map((spot) => (
                <div
                  key={spot.type}
                  className="m-4 cursor-pointer"
                  onClick={() => handleCardClick(spot)}
                >
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

export default Alumno;
