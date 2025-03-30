"use client";

import { useEffect, useState } from "react";
import PaperCard from "@/components/PaperCard/PaperCard";
import MainCarousel from "@/components/Carousel/MainCarousel";
import MissionVision from "@/components/mission_vision/missionVision";
import Marquee from "@/components/marquee/marquee";
import "./globals.css"
import {
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import TwitterTimeline from "@/components/PaperCard/twitterTimeline";
import carouselData from "../../public/json/homeCarousel.json"

interface Item {
  title: string;
  link: string;
  date?: string;
  isNew?: boolean;
}

// Tab Panel Component
const TabPanel: React.FC<{ children: React.ReactNode; value: number; index: number }> = ({
  children,
  value,
  index,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const Home: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [noticeData, setNoticeData] = useState<Item[] | null>(null);
  const [eventsData, setEventsData] = useState<Item[] | null>(null);
  const [newsData, setNewsData] = useState<Item[] | null>(null);
  const [achievementsData, setAchievementsData] = useState<Item[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [achRes, newsRes, eventsRes, noticeRes] = await Promise.all([
          fetch("/json/achievements.json").then((res) => res.json()),
          fetch("/json/news.json").then((res) => res.json()),
          fetch("/json/events.json").then((res) => res.json()),
          fetch("/json/notices.json").then((res) => res.json()),
        ]);

        setAchievementsData(achRes.data);
        setNewsData(sortData(newsRes.data));
        setEventsData(sortData(eventsRes.data));
        setNoticeData(sortData(noticeRes.data));
      } catch (error) {
        console.error("Error loading JSON data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortData = (data: Item[]): Item[] => {
    if (!data) return [];
    const older = data.filter((x) => !x.isNew).sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
    const newer = data.filter((x) => x.isNew).sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());
    return [...newer, ...older];
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => ({
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  });

  return (
    <div className="page-container">
      <div className="container">
        {/* Main Sections */}
        <div className="customeflex">
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

        {/* Tabs Section */}
        <div className="row">
          <Paper elevation={3} className="tabbedPane" id="news_event_notice">
            <Tabs value={value} onChange={handleChange} aria-label="news events notices">
              <Tab label="News" {...a11yProps(0)} className="tab" />
              <Tab label="Events" {...a11yProps(1)} className="tab" />
              <Tab label="Notices" {...a11yProps(2)} className="tab" />
            </Tabs>

            <TabPanel value={value} index={0}>
              {loading ? (
                <CircularProgress />
              ) : newsData ? (
                <PaperCard title="News" items={newsData.slice(0, 5)} linkToOlder="/news" />
              ) : (
                <Typography>No News available.</Typography>
              )}
            </TabPanel>

            <TabPanel value={value} index={1}>
              {loading ? (
                <CircularProgress />
              ) : eventsData ? (
                <PaperCard title="Events" items={eventsData.slice(0, 5)} linkToOlder="/events" />
              ) : (
                <Typography>No Events available.</Typography>
              )}
            </TabPanel>

            <TabPanel value={value} index={2}>
              {loading ? (
                <CircularProgress />
              ) : noticeData ? (
                <PaperCard title="Notices" items={noticeData.slice(0, 5)} linkToOlder="/general" />
              ) : (
                <Typography>No Notices available.</Typography>
              )}
            </TabPanel>
          </Paper>

          {/* Achievements Section */}
          <Paper elevation={3} className="achievements">
            {loading ? (
              <CircularProgress />
            ) : achievementsData ? (
              <PaperCard title="Achievements" items={achievementsData.slice(0, 5)} linkToOlder="/achievements" />
            ) : (
              <Typography>No Achievements available.</Typography>
            )}
          </Paper>

          {/* Twitter Timeline Section */}
          <Paper elevation={3} className="twittertimeline" id="twitter_timeline">
            
            Twitter Data 
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Home;
