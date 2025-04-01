"use client";
import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import styles from "./departments.module.css";
import nextConfig from "../../../next.config";
import Image from "next/image";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import MainCarousel from "@/components/Carousel/MainCarousel";
interface festivals {
  name: string;
  description: string;
  links: [
    {
      name: string;
      url: string;
      download: boolean;
    }
  ];
  images: [
    {
      name: string;
      path: string;
    }
  ];
}

const festivals: React.FC = () => {
  const [festivals, setDepts] = useState<festivals[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Festivals";
    return () => {
      document.title = "IIIT Trichy";
    };
  }, []);

  useEffect(() => {
    fetch("/json/events/festivals.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch departments data");
        }
        return response.json();
      })
      .then((data) => {
        setDepts(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching department data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container">
      <Grid container className={styles.container}>
        <Grid size={1} />
        <Grid size={10}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            className={styles.themeText}
          >
            <Box component="span" fontWeight={380}>
              festivals
            </Box>
          </Typography>
          {festivals &&
            festivals.map((festival, index) => (
              <Grid size={12} key={index}>
                <div
                  className={styles.card}
                  style={{
                    marginTop: "3px",
                    animationDelay: `${index * 0.2}s`,
                  }}
                  //onClick={() => router.push(festival.url)}  Redirect on click
                >
                  <Typography
                    variant="h5"
                    className={styles.themeText}
                    gutterBottom
                  >
                    <Box component="span" fontWeight="fontWeightBold">
                      {festival.name}
                    </Box>
                  </Typography>
                  <Box component="p" className={styles.festivalDesc}>
                    {festival.description}
                  </Box>

                  {festival.links &&
                    festival.links.map((link, index) => (
                      <Box component="p" className={styles.festival} key={index}>
                        <a
                          href={`${nextConfig.env?.DOCUMENT}/${link.url}`}
                          download={link.download}
                          className={styles.link}
                        >
                          <CloudDownloadIcon
                            className={styles.download}
                            style={{
                              marginRight: "5px",
                              verticalAlign: "middle",
                            }}
                          />
                          {link.name}
                        </a>
                      </Box>
                    ))}
                  <MainCarousel images={festival.images}/>
                </div>
              </Grid>
            ))}
        </Grid>
        <Grid size={1} />
      </Grid>
    </div>
  );
};

export default festivals;
