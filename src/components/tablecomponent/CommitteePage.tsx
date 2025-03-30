"use client";
import React from "react";
import { Typography, Skeleton } from "@mui/material";
import { useCommitteeData } from "./useCommitteeData";
import TableComponent from "./tablecomponent";
import styles from "./committee.module.css";

export default function CommitteePage({ committee }: { committee: string }) {
  const { members, meetings, loading, isMeetingJsonAvailable } = useCommitteeData(committee);

  const columnMapping: Record<string, string[]> = {
    senate: ["Name", "Designation", "Senate"],
    bog: ["Name", "Designation", "Role"],
    bwc: ["Name", "Designation", "Role"],
    pio:["Name","Designation","Role"]
  };

  return (
    <div className={styles.pageContainer}>
      <Typography variant="h2" className={styles.themeText}>
        {committee.toUpperCase().replace("_", " ")}
      </Typography>

      <TableComponent title={`Members of ${committee.toUpperCase()}`} members={members || []} columns={columnMapping[committee]} loading={loading} />

      {isMeetingJsonAvailable && (
        <>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={100} />
          ) : (
            meetings && (
              <TableComponent title={`${committee.toUpperCase()} Minutes `} members={meetings} columns={["Title", "Description"]} loading={loading} isMeetingTable />
            )
          )}
        </>
      )}
    </div>
  );
}
