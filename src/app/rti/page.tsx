"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  Typography,
  Box,
  CardMedia,
  CardContent,
} from "@mui/material";
import styles from "./rti.module.css";
import nextConfig from "../../../next.config";
interface RTI {
  head: string;
  name: string;
  designation: string;
  emailID: string;
  phone?: string;
  fax?: string;
  src: string;
  cls?: string;
}

export default function RTI() {
  const [rti, setRti] = useState<RTI[] | null>(null);

  useEffect(() => {
    document.title = "RTI";
    return () => {
      document.title = "IIIT Trichy";
    };
  }, []);

  useEffect(() => {
    const fetchRTIData = async () => {
      try {
        const response = await fetch("/json/committee/members/rti.json");
        const data = await response.json();
        setRti(data.data);
      } catch (error) {
        console.error("Error fetching RTI data:", error);
      }
    };

    fetchRTIData();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Typography variant="h2" component="h2" gutterBottom className={styles.heading}>
        <Box component="span" fontWeight={380} paddingTop={"2rem"}>
          RTI
        </Box>
      </Typography>
      <div className={styles.head}>
        {rti &&
          rti.map((item, index) => (
            <div key={index} className={styles.rti}>
              <Typography variant="h3" className={styles.themeText}>
                {item.head}
              </Typography>
              <Card className={styles.card}>
                <CardMedia>
                  <Image
                    src={`${nextConfig.env?.IMAGE}/${item.src}`}
                    alt={item.name}
                    width={200}
                    height={250}
                    className={styles.media}
                  />
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" gutterBottom className={styles.info}>
                    {item.name}
                  </Typography>
                  <Typography className={item.cls}>
                    <Box fontSize="1.3rem">{item.designation}</Box>
                    <br />
                    <a href={`mailto:${item.emailID}`}>{item.emailID}</a>
                    <br />
                    {item.fax && <a href={`fax:${item.fax}`}>{item.fax}</a>}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}
