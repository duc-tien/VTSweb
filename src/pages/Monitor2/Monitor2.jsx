import Status from "@src/components/Vali2/Status";
import Switch from "@src/components/Vali2/Switch";
import Input from "@src/components/Vali2/Input";
import back from "@src/assets/Subtract.svg";

import style from "./Monitor2.module.scss";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTurnUp,
  faArrowRotateRight,
  faArrowRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";

const css = classNames.bind(style);

function Monitor() {
  const [connection, setConnection] = useState(null);
  const [data, setData] = useState({});

  // useEffect(() => {
  //   const connect = new HubConnectionBuilder()
  //     .withUrl("https://mqttcloud.azurewebsites.net/myhub")
  //     .withAutomaticReconnect()
  //     .build();

  //   setConnection(connect);
  // }, []);

  // useEffect(() => {
  //   if (connection) {
  //     connection
  //       .start()
  //       .then(() => {
  //         connection.on("TagChanged", (msg) => {
  //           let obj = JSON.parse(msg);
  //           obj.value === "TRUE" ? (obj.value = true) : null;
  //           obj.value === "FALSE" ? (obj.value = false) : null;
  //           setData((prev) => {
  //             const listData = { ...prev, [obj.name]: obj };
  //             return listData;
  //           });
  //         });
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // }, [connection]);
  // console.log(data);

  return (
    <>
      <div className={css("header")}>
        <img src={back} className={css("size")} />
        MONITOR
      </div>
      <div className={css("body")}>
        <div className={css("body__left")}>
          <div className={css("inverter")}>
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
              <div className={css("info__input")}>
                <span>Set Point</span>
                <Input width="110px" />
                <span>Frequency</span>
                <Input width="110px" />
                <span>Current</span>
                <Input width="300px" />
              </div>
            </div>
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
              <div className={css("plc2__info-SW")}>
                <Switch name="I0.0" />
                <Switch name="I0.1" />
                <Switch name="I0.2" />
                <Switch name="I0.3" />
                <Switch name="I0.4" />
                <Switch name="I0.5" />
                <Switch name="I0.6" />
                <Switch name="I0.7" />
              </div>
              <div className={css("plc2__info-input")}>
                <span>
                  <span className={css("info-input-title")}>
                    Thời gian đèn vàng
                  </span>
                  <Input width="80px" />
                  (s)
                </span>
                <span>
                  <span className={css("info-input-title")}>
                    Thời gian đèn đỏ
                  </span>
                  <Input width="80px" />
                  (s)
                </span>
                <span>
                  <span className={css("info-input-title")}>
                    Thời gian đèn xanh
                  </span>
                  <Input width="80px" />
                  (s)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Monitor;
