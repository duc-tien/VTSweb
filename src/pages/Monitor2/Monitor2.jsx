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
  const [freq, setFreq] = useState();
  const [timeRed, setTimeRed] = useState();
  const [timeYellow, setTimeYellow] = useState();
  const [timeGreen, setTimeGreen] = useState();
  const inputRef = useRef();
  let enable = useRef(true);

  useEffect(() => {
    hubConnection.start();
    hubConnection.connection.on("TagChanged", (res) => {
      const obj = JSON.parse(res);
      obj.value === "TRUE" ? (obj.value = true) : null;
      obj.value === "FALSE" ? (obj.value = false) : null;
      setData((prevData) => {
        const updateData = { ...prevData, [obj.name]: obj };
        return updateData;
      });
    });
    return () => {
      hubConnection.connection.off("TagChanged");
    };
  }, [hubConnection.connection]);
 // console.log(data);

  const sendData = (type) => {
    let obj;
    switch (type) {
      case "speed": {
        obj = [{
          id: "Channel1.Device1.Inverter_Speed_SP",
          v: Number(speed),
        }];

        // if (enable.current) {
        //   setTimeout(() => {
        //     enable.current = true;
        //   }, 3000);
        //   enable.current = !enable.current;
        // }

        break;
      }
      case "frequency": {
        obj = {
          name: "Frequency",
          value: Number(freq),
        };
        break;
      }
      case "setTime": {
        obj = {
          name: "SetTime",
          timeRed: Number(timeRed),
          timeGreen: Number(timeGreen),
          timeYellow: Number(timeYellow),
        };
        break;
      }
      default:
        console.log("no data");
    }
  //  console.log(JSON.stringify(obj));
    hubConnection.connection.send("SEND", JSON.stringify(obj));
  };

  const dataSpeed = (value) => {
    setSpeed(value);
  };
  const dataFreq = (value) => {
    setFreq(value);
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
            <div className={css("inverter-body")}>
              <h1>Inverter Motor</h1>
              <div className={css("btn")}>
                <button>START</button>
                <button>STOP</button>
              </div>
              <div className={css("info")}>
                <div className={css("info__direction")}>
                  <h3>Direction</h3>
                  <div>
                    <div className={css("wrap-icon")}>
                      <FontAwesomeIcon
                        className={css("direction-icon")}
                        icon={faArrowRotateRight}
                      />
                    </div>
                    <div className={css("wrap-icon")}>
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
                    <div className={css("stt-on")}></div>
                    <div className={css("stt-off")}></div>
                  </div>
                </div>
                <div className={css("info__param")}>
                  <h3>SET POINT</h3>
                  <h5>Speed</h5>
                  <span>
                    <Input width="50px" height="24px" func={dataSpeed} />
                    <button onClick={() => sendData("speed")}>OK</button>
                  </span>
                </div>
                <div className={css("info__param")}>
                  <h3>CURRENT</h3>
                  <h5>Speed</h5>
                  <span className={css("value__current")}>
                    {data["Channel1.Device1.Inverter_Speed_PV"]
                      ? data["Channel1.Device1.Inverter_Speed_PV"].value
                      : "???"}
                  </span>
                </div>
              </div>
            </div>

            <Recharts />
          </div>

          <div className={css("plc1")}>
            <h1>Pannel PLC1</h1>
            <div className={css("plc1__out")}>
              <Status name="Q0.0" />
              <Status name="Q0.1" />
              <Status name="Q0.2" />
              <Status name="Q0.3" />
              <Status name="Q0.4" />
              <Status name="Q0.5" />
              <Status name="Q0.6" />
              <Status name="Q0.7" />
            </div>
            <div className={css("plc1__in")}>
              <Switch name="I0.0" />
              <Switch name="I0.1" />
              <Switch name="I0.2" />
              <Switch name="I0.3" />
              <Switch name="I0.4" />
              <Switch name="I0.5" />
              <Switch name="I0.6" />
              <Switch name="I0.7" />
            </div>
          </div>
        </div>
        <div className={css("body__right")}>
          <div className={css("controll")}>
            <div className={css("ctrlSW")}>
              <Switch name="STOP" />
              <Switch name="START/FW" />
              <Switch name="DIR/REV" />
            </div>
            <div className={css("ctrlSW")}>
              <Switch name="S1" />
              <Switch name="S2" />
              <Switch name="S3" />
              <Switch name="S4" />
            </div>
          </div>
          <div className={css("plc2")}>
            <h1>Pannel PLC2</h1>
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
            <div className={css("plc2__info")}>
              {/* <div className={css("plc2__info-SW")}>
                <Switch name="I0.0" />
                <Switch name="I0.1" />
                <Switch name="I0.2" />
                <Switch name="I0.3" />
                <Switch name="I0.4" />
                <Switch name="I0.5" />
                <Switch name="I0.6" />
                <Switch name="I0.7" />
              </div> */}
              <div className={css("plc2__info-input")}>
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
                <button onClick={() => sendData("setTime")}>CONFIRM</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Monitor;
