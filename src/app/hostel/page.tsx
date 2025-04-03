"use client";;
import { CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useCallback, useEffect, useState } from "react";
import nextConfig from "../../../next.config";
import styles from "./hostel.module.css";

import PersonCard from "@/components/PersonCard/PersonCard";
import TableComponent from "@/components/tablecomponent/tablecomponent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

interface hosteldata {
  title: string;
  desc: string;
  Hostelsrc: string;
  Warden: string;
  RoomNo: string;
  Department: string;
  emailId: string;
  WardenImage: string;
}
interface mess extends hosteldata {
  MessTimings: {
    Breakfast: string;
    Lunch: string;
    Snacks: string;
    Dinner: string;
  };
}
interface FormData {
  title: string;
  link: string;
}

export default function Hostel() {
  const [hostelinfo, setHostelData] = useState<hosteldata[] | null>(null);
  const [forms, setForms] = useState<FormData[] | null>(null);
  const [fromloading, setLoading] = useState<boolean>(true);
  const [mess, setMessData] = useState<mess[] | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [formresponse, response] = await Promise.allSettled([
        fetch("/json/students/hostelforms.json"),
        fetch("/json/students/hostels.json"),
      ]);
      if (response.status === "fulfilled") {
        const hstl = await response.value.json();
        console.info(hstl.Mess.info);
        setHostelData(hstl.Hostel);
        setMessData(hstl.Mess);
      }

      if (formresponse.status === "fulfilled") {
        const meetingsJson = await formresponse.value.json();
        setForms(meetingsJson);
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
      <div className={styles.title}><Typography variant="h2">Residence Hall</Typography></div>

      <div className={styles.cardContainer}>

        {hostelinfo?.map((hInfo, index) => (
          <Grid key={index} size={10}>
            <Card >
              <CardMedia
                sx={{ minHeight: 350 }}
                image={`${nextConfig.env?.DOCUMENT}${hInfo.Hostelsrc}`}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                ></Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {hInfo.desc}
                </Typography>
                <Typography sx={{ mx: 'auto', my: 'auto' }} variant="h6"> Chief Warden</Typography>
                <PersonCard name={hInfo.Warden} src={hInfo.WardenImage} Room={hInfo.RoomNo} src_type="Warden" dept={hInfo.Department} emailID={hInfo.emailId} designation="">
                </PersonCard>
              </CardContent>
            </Card>
          </Grid>
        ))}

      </div>
      <Grid size={1} />
      <div className={styles.title}><Typography variant="h2">Mess Hall</Typography></div>
      <Grid size={1} />
      <div className={styles.cardContainer}>
        {mess?.map((hInfo, index) => (
          <Grid key={index} size={10}>
            <Card className="cardContainer">
              <CardMedia
                sx={{ height: 350 }}
                image={`${nextConfig.env?.DOCUMENT}${hInfo.Hostelsrc}`}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                ></Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {hInfo.desc}
                </Typography>
                {
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Breakfast: {hInfo.MessTimings.Breakfast}
                  </Typography>
                }
                {
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Lunch: {hInfo.MessTimings.Lunch}
                  </Typography>
                }
                {
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Snack: {hInfo.MessTimings.Snacks}
                  </Typography>
                }
                {
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Dinner: {hInfo.MessTimings.Dinner}
                  </Typography>
                }
                <PersonCard name={hInfo.Warden} src={hInfo.WardenImage} Room={hInfo.RoomNo} src_type="Warden" dept={hInfo.Department} emailID={hInfo.emailId} designation="" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </div>
      <Grid size={1} />
      {fromloading ? (
        <CircularProgress />
      ) : forms && forms.length > 0 ? (
        <TableComponent
          title="Hostel Forms"
          loading={fromloading}
          columns={[]}
          isMeetingTable={true}
          members={forms}
        ></TableComponent>
      ) : (
        <Typography variant="body1" color="error">
          No forms available.
        </Typography>
      )}

    </div>
  );
}
