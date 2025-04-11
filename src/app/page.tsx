"use client";

import { useEffect, useState, useRef } from "react";
import { PaperCard } from "@/components/PaperCard/PaperCard";
import MainCarousel from "@/components/Carousel/MainCarousel";
import MissionVision from "@/components/mission_vision/missionVision";
import Marquee from "@/components/marquee/marquee";
import "./globals.css";
import {
  Paper,
  Tabs,
  Tab,
  Typography,
  CircularProgress,
  Box,
  Skeleton,
  Chip,
} from "@mui/material";
import TwitterTimeline from "@/components/PaperCard/twitterTimeline";
import * as carouselData from "../../public/json/carousel/home_carousel.json";

interface Item {
  title: string;
  link: string;
  date?: string;
  isNew?: boolean;
}

const Home: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [data, setData] = useState({
    notice: [] as Item[],
    events: [] as Item[],
    news: [] as Item[],
    achievements: [] as Item[],
    loading: true,
  });
  const hasLoaded = useRef([true, false, false]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [achRes, newsRes, eventsRes, noticeRes] = await Promise.all([
          fetch("/json/general/achievements.json").then((res) => res.json()),
          fetch("/json/general/news.json").then((res) => res.json()),
          fetch("/json/events/events.json").then((res) => res.json()),
          fetch("/json/general/notices.json").then((res) => res.json()),
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
        setData((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchData();
  }, []);

  const sortData = (data?: Item[]) => {
    if (!data) return [];
    return [...data].sort(
      (a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime()
    );
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    hasLoaded.current[newValue] = true;
    setValue(newValue);
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
          <div className="mission">
            <MissionVision />
          </div>
          <div className="carousel">
            <MainCarousel images={carouselData.data} />
          </div>
          <div className="marquee" id="announcements_marquee">
            <Marquee />
          </div>
        </div>

        <div className="row">
          <Paper elevation={1} className="tabbedPane" id="news_event_notice">
            <Tabs value={value} onChange={handleChange} aria-label="news events notices">
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label}
                  id={`simple-tab-${index}`}
                  aria-controls={`simple-tabpanel-${index}`}
                  className="tab"
                />
              ))}
            </Tabs>

            <Box role="tabpanel" hidden={value !== 0} id="tabpanel-0">
              {hasLoaded.current[0] && value === 0 && (
                <PaperCard title="News" items={data.news.slice(0, 6)} linkToOlder="/news" />
              )}
            </Box>
            <Box role="tabpanel" hidden={value !== 1} id="tabpanel-1">
              {hasLoaded.current[1] && value === 1 && (
                <PaperCard title="Events" items={data.events.slice(0, 6)} linkToOlder="/events" />
              )}
            </Box>
            <Box role="tabpanel" hidden={value !== 2} id="tabpanel-2">
              {hasLoaded.current[2] && value === 2 && (
                <PaperCard title="Notice" items={data.notice.slice(0, 6)} linkToOlder="/notices" />
              )}
            </Box>
          </Paper>

          <Paper elevation={2} className="achievements">
            {data.loading ? (
              <Skeleton variant="rectangular" height={200} />
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
