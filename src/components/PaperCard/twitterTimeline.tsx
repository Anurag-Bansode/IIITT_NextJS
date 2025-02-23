"use client";

import { useEffect } from "react";
import Paper from "@mui/material/Paper";
const TwitterTimeline = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load Twitter widgets.js script
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <Paper elevation={3} className="twittertimeline" id="twitter_timeline">
      <a
        className="twitter-timeline"
        data-width="576"
        data-height="680"
        href="https://twitter.com/iiittrichy"
      >
        Tweets by IIIT Trichy
      </a>
    </Paper>
  );
};

export default TwitterTimeline;
