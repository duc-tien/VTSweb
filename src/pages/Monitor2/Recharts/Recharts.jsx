import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import style from "./Recharts.module.scss";
import classNames from "classnames/bind";
import hubConnection from "@src/services/signalR/hubConnection";
const css = classNames.bind(style);

function Recharts() {
  const [connection, setConnection] = useState(null);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const connect = new HubConnectionBuilder()
  //     .withUrl("https://mqttcloud.azurewebsites.net/myhub")
  //     .withAutomaticReconnect()
  //     .build();

  //   setConnection(connect);
  // }, []);

  useEffect(() => {
    hubConnection.start();
    hubConnection.connection.on("TagChanged", (msg) => {
      let obj = JSON.parse(msg);
      if (obj.name === "Channel1.Device1.Inverter_Speed_PV") {
        const d = new Date();
        let h = d.getHours();
        let m = d.getMinutes();
        obj.time = `${h}:${m}`;
        setData((prev) => {
          const listData = [...prev, obj];
          if (listData.length > 500) {
            listData.shift();
          }
          return listData;
        });
      }
    });
    return () => {
      hubConnection.connection.off("TagChanged");
    };
  }, [hubConnection.connection]);

  // console.log(data);

  return (
    <>
      <div className={css("chart")}>
        <span>Biểu đồ tốc độ động cơ theo thời gian</span>
        <div>
          <LineChart width={400} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            {/* <XAxis dataKey="time" /> */}
            <YAxis domain={[0, 25]} ticks={[0, 5, 10, 15, 20, 25]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#82ca9d"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
          <p> Tốc độ(Hz)</p>
        </div>
      </div>
    </>
  );
}

export default Recharts;
