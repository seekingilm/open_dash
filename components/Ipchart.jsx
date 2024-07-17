import { ResponsivePie } from '@nivo/pie'
import { useState, useEffect } from "react";

function Ipchart({ pieData }) {
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
    fetch('http://127.0.0.1:5000/pie', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pieData)
    }).then(res => res.json()).
      then(res => {
        if (res.constructor === Array) {
          console.log(res)
          setApiData(res)
        }
      })
  }, [pieData])


  return (
    <ResponsivePie
      data={apiData}
      margin={{ top: 30, right: 40, bottom: 30, left: 40}}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      indexBy="Usage Type"
      borderWidth={1}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLabelsSkipAngle={10}
      isInteractive={false}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            2
          ]
        ]
      }}
    />
  )
}

export default Ipchart
