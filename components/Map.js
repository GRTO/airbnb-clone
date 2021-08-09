import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = searchResults.map((item) => ({
    longitude: item.long,
    latitude: item.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    ...center,
    zoom: 11,
    width: "100%",
    height: "100%",
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/gersonrto/cks3xuixh16xw17p6ordrqqcc"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div>
          <Marker
            latitude={result.lat}
            longitude={result.long}
            offsetLeft={-10}
            offsetTop={-10}
          >
            <p
              role="img"
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() => {
                setSelectedLocation(result);
              }}
              aria-label="push-pin"
            >
              📍
            </p>
          </Marker>

          {selectedLocation.long === result.long ? (
            <Popup
              closeOnClick
              latitude={result.lat}
              longitude={result.long}
              onClose={() => setSelectedLocation({})}
            >
              {result.title}
            </Popup>
          ) : null}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
