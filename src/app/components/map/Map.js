"use client";
import React, { useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import { useVehicleContext } from "@/app/context/vehicleContext";
import { useCalCulateDistance } from "@/app/helper/help";

const containerStyle = {
  width: "100%",
  height: "100%",
};
const Map = ({ location }) => {
  const {
    // vehicleLocation,
    userLatLongs,
    vehiclePath,
    selectedVehiclePath,
    distance,
  } = useCalCulateDistance();
  console.log("userLatLongs", userLatLongs);
  console.log("location", location);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDGheosqin8IXJ_rMczxWeWe20o99nx1KQ", // ,
    // ...otherOptions
  });
  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }
  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={12}
        >
          {location && <Marker position={location}/>}
          {userLatLongs && (
            <Marker position={userLatLongs} />
          )}
          {selectedVehiclePath.length > 0 && (
            <Polyline
              path={selectedVehiclePath}
              options={{
                strokeColor: "blue",
                strokeOpacity: 1,
                strokeWeight: 3,
              }}
            />
          )}
          {vehiclePath.length > 0 && (
            <Polyline
              path={vehiclePath}
              options={{
                strokeColor: "red",
                strokeOpacity: 1,
                strokeWeight: 3,
              }}
            />
          )}
          {/* <div>
        Distance to Vehicle: {distance.toFixed(2)} km
      </div> */}
        </GoogleMap>
      )}
    </>
  );
};

export default Map;
