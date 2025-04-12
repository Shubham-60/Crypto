import React, { useEffect, useState } from 'react'
import Chart from "react-google-charts"
function LineChart(props) {

    const [data,setdata] = useState([["Date", "Prices"]])
    const options = {
        series: {
            0: { color: '#ff76c5' } 
        },
        hAxis: {
            textStyle: { color: 'white' } // Horizontal axis text color set to white
        },
        vAxis: {
            textStyle: { color: 'white' } // Vertical axis text color set to white
        },
        legend: {
            textStyle: { color: 'white' } // Legend text color set to white
        },
        backgroundColor: "transparent"
    }
    useEffect(() => {
        let datacopy = [["Date", "Prices"]]
        if (props.prices){
            props.prices.map((item) => {
                datacopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
            })
            setdata(datacopy)
        }
    },[props.prices])

    return (
        <Chart
            chartType="LineChart"
            data = {(data)}
            height = "100%"
            options={options}
        />
    )
}

export default LineChart