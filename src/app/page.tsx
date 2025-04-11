"use client";

import { useEffect, useState } from "react";
import { Paper, Tabs, Tab, Typography, CircularProgress } from "@mui/material";

import { PaperCard } from "@/components/PaperCard/PaperCard";
import MainCarousel from "@/components/Carousel/MainCarousel";
import MissionVision from "@/components/mission_vision/missionVision";
import Marquee from "@/components/marquee/marquee";
import TwitterTimeline from "@/components/PaperCard/twitterTimeline";

import * as carouselData from "../../public/json/carousel/home_carousel.json";
import "./globals.css";

interface Item {
  title: string;
  link: string;
  date?: string;
  isNew?: boolean;
}

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState({
    notice: [] as Item[],
    events: [] as Item[],
    news: [] as Item[],
    achievements: [] as Item[],
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [achRes, newsRes, eventsRes, noticeRes] = await Promise.all([
          fetch("/json/general/achievements.json").then(res => res.json()),
          fetch("/json/general/news.json").then(res => res.json()),
          fetch("/json/events/events.json").then(res => res.json()),
          fetch("/json/general/notices.json").then(res => res.json()),
        ]);

        setData({
          achievements: achRes.data,
          news: sortData(newsRes.data),
          events: sortData(eventsRes.data),
          notice: sortData(noticeRes.data),
          loading: false,
        });
      } catch (error) {
        console.error("Error loading JSON data:", error);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  const sortData = (items?: Item[]) =>
    items?.sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime()) ?? [];

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabs = [
    { label: "News", data: data.news, link: "/news" },
    { label: "Events", data: data.events, link: "/events" },
    { label: "Notices", data: data.notice, link: "/notices" },
  ];

  return (
    <div className="page-container">
      <div className="container">
        <div className="customflex">
          <div className="mission"><MissionVision /></div>
          <div className="carousel"><MainCarousel images={carouselData.data} /></div>
          <div className="marquee" id="announcements_marquee"><Marquee /></div>
        </div>

        <div className="row">
          <Paper elevation={1} className="tabbedPane" id="news_event_notice">
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="news events notices">
              {tabs.map((tab, index) => (
                <Tab key={index} label={tab.label} id={`tab-${index}`} aria-controls={`tabpanel-${index}`} />
              ))}
            </Tabs>
            <div className="tab-content">
              <PaperCard
                title={tabs[activeTab].label}
                items={tabs[activeTab].data.slice(0, 5)}
                linkToOlder={tabs[activeTab].link}
              />
            </div>
          </Paper>

          <Paper elevation={2} className="achievements">
            {data.loading ? (
              <CircularProgress />
            ) : data.achievements.length > 0 ? (
              <PaperCard
                title="Achievements"
                items={data.achievements.slice(0, 5)}
                linkToOlder="/achievements"
              />
            ) : (
              <Typography>No Achievements available.</Typography>
            )}
          </Paper>

          <Paper elevation={2} className="twittertimeline" id="twitter_timeline">
            <TwitterTimeline username="iiittrichy" />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Home;
