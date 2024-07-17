import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../data/mockGeoFeatures";
import { tokens } from "../theme";
import { mockGeographyData as data } from "../data/mockData";
import { useState, useEffect } from "react"

function GeographyChart({ isDashboard = false, geoData }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [apiData, setApiData] = useState([]);

  function cleanUpAndMakeGeoData(workData) {
    const countryCodes = {
      "AF": "AFG",
      "AX": "ALA",
      "AL": "ALB",
      "DZ": "DZA",
      "AS": "ASM",
      "AD": "AND",
      "AO": "AGO",
      "AI": "AIA",
      "AQ": "ATA",
      "AG": "ATG",
      "AR": "ARG",
      "AM": "ARM",
      "AW": "ABW",
      "AU": "AUS",
      "AT": "AUT",
      "AZ": "AZE",
      "BS": "BHS",
      "BH": "BHR",
      "BD": "BGD",
      "BB": "BRB",
      "BY": "BLR",
      "BE": "BEL",
      "BZ": "BLZ",
      "BJ": "BEN",
      "BM": "BMU",
      "BT": "BTN",
      "BO": "BOL",
      "BQ": "BES",
      "BA": "BIH",
      "BW": "BWA",
      "BV": "BVT",
      "BR": "BRA",
      "IO": "IOT",
      "BN": "BRN",
      "BG": "BGR",
      "BF": "BFA",
      "BI": "BDI",
      "CV": "CPV",
      "KH": "KHM",
      "CM": "CMR",
      "CA": "CAN",
      "KY": "CYM",
      "CF": "CAF",
      "TD": "TCD",
      "CL": "CHL",
      "CN": "CHN",
      "CX": "CXR",
      "CC": "CCK",
      "CO": "COL",
      "KM": "COM",
      "CG": "COG",
      "CD": "COD",
      "CK": "COK",
      "CR": "CRI",
      "HR": "HRV",
      "CU": "CUB",
      "CW": "CUW",
      "CY": "CYP",
      "CZ": "CZE",
      "DK": "DNK",
      "DJ": "DJI",
      "DM": "DMA",
      "DO": "DOM",
      "EC": "ECU",
      "EG": "EGY",
      "SV": "SLV",
      "GQ": "GNQ",
      "ER": "ERI",
      "EE": "EST",
      "ET": "ETH",
      "FK": "FLK",
      "FO": "FRO",
      "FJ": "FJI",
      "FI": "FIN",
      "FR": "FRA",
      "GF": "GUF",
      "PF": "PYF",
      "TF": "ATF",
      "GA": "GAB",
      "GM": "GMB",
      "GE": "GEO",
      "DE": "DEU",
      "GH": "GHA",
      "GI": "GIB",
      "GR": "GRC",
      "GL": "GRL",
      "GD": "GRD",
      "GP": "GLP",
      "GU": "GUM",
      "GT": "GTM",
      "GG": "GGY",
      "GN": "GIN",
      "GW": "GNB",
      "GY": "GUY",
      "HT": "HTI",
      "HM": "HMD",
      "VA": "VAT",
      "HN": "HND",
      "HK": "HKG",
      "HU": "HUN",
      "IS": "ISL",
      "IN": "IND",
      "ID": "IDN",
      "IR": "IRN",
      "IQ": "IRQ",
      "IE": "IRL",
      "IM": "IMN",
      "IL": "ISR",
      "IT": "ITA",
      "JM": "JAM",
      "JP": "JPN",
      "JE": "JEY",
      "JO": "JOR",
      "KZ": "KAZ",
      "KE": "KEN",
      "KI": "KIR",
      "KP": "PRK",
      "KR": "KOR",
      "KW": "KWT",
      "KG": "KGZ",
      "LA": "LAO",
      "LV": "LVA",
      "LB": "LBN",
      "LS": "LSO",
      "LR": "LBR",
      "LY": "LBY",
      "LI": "LIE",
      "LT": "LTU",
      "LU": "LUX",
      "MO": "MAC",
      "MG": "MDG",
      "MW": "MWI",
      "MY": "MYS",
      "MV": "MDV",
      "ML": "MLI",
      "MT": "MLT",
      "MH": "MHL",
      "MQ": "MTQ",
      "MR": "MRT",
      "MU": "MUS",
      "YT": "MYT",
      "MX": "MEX",
      "FM": "FSM",
      "MD": "MDA",
      "MC": "MCO",
      "MN": "MNG",
      "ME": "MNE",
      "MS": "MSR",
      "MA": "MAR",
      "MZ": "MOZ",
      "MM": "MMR",
      "NA": "NAM",
      "NR": "NRU",
      "NP": "NPL",
      "NL": "NLD",
      "NC": "NCL",
      "NZ": "NZL",
      "NI": "NIC",
      "NE": "NER",
      "NG": "NGA",
      "NU": "NIU",
      "NF": "NFK",
      "MK": "MKD",
      "MP": "MNP",
      "NO": "NOR",
      "OM": "OMN",
      "PK": "PAK",
      "PW": "PLW",
      "PS": "PSE",
      "PA": "PAN",
      "PG": "PNG",
      "PY": "PRY",
      "PE": "PER",
      "PH": "PHL",
      "PN": "PCN",
      "PL": "POL",
      "PT": "PRT",
      "PR": "PRI",
      "QA": "QAT",
      "RE": "REU",
      "RO": "ROU",
      "RU": "RUS",
      "RW": "RWA",
      "BL": "BLM",
      "SH": "SHN",
      "KN": "KNA",
      "LC": "LCA",
      "MF": "MAF",
      "PM": "SPM",
      "VC": "VCT",
      "WS": "WSM",
      "SM": "SMR",
      "ST": "STP",
      "SA": "SAU",
      "SN": "SEN",
      "RS": "SRB",
      "SC": "SYC",
      "SL": "SLE",
      "SG": "SGP",
      "SX": "SXM",
      "SK": "SVK",
      "SI": "SVN",
      "SB": "SLB",
      "SO": "SOM",
      "ZA": "ZAF",
      "GS": "SGS",
      "SS": "SSD",
      "ES": "ESP",
      "LK": "LKA",
      "SD": "SDN",
      "SR": "SUR",
      "SJ": "SJM",
      "SZ": "SWZ",
      "SE": "SWE",
      "CH": "CHE",
      "SY": "SYR",
      "TW": "TWN",
      "TJ": "TJK",
      "TZ": "TZA",
      "TH": "THA",
      "TL": "TLS",
      "TG": "TGO",
      "TK": "TKL",
      "TO": "TON",
      "TT": "TTO",
      "TN": "TUN",
      "TR": "TUR",
      "TM": "TKM",
      "TC": "TCA",
      "TV": "TUV",
      "UG": "UGA",
      "UA": "UKR",
      "AE": "ARE",
      "GB": "GBR",
      "UM": "UMI",
      "US": "USA",
      "UY": "URY",
      "UZ": "UZB",
      "VU": "VUT",
      "VE": "VEN",
      "VN": "VNM",
      "VG": "VGB",
      "VI": "VIR",
      "WF": "WLF",
      "EH": "ESH",
      "YE": "YEM",
      "ZM": "ZMB",
      "ZW": "ZWE"
    }

    let returnGeoData = []

    workData.forEach((item) => {
      if(item){
        console.log(item)
        returnGeoData.push({ "id": countryCodes[item['country']], "value": item['abuse'] })
      }
    });


    console.log("raw data is " + JSON.stringify(workData))
    console.log("returnGeoData is " + JSON.stringify(returnGeoData))
    return returnGeoData
  }



  useEffect(() => {
    fetch('http://127.0.0.1:5000/data', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geoData)
    }).then(res => res.json())
      .then(res => {
        console.log("The response is " + cleanUpAndMakeGeoData(res))
        setApiData(cleanUpAndMakeGeoData(res))
      })
  }, [geoData])


  return (
    <ResponsiveChoropleth
      data={apiData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      features={geoFeatures.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={[0, 50]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={isDashboard ? 150 : 150}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderWidth={1.5}
      borderColor="#ffffff"
      defs={[{
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: '#38bcb2',
        size: 4,
        padding: 1,
        stagger: true
      }]}
      legends={
        !isDashboard
          ? [
            {
              anchor: "bottom-left",
              direction: "column",
              justify: true,
              translateX: 20,
              translateY: -100,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: "left-to-right",
              itemTextColor: colors.grey[100],
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#ffffff",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]
          : undefined
      }
    />
  );
}

export default GeographyChart;

