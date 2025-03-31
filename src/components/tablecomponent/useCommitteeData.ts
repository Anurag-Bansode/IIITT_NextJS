import { useState, useEffect, useCallback } from "react";

interface Member {
  name: string;
  designation: string;
  role?: string;
  senate?: string;
}

interface Meeting {
  title: string;
  description: string;
  url: string;
}

export const useCommitteeData = (committee: string) => {
  const [members, setMembers] = useState<Member[] | null>(null);
  const [meetings, setMeetings] = useState<Meeting[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMeetingJsonAvailable, setIsMeetingJsonAvailable] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [membersResponse, meetingsResponse] = await Promise.allSettled([
        fetch(`/json/committee/members/${committee}.json`),
        fetch(`/json/committee/meetings/${committee}_meeting.json`),
      ]);

      if (membersResponse.status === "fulfilled") {
        const membersJson = await membersResponse.value.json();
        setMembers(membersJson.data as Member[]); 
      }

      if (meetingsResponse.status === "fulfilled") {
        debugger;
        const meetingsJson = await meetingsResponse.value.json();

        setMeetings(
          Object.entries(meetingsJson).map(([title, details]) => ({
            title,
            description: (details as { description: string }).description,
            url: (details as { url: string }).url,
          }))
        );
      } else {
        setIsMeetingJsonAvailable(false);
      }
    } catch (error) {
      console.error(`Error fetching ${committee} data:`, error);
    }
    setLoading(false);
  }, [committee]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { members, meetings, loading, isMeetingJsonAvailable };
};
