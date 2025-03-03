import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { getLinks } from "../services";

const Analytics = () => {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const [userLinks, setUserLinks] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    getUserLinks();
  }, []);

  const getUserLinks = async () => {
    const res = await getLinks();
    if (res.status === 200) {
      const data = await res.json(res);
      setUserLinks(data.links);
      calculateMonthlyClicks(data.links);
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
          <XAxis dataKey="name" />
          <YAxis />
          <Line type="monotone" dataKey="clicks" stroke="#000000" />
        </LineChart>
      </div>
      <div className="clicks-devices-sites">
        <div className="clicks-devices">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={data}>
              <Bar dataKey="uv" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="clicks-sites"></div>
      </div>
      <div className="clicks-by-links"></div>
    </div>
  );
};

export default Analytics;
