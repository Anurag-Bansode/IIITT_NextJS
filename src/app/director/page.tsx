"use client";

import { useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import { Card, Typography, CardContent } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import nextConfig from "../../../next.config";
import styles from "./Director.module.css";

export default function Director() {
  useEffect(() => {
    document.title = "Administration";
    return () => {
      document.title = "IIIT Trichy";
    };
  }, []);

  return (
    <>
      <Head>
        <title>Administration - IIIT Trichy</title>
        <meta name="description" content="Director's profile at IIIT Tiruchirappalli." />
      </Head>
      <div className={styles.pageContainer}>
        <Card className={styles.styledCard}>
          <div className={styles.imageContainer}>
            <Image
              src={`${nextConfig.env?.IMAGE}/ushanatesan.jpg`}
              alt="Director"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Prof. Usha Natesan
            </Typography>
            <Typography variant="subtitle1">Director, IIIT Tiruchirappalli</Typography>
            <br />
            <a href="mailto:director@iiitt.ac.in" className={styles.linkStyle}>
              <ContactMailIcon /> director@iiitt.ac.in
            </a>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
