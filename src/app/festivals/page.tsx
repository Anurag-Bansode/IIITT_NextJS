"use client";
import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import styles from "./departments.module.css";
import nextConfig from "../../../next.config";
import Image from "next/image";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import MainCarousel from "@/components/Carousel/MainCarousel";
interface Festival {
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
  const [festivals, setFestivals] = useState<Festival[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Festivals";
    return () => {
      document.title = "IIIT Trichy";
    };
  }, []);

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const response = await fetch("/json/events/festivals.json");
        if (!response.ok) {
          throw new Error("Failed to fetch festivals data");
        }
        const data = await response.json();
        setFestivals(data.data);
      } catch (error) {
        console.error("Error fetching festival data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFestivals();
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
                        href={
                          validURL(link.url)
                            ? link.url
                            : `${nextConfig.env?.IMAGE}/${link.url}`
                        }
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
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

export function validURL(str:string) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);}