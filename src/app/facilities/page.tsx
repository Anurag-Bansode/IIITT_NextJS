"use client";;
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useCallback, useEffect, useState } from "react";
import nextConfig from "../../../next.config";
import styles from "./facilites.module.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";


interface ImageData {
  title: string;
  url: string;
}

export default function Hostel() {
  const [images, setForms] = useState<ImageData[] | null>(null);
  const [fromloading, setLoading] = useState<boolean>(true);
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [formresponse] = await Promise.allSettled([
        fetch("/json/general/facilities.json"),

      ]);

      if (formresponse.status === "fulfilled") {
        const meetingsJson = await formresponse.value.json();
        setForms(meetingsJson.data);
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
      setForms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = "HOSTEL | IIITT";
    fetchData();
    return () => {
      document.title = "IIIT Trichy";
    };
  }, [fetchData]);

  return (
    <div>
      <Grid size={1} />
      <div className={styles.title}><Typography variant="h2">Facilities</Typography></div>

      <div className={styles.cardContainer}>

        {images?.map((hInfo, index) => (
          <Grid key={index} size={10}>
            <CardContent>
              <Typography variant="h6" className={styles.themeText} >{hInfo.title}</Typography>
            </CardContent>
            <Card>
              <CardMedia
                sx={{ minHeight: 350 }}
                image={`${nextConfig.env?.IMAGE}${hInfo.url}`}
              />
              </Card>
          </Grid>
        ))}

      </div>
      <Grid size={1} />


    </div>
  );
}
