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

interface TwitterTimelineProps {
  username: string;
  theme?: "light" | "dark"; // Allow theme customization
}

const TwitterTimeline: React.FC<TwitterTimelineProps> = ({ username, theme = "light" }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => {
        if (window.twttr) {
          window.twttr.widgets.load();
          setLoading(false);
        } else {
          setError(true);
        }
      };
      script.onerror = () => setError(true);
      document.body.appendChild(script);
    } else if (window.twttr) {
      window.twttr.widgets.load();
      setLoading(false);
    }
  }, [username]);

  return (
    <Paper
      elevation={3}
      className="w-full twittertimeline"
      id="twitter_timeline"
      style={{
        width: "100%",
        minHeight: "680px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {error ? (
        <p>Failed to load tweets. Try refreshing the page.</p>
      ) : loading ? (
        <CircularProgress />
      ) : (
        <a
          className="twitter-timeline"
          data-width="100%"
          data-height="680"
          data-theme={theme}
          data-tweet-limit="5"
          href={`https://twitter.com/${username}`}
        >
          Tweets by @{username}
        </a>
      )}
    </Paper>
  );
};

export default TwitterTimeline;
