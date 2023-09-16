export function HandleData(arrayData, name) {
    const newArrayData = arrayData.map((change) => {
        if (change.value === 'TRUE') {
            return (
                {
                    value: 1,
                    timestamp: change.timestamp.slice(0, 19)
                }
            )
        }
        else if (change.value === 'FALSE') {
            return (
                {
                    value: 0,
                    timestamp: change.timestamp.slice(0, 19)
                }
            )
        }
        else if (name === "Micro820_Analog_1"){
            return(
                {
                    value: ((change.value * 10)/4013).toFixed(2),
                    timestamp: change.timestamp.slice(0,19)
                }
            )
        }
        else {
            return (
                {
                    value: change.value,
                    timestamp: change.timestamp.slice(0, 19)
                }
            )
        }

    })

    return ({ data: newArrayData, Tagname: name })
}

export function changeDomain(name) {
    switch (name) {
        case "countRB3100":
            return ({ value: [0, 550], chart: "FALSE" });
        case "angleRB3100":
            return ({ value: [0, 550], chart: "FALSE" });
        case "distanceUGT524":
            return ({ value: [0, 550], chart: "FALSE" });
        case "VFD_Speed_SP":
            return ({ value: [0, 550], chart: "FALSE" });
        case "VFD_Speed_PV":
            return ({ value: [0, 550], chart: "FALSE" });
        case "tempTW2000":
            return ({ value: [0, 100], chart: "FALSE" });
        case "O5D150":
            return ({ value: [0, 30], chart: "FALSE" });
        case "Position_PV":
            return ({ value: [-100, 100], chart: "FALSE" });
        case "Speed_PV":
            return ({ value: [-100, 100], chart: "FALSE" });
        case "RVP510":
            return ({ value: [0, 1100], chart: "FALSE" });
        case "UGT524":
            return ({ value: [0, 1100], chart: "FALSE" });
        case "Inverter_Speed_PV":
            return ({ value: [0, 100], chart: "FALSE" });
        case "Micro820_Analog_1":
            return ({ value: [0, 10], chart: "FALSE" });
        default:
            return ({ value: [false, true], chart: "TRUE" });
    }
}

