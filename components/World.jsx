import { ComposableMap, Geographies, Geography } from "react-simple-maps";


function World() {
  return (
    <div>
      <ComposableMap>
        <Geographies geography="../public/map.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export default World;
