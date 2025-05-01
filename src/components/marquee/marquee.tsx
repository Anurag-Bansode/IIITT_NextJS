"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CircularProgress, Divider, Link } from "@mui/material";
import "./marquee.css";
import nextConfig from "../../../next.config";

interface Announcement {
  text: string;
  link: string;
}

const Marquee = ({ src = "/general/announcements.json" }: { src?: string }) => {
  const [announcements, setAnnouncements] = useState<Announcement[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/json/${src}`);
        const data = await res.json();
        setAnnouncements(data.data);
      } catch (error) {
        console.error("Error loading announcements:", error);
      }
    };

    fetchData();
  }, [src]);

  return (
    <Card id="v_marquee" variant="outlined">
      <CardContent style={{ height: "100%", overflow: "hidden" }}>
        <div className="newshead">Announcements</div>

        <div className="marquee-container">
          {announcements ? (
            <ul className="marquee-content">
              {announcements.map((item, idx) => (
                <li key={idx} className="marquee-item">
                  {item.link ? (
                    item.link.endsWith('.pdf') ? (
                      <a href={`${nextConfig?.env?.DOCUMENT}${item.link}`} target="_blank" rel="noopener noreferrer">
                        {item.text}
                      </a>
                    ) : (
                      <Link href={item.link}>
                        {item.text}
                      </Link>
                    )
                  ) : (
                    item.text
                  )}

                  {idx !== announcements.length - 1 && <Divider />}
                </li>
              ))}
            </ul>
          ) : (
            <CircularProgress />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Marquee;
