"use client";

import { useEffect, useState } from "react";
import PaperCard from "@/components/PaperCard/PaperCard";
import MainCarousel from "@/components/Carousel/MainCarousel";
import MissionVision from "@/components/mission_vision/missionVision";
import Marquee from "@/components/marquee/marquee";
import { Paper, Tabs, Tab } from "@mui/material";
import Loader from "@/components/sub_component_loader/sub_component_loader";
import carouselData from "../../public/json/homeCarousel.json";
import TwitterTimeline from "@/components/PaperCard/twitterTimeline";
import "./globals.css";
interface Item {
  title: string;
  link: string;
  date?: string;
}

const Home = () => {
  const [value, setValue] = useState(0);
  const [noticeData, setNoticeData] = useState<Item[] | undefined>();
  const [eventsData, setEventsData] = useState<Item[] | undefined>();
  const [newsData, setNewsData] = useState<Item[] | undefined>();
  const [achievementsData, setAchievementsData] = useState<
    Item[] | undefined
  >();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [achRes, newsRes, eventsRes, noticeRes] = await Promise.all([
          fetch("/json/achievements.json"),
          fetch("/json/news.json"),
          fetch("/json/events.json"),
          fetch("/json/notices.json"),
        ]);

        const [achData, newsData, eventsData, noticeData] = await Promise.all([
          achRes.json(),
          newsRes.json(),
          eventsRes.json(),
          noticeRes.json(),
        ]);

        setAchievementsData(achData.data);
        setNewsData(sortData(newsData.data));
        setEventsData(sortData(eventsData.data));
        setNoticeData(sortData(noticeData.data));
      } catch (error) {
        console.error("Error loading JSON data:", error);
      }
    };

    fetchData();
  }, []);

  // Sorting helper function (newest first)
  const sortData = (data: Item[]) => {
    const older = data
      .filter((x) => !x.date)
      .sort(
        (a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()
      );
    const newer = data
      .filter((x) => x.date)
      .sort(
        (a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()
      );
    return [...newer, ...older];
  };

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
          <Paper elevation={3} className="tabbedPane" id="news_event_notice">
            <Tabs
              value={value}
              onChange={(_, newValue) => setValue(newValue)}
              aria-label="news events notices"
            >
              <Tab label="News" />
              <Tab label="Events" />
              <Tab label="Notices" />
            </Tabs>

            {/* Dynamic Tab Content */}
            {value === 0 &&
              (newsData ? (
                <PaperCard
                  title="News"
                  items={newsData.slice(0, 5)}
                  linkToOlder="/news"
                />
              ) : (
                <Loader />
              ))}
            {value === 1 &&
              (eventsData ? (
                <PaperCard
                  title="Events"
                  items={eventsData.slice(0, 5)}
                  linkToOlder="/events"
                />
              ) : (
                <Loader />
              ))}
            {value === 2 &&
              (noticeData ? (
                <PaperCard
                  title="Notices"
                  items={noticeData.slice(0, 5)}
                  linkToOlder="/general"
                />
              ) : (
                <Loader />
              ))}
          </Paper>

          {/* Achievements Section */}
          <Paper elevation={3} className="achievements">
            {achievementsData ? (
              <PaperCard
                title="Achievements"
                items={achievementsData.slice(0, 5)}
                linkToOlder="/achievements"
              />
            ) : (
              <Loader />
            )}
          </Paper>

          {/* Twitter Timeline */}
          <TwitterTimeline></TwitterTimeline>
        </div>
      </div>
    </div>
  );
};

export default Home;
