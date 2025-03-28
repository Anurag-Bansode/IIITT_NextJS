"use client";

import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
  }
}

const TwitterTimeline = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!window.twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => {
          if (window.twttr) {
            window.twttr.widgets.load();
            setLoading(false); // Twitter widget has loaded
          }
        };
        document.body.appendChild(script);
      } else {
        window.twttr.widgets.load();
        setLoading(false);
      }
    }
  }, []);

  return (
    <Paper elevation={3} className="twittertimeline" id="twitter_timeline" style={{ minHeight: "680px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <a
          className="twitter-timeline"
          data-width="576"
          data-height="680"
          href="https://twitter.com/iiittrichy"
        >
          Tweets by IIIT Trichy
        </a>
      )}
    </Paper>
  );
};

export default TwitterTimeline;
