import Recharts from "../../utils/Recharts/Recharts";
import Status from "@src/components/Status2";
import Input from "@src/components/Input";
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
import {
  TrafficLight,
  AredBgreen,
  AredByellow,
  AgreenBred,
  AyellowBred,
} from "../../assets";

const css = classNames.bind(style);

function Monitor() {
  const [data, setData] = useState({
    Micro850_input_1: { value: false },
    Micro850_input_2: { value: false },
    Micro850_input_3: { value: false },
    Micro850_input_4: { value: false },
    Micro850_input_5: { value: false },
    Micro850_input_6: { value: false },
    Micro850_input_7: { value: false },
    Micro850_input_8: { value: false },
    RedLightA: { value: false },
    GreenLightA: { value: false },
    YellowLightA: { value: false },
    RedLightB: { value: false },
    GreenLightB: { value: false },
    YellowLightB: { value: false },
    Micro820_input_1: { value: false },
    Micro820_input_2: { value: false },
    Micro820_input_3: { value: false },
    Micro820_input_4: { value: false },
    Micro820_input_5: { value: false },
    Micro820_input_6: { value: false },
  });
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
        <div className={css("body-left")}>
          <div className={css("micro850")}>
            <h2>Panel Micro 850</h2>
            <div className={css("input-850")}>
              <Status name="I0.0" />
              <Status name="I0.1" />
              <Status name="I0.2" />
              <Status name="I0.3" />
              <Status name="I0.4" />
              <Status name="I0.5" />
            </div>
            <div className={css("control850-image")}>
              <div className={css("control850")}>
                <div className={css("start-stop-850")}>
                  <button className={css("start-850")}>START</button>
                  <button className={css("stop-850")}>STOP</button>
                </div>
                <div className={css("set-param-850")}>
                  <span className={css("title-850")}>Red light setting</span>
                  <Input width="54px" height="24px" />
                  <span>[s]</span>
                </div>
                <div className={css("set-param-850")}>
                  <span className={css("title-850")}>Green light setting</span>
                  <Input width="54px" height="24px" />
                  <span>[s]</span>
                </div>
                <div className={css("set-param-850")}>
                  <span className={css("title-850")}>Yellow light setting</span>
                  <Input width="54px" height="24px" />
                  <span>[s]</span>
                </div>
                <button className={css("confirm-850")}>CONFIRM</button>
              </div>
              <div className={css("image-850")}>
                {!data.RedLightA.value &&
                  !data.GreenLightA.value &&
                  !data.YellowLightA.value &&
                  !data.RedLightB.value &&
                  !data.GreenLightB.value &&
                  !data.YellowLightB.value && <TrafficLight />}
                {data.GreenLightA.value && data.RedLightB.value && (
                  <AgreenBred />
                )}
                {data.YellowLightA.value && data.RedLightB.value && (
                  <AyellowBred />
                )}
                {data.RedLightA.value && data.GreenLightB.value && (
                  <AredBgreen />
                )}
                {data.RedLightA.value && data.YellowLightB.value && (
                  <AredByellow />
                )}
              </div>
            </div>
          </div>
          <div className={css("micro820")}>
            <h2>Panel Micro 820</h2>
            <div className={css("status-vol-820")}>
              <div className={css("status-820")}>
                <div className={css("input-820")}>
                  <Status name="I0.0" />
                  <Status name="I0.1" />
                  <Status name="I0.2" />
                  <Status name="I0.3" />
                  <Status name="I0.4" />
                  <Status name="I0.5" />
                  <Status name="I0.6" />
                  <Status name="I0.7" />
                </div>
                <div className={css("output-820")}>
                  <Status name="Q0.0" />
                  <Status name="Q0.1" />
                  <Status name="Q0.2" />
                  <Status name="Q0.3" />
                  <Status name="Q0.4" />
                  <Status name="Q0.5" />
                  <Status name="Q0.6" />
                  <Status name="Q0.7" />
                </div>
              </div>
              <div className={css("vol-820")}>
                <h2>Voltage</h2>
                <span>######</span>
              </div>
            </div>
          </div>
        </div>
        <div className={css("body-right")}>
          <h2>INVERTER & MOTOR</h2>
          <div className={css("control-speed-inverter")}>
            <div className={css("control-inverter")}>
              <h4>CONTROL</h4>
              <div className={css("control-detail")}>
                <button className={css("control-btn")}>START</button>
                <button className={css("control-btn")}>STOP</button>
                <button className={css("control-btn")}>FWD</button>
                <button className={css("control-btn")}>INV</button>

                <span className={css("indicator-light")}>
                  <Status />
                  <span>Run</span>
                </span>
                <span className={css("indicator-light")}>
                  <Status />
                  <span>Fwd</span>
                </span>
                <span className={css("indicator-light")}>
                  <Status />
                  <span>Rev</span>
                </span>
                <span className={css("indicator-light")}>
                  <Status />
                  <span>Error</span>
                </span>
              </div>
            </div>
            <div className={css("speed-inverter")}>
              <h4>SPEED</h4>
              <div className={css("select-speed")}>
                <button className={css("select-btn")}>10Hz</button>
                <button className={css("select-btn")}>20Hz</button>
                <button className={css("select-btn")}>30Hz</button>
              </div>
              <div className={css("set-speed")}>
                <span className={css("title-speed")}>Speed Setting</span>
                <Input width="54px" height="24px" />
                <span>[Hz]</span>
                <button className={css("confirm-btn")}>Confirm</button>
              </div>
              <div className={css("current-speed")}>
                <span className={css("title-speed")}>Current Speed</span>
                <span className={css("current-value")}></span>
                <span>[Hz]</span>
              </div>
            </div>
          </div>
          <Recharts />
        </div>
      </div>
    </>
  );
}

export default Monitor;
