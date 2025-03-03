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
} from "recharts";
import { getLinks } from "../services";

const Analytics = () => {
  // const deviceData = [
  //   { name: "Linux", deviceClicks: 400 },
  //   { name: "Mac", deviceClicks: 300 },
  //   { name: "iOS", deviceClicks: 500 },
  //   { name: "Windows", deviceClicks: 200 },
  //   { name: "Android", deviceClicks: 600 },
  //   { name: "Other", deviceClicks: 800 },
  // ];
  const top6LinkData = [
    { name: "Linux", deviceClicks: 400 },
    { name: "Mac", deviceClicks: 300 },
    { name: "iOS", deviceClicks: 500 },
    { name: "Windows", deviceClicks: 200 },
    { name: "Android", deviceClicks: 600 },
    { name: "Other", deviceClicks: 800 },
  ];
  const [userLinks, setUserLinks] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
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
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
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
          initialDeviceClicks[device] += link.clickData.deviceClicks[device] || 0;
        });
      }
    });

    console.log(initialDeviceClicks);

    const formattedDeviceData = Object.keys(initialDeviceClicks).map((device) => ({
      name: device,
      deviceClicks: initialDeviceClicks[device],
    }));

    setDeviceData(formattedDeviceData);
  };


  return (
    <div className="analytic-container">
      <div className="analytic-top">
        <h3>Overview</h3>
        <div className="analytic-calendar">
          <input type="date" />
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
        <LineChart width={900} height={300} data={monthlyData}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Line type="monotone" dataKey="clicks" stroke="#000000" />
        </LineChart>
      </div>
      <div className="clicks-devices-sites">
        <div className="clicks-devices" style={{ width: "100%", height: 300 }}>
          <h3>Traffic by Device</h3>
          <ResponsiveContainer width="100%" height="100%">
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
        <div className="clicks-sites"></div>
      </div>
      <div className="clicks-by-links" style={{ width: "100%", height: 300 }}>
        <h3>Traffic by Links</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={top6LinkData}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Bar dataKey="deviceClicks" radius={[5, 5, 0, 0]}>
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
