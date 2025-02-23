"use client";

import { useEffect, useState } from "react";
import PaperCard from "@/components/PaperCard/PaperCard";
import MainCarousel from "@/components/Carousel/MainCarousel";
import MissionVision from "@/components/mission_vision/missionVision";
import Marquee from "@/components/marquee/marquee";
import { Paper, Tabs, Tab,} from "@mui/material";
import Loader from "@/components/sub_component_loader/sub_component_loader";
import carouselData from "../../public/json/homeCarousel.json";
import TwitterTimeline from "@/components/PaperCard/twitterTimeline";
import "./globals.css";
import { motion, AnimatePresence } from "framer-motion";

interface Item {
  title: string;
  link: string;
  date?: string;
}

const Home = () => {
  const [value, setValue] = useState(0);
  const [noticeData, setNoticeData] = useState<Item[] | null>(null);
  const [eventsData, setEventsData] = useState<Item[] | null>(null);
  const [newsData, setNewsData] = useState<Item[] | null>(null);
  const [achievementsData, setAchievementsData] = useState<Item[] | null>(null);
  const [loading, setLoading] = useState(true);

  const tabContent = [
    { label: "News", data: newsData, link: "/news" },
    { label: "Events", data: eventsData, link: "/events" },
    { label: "Notices", data: noticeData, link: "/general" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [achRes, newsRes, eventsRes, noticeRes] = await Promise.all([
          fetch("/json/achievements.json").then(res => res.json()),
          fetch("/json/news.json").then(res => res.json()),
          fetch("/json/events.json").then(res => res.json()),
          fetch("/json/notices.json").then(res => res.json()),
        ]);

        setAchievementsData(sortData(achRes.data));
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

  const sortData = (data: Item[]) => {
    if (!data) return [];

    const validItems = data.filter((x) => x.date);
    const invalidItems = data.filter((x) => !x.date);

    return [
      ...validItems.sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()),
      ...invalidItems,
    ];
  };

  const a11yProps = (index: number) => ({
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  });

  return (
    <div className="page-container">
      <div className="container">
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
          <Paper elevation={3} className="tabbedPane">
            <Tabs
              value={value}
              onChange={(_, newValue) => setValue(newValue)}
              aria-label="news events notices" role="navigation"
            >
              {tabContent.map((tab, index) => (
                <Tab key={index} label={tab.label} {...a11yProps(index)} />
              ))}
            </Tabs>

            {/* Smooth Transition Between Tabs */}
            <AnimatePresence mode="wait">
              <motion.div
                key={value}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                aria-labelledby={`simple-tab-${value}`}
                role="tabpanel"
                id={`simple-tabpanel-${value}`}
              >
                {loading ? (
                  <Loader />
                ) : tabContent[value].data && tabContent[value].data.length > 0 ? (
                  <PaperCard
                    title={tabContent[value].label}
                    items={tabContent[value].data.slice(0, 5)}
                    linkToOlder={tabContent[value].link}
                  />
                ) : (
                  <p className="text-center p-4">No {tabContent[value].label} available.</p>
                )}
              </motion.div>
            </AnimatePresence>
          </Paper>

          {/* Achievements Section */}
          <Paper elevation={3} className="achievements">
            {loading ? (
              <Loader />
            ) : achievementsData && achievementsData.length > 0 ? (
              <PaperCard
                title="Achievements"
                items={achievementsData.slice(0, 5)}
                linkToOlder="/achievements"
              />
            ) : (
              <p className="text-center p-4">No Achievements available.</p>
            )}
          </Paper>

          {/* Twitter Timeline */}
          <TwitterTimeline />
        </div>
      </div>
    </div>
  );
};

export default Home;
