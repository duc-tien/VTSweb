import Status from "@src/components/Vali2/Status";
import Switch from "@src/components/Vali2/Switch";
import Input from "@src/components/Vali2/Input";
import Recharts from "./Recharts/Recharts";

import style from "./Monitor2.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTurnUp,
  faArrowRotateRight,
  faArrowRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import HeaderItem from "../../components/HeaderItem/HeaderItem";
import hubConnection from "../../services/signalR/hubConnection";
import { Link } from "react-router-dom";

const css = classNames.bind(style);

function Monitor() {
  const [data, setData] = useState({});
  const [speed, setSpeed] = useState();
  const [timeRed, setTimeRed] = useState();
  const [timeYellow, setTimeYellow] = useState();
  const [timeGreen, setTimeGreen] = useState();
  const [ledSttOn, setLedSttOn] = useState();
  const [ledSttOff, setLedSttOff] = useState();
  const [drt, setDrt] = useState(true);

  const inputRef = useRef();
  let enable = useRef(true);

  useEffect(() => {
    hubConnection.start();
    hubConnection.connection.on("TagChanged", (res) => {
      const obj = JSON.parse(res);
      obj.value === "TRUE" ? (obj.value = true) : null;
      obj.value === "FALSE" ? (obj.value = false) : null;
      if (obj.name === "Inverter_Speed_PV") {
        if (obj.value > 0.05) {
          setLedSttOn(true);
          setLedSttOff(false);
        } else {
          setLedSttOn(false);
          setLedSttOff(true);
        }
      }
      setData((prevData) => {
        const updateData = { ...prevData, [obj.name]: obj };
        return updateData;
      });
    });
    return () => {
      hubConnection.connection.off("TagChanged");
    };
  }, [hubConnection.connection]);
  const dataSpeed = (value) => {
    setSpeed(value);
  };
  const dataRedTime = (value) => {
    setTimeRed(value);
  };
  const dataYellowTime = (value) => {
    setTimeYellow(value);
  };
  const dataGreenTime = (value) => {
    setTimeGreen(value);
  };

  const sendTrafficTime = () => {
    let yt = [
      {
        id: "Channel1.Device1.Traffic_YellowTime",
        v: Number(timeYellow),
      },
    ];
    let gt = [
      {
        id: "Channel1.Device1.Traffic_GreenTime",
        v: Number(timeYellow),
      },
    ];
    let rt = [
      {
        id: "Channel1.Device1.Traffic_RedTime",
        v: Number(timeYellow),
      },
    ];
    let cf = [
      {
        id: "Channel1.Device1.Traffic_Confirm",
        v: 1,
      },
    ];
    let cf2 = [
      {
        id: "Channel1.Device1.Traffic_Confirm",
        v: 0,
      },
    ];

    hubConnection.connection.send("SEND", JSON.stringify(yt));
    hubConnection.connection.send("SEND", JSON.stringify(rt));
    hubConnection.connection.send("SEND", JSON.stringify(gt));
    hubConnection.connection.send("SEND", JSON.stringify(cf));
    hubConnection.connection.send("SEND", JSON.stringify(cf2));
  };

  const sendData = (type, data) => {
    const payload = [
      {
        id: `Channel1.Device1.${type}`,
        v: Number(data),
      },
    ];
    hubConnection.connection.send("SEND", JSON.stringify(payload));
  };


  return (
    <>
      <div>
        <HeaderItem pageName="Monitor" />
        <div className={css("tab")}>
          <div className={css("tab1")}>
            <Link to="/monitor">
              <span>Monitor 1</span>
            </Link>
          </div>
          <div className={css("tab2")}>
            <Link to="/monitor2">
              <span>Monitor 2</span>
            </Link>
          </div>
        </div>
      </div>
      <div className={css("body")}>
        <div className={css("body__left")}>
          <div className={css("inverter")}>
            <h1>Inverter Motor</h1>
            <div className={css("btn")}>
              <button
                // onClick={() => {
                //   sendData("StartInverter");
                // }}
                onMouseDown={() => {
                  sendData("Inverter_Start", 1);
                }}
                onMouseUp={() => {
                  sendData("Inverter_Start", 0);
                }}
              >
                START
              </button>
              <button
                // onClick={() => {
                //   sendData("StopInverter");
                // }}
                onMouseDown={() => {
                  sendData("Inverter_Stop", 1);
                }}
                onMouseUp={() => {
                  sendData("Inverter_Stop", 0);
                }}
              >
                STOP
              </button>
            </div>
            <div className={css("info")}>
              <div className={css("info__direction")}>
                <h3>Direction</h3>
                <div>
                  <div
                    
                    onMouseDown={() => {
                      sendData("Inverter_Rev", 1);
                    }}
                    onMouseUp={() => {
                      sendData("Inverter_Rev", 0);
                    }}
                    className={css("wrap-icon", { "current-direction": drt })}
                  >
                    <FontAwesomeIcon
                      className={css("direction-icon")}
                      icon={faArrowRotateRight}
                    />
                  </div>
                  <div
                    
                    onMouseDown={() => {
                      sendData("Inverter_Fwd", 1);
                    }}
                    onMouseUp={() => {
                      sendData("Inverter_Fwd", 0);
                    }}
                    className={css("wrap-icon", { "current-direction": drt })}
                  >
                    <FontAwesomeIcon
                      className={css("direction-icon")}
                      icon={faArrowRotateLeft}
                    />
                  </div>
                </div>
              </div>
              <div className={css("info__status")}>
                <h3>Status</h3>
                <div>
                  <div className={css("stt-on", { ledOn: ledSttOn })}></div>
                  <div className={css("stt-off", { ledOff: ledSttOff })}></div>
                </div>
              </div>
              <div className={css("info__param")}>
                <h3>SET POINT</h3>
                <h4>Speed</h4>
                <span>
                  <Input width="50px" height="24px" func={dataSpeed} />
                  (Hz)
                  <button
                    onMouseDown={() => {
                      sendData("Inverter_Confirm", 1);
                    }}
                    onMouseUp={() => {
                      sendData("Inverter_Confirm", 0);
                    }}
                    onClick={() => sendData("Inverter_Speed_SP", speed)}
                  >
                    OK
                  </button>
                </span>
              </div>
              <div className={css("info__param")}>
                <h3>CURRENT</h3>
                <h4>Speed</h4>
                <span className={css("value__current")}>
                  {data["Inverter_Speed_PV"]
                    ? data["Inverter_Speed_PV"].value.toFixed(3)
                    : "???"}
                  <span style={{ position: "relative", left: "14px" }}>
                    (Hz)
                  </span>
                </span>
              </div>
            </div>
            <Recharts />
          </div>
        </div>
        <div className={css("body__right")}>
          <div className={css("plc1")}>
            <h1>Panel PLC Micro 820</h1>
            <div className={css("plc1-body")}>
              <div className={css("plc1-body-SW")}>
                <div className={css("body-SW")}>
                  <Switch
                    name="I0.0"
                    status={
                      data.Micro820_input_1
                        ? data.Micro820_input_1.value
                        : false
                    }
                  />
                  <Switch
                    name="I0.1"
                    status={
                      data.Micro820_input_2
                        ? data.Micro820_input_2.value
                        : false
                    }
                  />
                  <Switch
                    name="I0.2"
                    status={
                      data.Micro820_input_3
                        ? data.Micro820_input_3.value
                        : false
                    }
                  />
                  <Switch
                    name="I0.3"
                    status={
                      data.Micro820_input_4
                        ? data.Micro820_input_4.value
                        : false
                    }
                  />
                </div>
                <div className={css("body-SW")}>
                  <Switch
                    name="I0.4"
                    status={
                      data.Micro820_input_5
                        ? data.Micro820_input_5.value
                        : false
                    }
                  />
                  <Switch
                    name="I0.5"
                    status={
                      data.Micro820_input_6
                        ? data.Micro820_input_6.value
                        : false
                    }
                  />
                  <Switch
                    name="I0.6"
                    status={
                      data.Micro820_input_7
                        ? data.Micro820_input_7.value
                        : false
                    }
                  />
                  <Switch
                    name="I0.7"
                    status={
                      data.Micro820_input_8
                        ? data.Micro820_input_8.value
                        : false
                    }
                  />
                </div>
              </div>
              <div className={css("plc1-body-vol")}>
                <h2>Current Voltage</h2>
                <span className={css("value__current")}>
                  {data["Micro820_Analog_1"]
                    ? ((data["Micro820_Analog_1"].value * 10) / 4013).toFixed(2)
                    : "???"}
                  <span style={{ position: "relative", left: "24px" }}>
                    (V)
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className={css("plc2")}>
            <h1>Pannel PLC Micro 850</h1>
            <div className={css("btn")}>
              <button
                // onClick={() => {
                //   sendData("StartTraffic");
                // }}
                onMouseDown={() => {
                  sendData("Traffic_Start", 1);
                }}
                onMouseUp={() => {
                  sendData("Traffic_Start", 0);
                }}
              >
                START
              </button>
              <button
                onMouseDown={() => {
                  sendData("Traffic_Stop", 1);
                }}
                onMouseUp={() => {
                  sendData("Traffic_Stop", 0);
                }}
              >
                STOP
              </button>
            </div>
            <div className={css("plc2__input")}>
              <div className={css("input-param")}>
                <span>
                  <span className={css("info-input-title")}>YellowTime</span>
                  <Input width="60px" func={dataYellowTime} />
                  <span>(s)</span>
                </span>
                <span>
                  <span className={css("info-input-title")}>RedTime</span>
                  <Input width="60px" func={dataRedTime} />
                  (s)
                </span>
                <span>
                  <span className={css("info-input-title")}>GreenTime</span>
                  <Input width="60px" func={dataGreenTime} />
                  (s)
                </span>
              </div>
              <button onClick={() => sendTrafficTime()}>CONFIRM</button>
            </div>
            <div className={css("plc2__stt")}>
              <Status
                color="red"
                status={data.RedLightA ? data.RedLightA.value : false}
                name="Q0.0"
              />
              <Status
                color="yellow"
                status={data.YellowLightA ? data.YellowLightA.value : false}
                name="Q0.1"
              />
              <Status
                color="green"
                status={data.GreenLightA ? data.GreenLightA.value : false}
                name="Q0.2"
              />
              <Status
                color="red"
                status={data.RedLightB ? data.RedLightB.value : false}
                name="Q0.3"
              />
              <Status
                color="yellow"
                status={data.YellowLightB ? data.YellowLightB.value : false}
                name="Q0.4"
              />
              <Status
                color="green"
                status={data.GreenLightB ? data.GreenLightB.value : false}
                name="Q0.5"
              />
              <Status name="Q0.6" />
              <Status name="Q0.7" />
            </div>
            <div className={css("plc2__SW")}>
              <Switch
                name="I0.0"
                status={
                  data.Micro850_input_1 ? data.Micro850_input_1.value : false
                }
              />
              <Switch
                name="I0.1"
                status={
                  data.Micro850_input_2 ? data.Micro850_input_2.value : false
                }
              />
              <Switch
                name="I0.2"
                status={
                  data.Micro850_input_3 ? data.Micro850_input_3.value : false
                }
              />
              <Switch
                name="I0.3"
                status={
                  data.Micro850_input_4 ? data.Micro850_input_4.value : false
                }
              />
              <Switch
                name="I0.4"
                status={
                  data.Micro850_input_5 ? data.Micro850_input_5.value : false
                }
              />
              <Switch
                name="I0.5"
                status={
                  data.Micro850_input_6 ? data.Micro850_input_6.value : false
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Monitor;
