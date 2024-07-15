import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { mockBarData as data } from "../data/mockData";
import { useState, useEffect } from "react";

function IpsTwo({ isDashboard = true, barData} ){
  const [apiData, setApiData] = useState([])

function sumAbuseByCountry(arr) {
  const result = {};

  arr.forEach(obj => {
    const country = obj.country;
    const abuse = obj.abuse;

    if (result[country] === undefined) {
      result[country] = abuse;
    } else {
      result[country] += abuse;
    }
  });

  return Object.keys(result).map(country => ({
    country: country,
    abuse: result[country]
  }));
} 

  useEffect(() => {
    fetch('http://127.0.0.1:5000/data', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(barData)
    }).then(res => res.json()).
      then(res => { 
        if(res.constructor === Array){
          setApiData(sumAbuseByCountry(res))
        }
      })
  }, [barData])


  return (
    <ResponsiveBar
      data={apiData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: '#FFA500',
            },
          },
          legend: {
            text: {
              fill: '#FFA500',
            },
          },
          ticks: {
            line: {
              stroke: '#FFA500',
              strokeWidth: 1,
            },
            text: {
              fill: '#FFA500',
            },
          },
        },
        legends: {
          text: {
            fill: '#FFA500',
          },
        },
      }}
      keys={['abuse']}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend:  "country", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "abuse", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
}

export default IpsTwo;
