import { ComposableMap, Geographies, Geography } from "react-simple-maps";


function World() {
  return (
    <div width={10} height={10}>
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
