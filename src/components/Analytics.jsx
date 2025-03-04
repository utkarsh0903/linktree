import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Tooltip,
  Legend,
} from "recharts";
import { getLinks } from "../services";
import "../styles/analytics.css";
import "../App";
import calendar from "../assets/calender.png";

const Analytics = () => {
  const COLORS = ["#165534", "#21AF66", "#94E9B8", "#3EE58F"];

  const [userLinks, setUserLinks] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [top6LinkData, setTop6LinkData] = useState([]);
  const colors = [
    "#92FFC6",
    "#9BEBC1",
    "#165534",
    "#3EE58F",
    "#A1D4BA",
    "#21AF66",
  ];

  useEffect(() => {
    getUserLinks();
  }, []);

  const getUserLinks = async () => {
    const res = await getLinks();
    if (res.status === 200) {
      const data = await res.json(res);
      setUserLinks(data.links);
      calculateMonthlyClicks(data.links);
      calculateDeviceClicks(data.links);
      calculateTopLinks(data.links);
      calculateSocialMediaClicks(data.links);
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

  const links = userLinks.filter((link) => link.type === "links");
  const shops = userLinks.filter((link) => link.type === "shop");

  const linkClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);
  const shopClicks = shops.reduce((sum, shop) => sum + (shop.clicks || 0), 0);

  const calculateMonthlyClicks = (links) => {
    let monthlyClicks = {};

    links.forEach((link) => {
      const linkMonthlyClicks = link.clickData?.monthlyClicks || {};
      for (const [month, count] of Object.entries(linkMonthlyClicks)) {
        monthlyClicks[month] = (monthlyClicks[month] || 0) + count;
      }
    });

    const monthsOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
    ];
    const formattedData = monthsOrder.map((month) => ({
      name: month,
      clicks: monthlyClicks[month] || 0,
    }));

    setMonthlyData(formattedData);
  };

  const calculateDeviceClicks = (links) => {
    let initialDeviceClicks = {
      Linux: 0,
      Mac: 0,
      iOS: 0,
      Windows: 0,
      Android: 0,
      Other: 0,
    };

    links.forEach((link) => {
      if (link.clickData?.deviceClicks) {
        Object.keys(link.clickData.deviceClicks).forEach((device) => {
          initialDeviceClicks[device] +=
            link.clickData.deviceClicks[device] || 0;
        });
      }
    });

    const finalDeviceData = Object.keys(initialDeviceClicks).map((device) => ({
      name: device,
      deviceClicks: initialDeviceClicks[device],
    }));

    setDeviceData(finalDeviceData);
  };

  const calculateSocialMediaClicks = (links) => {
    let initialsocialMediaClicks = {
      YouTube: 0,
      Facebook: 0,
      Instagram: 0,
      Others: 0,
    };

    links.forEach((link) => {
      const platform = link?.socialMedia;
      const clicks = link.clicks || 0;

      if (platform === "yt") {
        initialsocialMediaClicks.YouTube += clicks;
      } else if (platform === "fb") {
        initialsocialMediaClicks.Facebook += clicks;
      } else if (platform === "insta") {
        initialsocialMediaClicks.Instagram += clicks;
      } else {
        initialsocialMediaClicks.Others += clicks;
      }
    });

    const finalData = Object.keys(initialsocialMediaClicks).map((platform) => ({
      name: platform,
      value: initialsocialMediaClicks[platform],
    }));

    setSocialMediaData(finalData);
  };

  const calculateTopLinks = (links) => {
    const sortedLinks = [...links]
      .sort((a, b) => (b.clicks || 0) - (a.clicks || 0))
      .slice(0, 6);

    const finalTopLinks = sortedLinks.map((link) => ({
      name: link.title,
      clicks: link.clicks || 0,
    }));

    setTop6LinkData(finalTopLinks);
  };

  return (
    <div className="analytic-container hide-scrollbar">
      <div className="analytic-top">
        <h3 className="analytic-heading">Overview</h3>
        <div className="analytic-calendar">
          <img src={calendar} alt="Calendar" />
          <input placeholder="Feb 9th to feb 15th" disabled={true} />
          <select name="calendar"></select>
        </div>
      </div>
      <div className="show-links-shops-clicks">
        <div className="link-clicks">
          <h4>Clicks on Links</h4>
          <p>{linkClicks}</p>
        </div>
        <div className="shop-clicks">
          <h4>Click on Shop</h4>
          <p>{shopClicks}</p>
        </div>
        <div className="cta-clicks">
          <h4>CTA</h4>
          <p>156</p>
        </div>
      </div>
      <div className="clicks-by-months">
        <LineChart width={800} height={400} data={monthlyData} className="month-click-chart">
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Line type="monotone" dataKey="clicks" stroke="#000000" dot={false} />
        </LineChart>
      </div>
      <div className="clicks-devices-sites">
        <div className="clicks-devices" style={{ width: "50%", height: 300 }}>
          <h3>Traffic by Device</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={deviceData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Bar dataKey="deviceClicks" radius={[5, 5, 0, 0]}>
                {deviceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="clicks-sites" style={{ width: "50%", height: 300 }}>
          <h3>Sites</h3>
          <PieChart width={400} height={240}>
            <Pie
              data={socialMediaData}
              cx={120}
              cy={120}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {socialMediaData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              content={showChartData}
              layout="vertical"
              align="right"
              verticalAlign="middle"
            />
          </PieChart>
        </div>
      </div>
      <div className="clicks-by-links" style={{ width: "60%", height: 300 }}>
        <h3>Traffic by Links</h3>
        <ResponsiveContainer width="90%" height="90%">
          <BarChart data={top6LinkData}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Bar dataKey="clicks" radius={[5, 5, 0, 0]}>
              {top6LinkData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;

const showChartData = (props) => {
  const { payload } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column", paddingLeft: 20 }}>
      {payload.map((entry, index) => (
        <div
          key={`item-${index}`}
          style={{ display: "flex", alignItems: "center", marginBottom: 5 }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor: entry.color,
              marginRight: 8,
              borderRadius: 10,
            }}
          ></div>
          <p>
            {entry.value}:{" "}
            <span style={{ marginLeft: 10 }}>{entry.payload.value}</span>
          </p>
        </div>
      ))}
    </div>
  );
};
