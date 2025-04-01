import React, { useState } from "react";
import styles from "./ClubCard.module.css";

interface ClubCardProps {
  club: {
    name: string;
    motto: string;
    facultyIncharge: string;
    coordinator: { name: string }[];
  };
}

const ClubCard: React.FC<ClubCardProps> = ({ club }) => {
  const [selectedTab, setSelectedTab] = useState<"about us" | "coordinator">(
    "about us"
  );
  return (
    <div className={styles.parent}>
      <div className={styles.imageWrapper}>
        <div className={styles.imagecontainer}></div>
      </div>
      <div className={styles.clubName}>{club.name}</div>

      <div className={styles.clubContent}>
        {selectedTab === "about us" ? (
          <div className={styles.clubMotto}>{club.motto}</div>
        ) : (
          <ul className="clubCoordinator">
            {club.coordinator.map((student, idx) => (
              <li key={idx}>{student.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="btn">
        <button
          className={selectedTab === "about us" ? "active" : ""}
          onClick={() => setSelectedTab("about us")}
        >
          About
        </button>
        <button
          className={selectedTab === "coordinator" ? "active" : ""}
          onClick={() => setSelectedTab("coordinator")}
        >
          Coordinator
        </button>
      </div>
    </div>
  );
};

export default ClubCard;
