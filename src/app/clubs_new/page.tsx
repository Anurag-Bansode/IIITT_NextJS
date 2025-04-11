"use client";
import React, { useEffect, useState } from "react";
import styles from "./clubs.module.css";
import ClubCard from "@/components/ClubCard/ClubCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

// Define the Club interface
interface Club {
  name: string;
  motto: string;
  facultyIncharge: string;
  coordinator: { name: string }[];
}

const Clubs: React.FC = () => {
  const [clubs, setClubsData] = useState<Club[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Clubs";
    return () => {
      document.title = "IIIT Trichy";
    };
  }, []);

  useEffect(() => {
    fetch("/json/general/clubs.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch clubs data");
        }
        return response.json();
      })
      .then((data) => {
        setClubsData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching clubs data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.facultyContainer}>
      <h2 className={styles.heading}>Student Clubs</h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 250,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className={styles.swiperContainer}
      >
        {clubs?.map((club, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <ClubCard club={club} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Clubs;
