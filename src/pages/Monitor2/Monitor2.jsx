import Status from "@src/components/Vali2/Status";
import Switch from "@src/components/Vali2/Switch";
import Input from "@src/components/Vali2/Input";

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

  console.log(data);

  return (
    <>
      <div>
        <HeaderItem pageName="Monitor" />
        <div className={css("tab1")}>
          <Link to="/monitor">
            <span>Monitor 1</span>
          </Link>
          <Link to="/monitor2">
            <span>Monitor 2</span>
          </Link>
        </div>
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
              <div className={css("info__param")}>
                <h3>SET POINT</h3>
                <h5>Speed</h5>
                <span>
                  <Input width="60px" height="24px" />
                  <button>OK</button>
                </span>
                <h5>Frequency</h5>
                <span>
                  <Input width="60px" height="24px" />
                  <button>OK</button>
                </span>
              </div>
              <div className={css("info__param")}>
                <h3>CURRENT</h3>
                <h5>Speed</h5>
                <span className={css("value__current")}>???</span>
                <h5>Frequency</h5>
                <span className={css("value__current")}>???</span>
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
                <div className={css("input-param")}>
                  <span>
                    <span className={css("info-input-title")}>YellowTime</span>
                    <Input width="60px" />
                    <span>(s)</span>
                  </span>
                  <span>
                    <span className={css("info-input-title")}>RedTime</span>
                    <Input width="60px" />
                    (s)
                  </span>
                  <span>
                    <span className={css("info-input-title")}>GreenTime</span>
                    <Input width="60px" />
                    (s)
                  </span>
                </div>
                <button>CONFIRM</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Monitor;
