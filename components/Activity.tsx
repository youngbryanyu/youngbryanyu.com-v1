var polyline = require("@mapbox/polyline");

export type ActivityType = {
  id: number;
  name: string;
  start_date: string;
  moving_time: number;
  sport_type: "Swim" | "Run" | "Bike" | "Hike" | "TrailRun" | "VirtualRide" | "Snowboard";
  distance: number;
  average_speed: number;
  visibility: "everyone" | "followers" | "me";
  map: {
    summary_polyline: string;
  };
  total_photo_count: number;
  photos: {
    primary: {
      urls: Array<any>;
    };
  };
};

const getSpeedForSportType = (
  speed: number,
  sportType: ActivityType["sport_type"],
  custom?: string
) => {
  switch (sportType) {
    case "Swim":
      return {
        name: "Per 100m",
        // m/s to min/100m
        value: custom,
      };
    case "Run":
    case "TrailRun":
      const pace = 1 / (speed * 0.06);
      return {
        name: "Per km",
        // m/s to min/km
        value: `${Math.floor(pace)}’${Math.floor((pace % 1) * 60)}”`,
      };
    default:
      return {
        name: "Km/h",
        // m/s to km/h
        value: `${(speed * 3.6).toFixed(1)}`,
      };
  }
};

const getFormattedStats = (activity: ActivityType) => {
  // Calculate swim pace
  // TODO: Move inside getSpeedForSportType calculating from activity.average_speed
  const paceInSeconds = (activity.moving_time / activity.distance) * 100;
  const minutes = Math.floor(paceInSeconds / 60);
  const seconds = String(Math.round(paceInSeconds - minutes * 60)).padStart(
    2,
    "0"
  );
  const swimPace = `${minutes}:${seconds}/100m`;

  const { distance } = activity;
  return [
    {
      name: "Distance",
      value:
        distance < 1000
          ? `${distance} m`
          : `${(distance / 1000).toFixed(2)} km`,
    },
    getSpeedForSportType(activity.average_speed, activity.sport_type, swimPace),
    {
      name: "Duration",
      value: new Date(activity.moving_time * 1000)
        .toISOString()
        .substring(14, 19),
    },
  ];
};

function isThisSeason(date: Date, yearOffset: number = 0) {
  return (
    (date.getFullYear() === new Date().getFullYear() - yearOffset && date.getMonth() <= 3) ||
    (date.getFullYear() === new Date().getFullYear() - yearOffset - 1 && date.getMonth() >= 10)
  );
}

function getSeasonName(isLast: boolean) {
  // get last two digits of year
  const last2Year = (new Date().getFullYear() - 2).toString().slice(-2);
  const lastYear = (new Date().getFullYear() - 1).toString().slice(-2);
  const thisYear = new Date().getFullYear().toString().slice(-2);
  const nextYear = (new Date().getFullYear() + 1).toString().slice(-2);
  const thisMonth = new Date().getMonth();
  if (thisMonth <= 5) {
    // we are in the spring
    if (isLast) {
      return `${last2Year}/${lastYear}`;
    } else {
      return `${lastYear}/${thisYear}`;
    }
  } else {
    // we are in the fall
    if (isLast) {
      return `${lastYear}/${thisYear}`;
    } else {
      return `${thisYear}/${nextYear}`;
    }
  }
}

function getFormattedSnowboardSeasonStats(activities: ActivityType[]) {
  // keep snowboard activities, only in this season (last November to this April)
  let isLast = false;
  let snowboardActivities = activities.filter(
    (activity) =>
      activity.sport_type === "Snowboard" && isThisSeason(new Date(activity.start_date))
  );
  if (snowboardActivities.length === 0) {
    isLast = true;
    snowboardActivities = activities.filter(
      (activity) =>
        activity.sport_type === "Snowboard" && isThisSeason(new Date(activity.start_date), 1)
    );
  }
  const currentSeason = getSeasonName(isLast);
  // total time (in seconds)
  const totalTime = snowboardActivities.reduce(
    (total, activity) => total + activity.moving_time,
    0
  );
  // total days (number of unique start days)
  const totalDays = new Set(
    snowboardActivities.map((activity) => activity.start_date.split("T")[0])
  ).size;
  // distance (in meters)
  const totalDistance = snowboardActivities.reduce(
    (total, activity) => total + activity.distance,
    0
  );
  return [
    {
      name: "Season",
      value: currentSeason,
    },
    {
      name: "Total Distance",
      value:
      totalDistance < 1000
          ? `${totalDistance} m`
          : `${(totalDistance / 1000).toFixed(2)} km`,
    },
    {
      name: "Days",
      value: totalDays
    },
    {
      name: "Duration",
      value: `${(totalTime / 3600).toFixed(2)} h`
    },
  ];
}

export function SnowboardActivity({ activities }: { activities: ActivityType[] }) {
  const stats = getFormattedSnowboardSeasonStats(activities);

  return (
    <div className="absolute inset-0 flex flex-col justify-between">
      <header></header>

      <div className="absolute bottom-0 right-0 w-full h-full radial-fade" />
      <footer className="flex flex-col justify-center items-end gap-1 px-3 pb-3.5 z-10">
        {stats.map((stat) => (
          <div
            className="flex flex-col gap-0 text-right text-white"
            key={stat.name}
          >
            <p className="text-lg">{stat.value}</p>
            <p className="text-[11px] leading-none font-mono font-semibold opacity-70">
              {stat.name}
            </p>
          </div>
        ))}
      </footer>
    </div>
  );
}


export default function Activity({ activity }: { activity: ActivityType }) {
  const stats = getFormattedStats(activity);
  const geoJson = polyline.toGeoJSON(activity.map.summary_polyline);

  var padding = 20;
  var width = 800;
  var height = 600;

  return (
    <div className="absolute inset-0 flex flex-col justify-between">
      <header></header>

      <div className="absolute bottom-0 right-0 w-full h-full radial-fade" />
      <footer className="flex flex-col justify-center items-end gap-1 px-3 pb-3.5 z-10">
        {stats.map((stat) => (
          <div
            className="flex flex-col gap-0 text-right text-white"
            key={stat.name}
          >
            <p className="text-lg">{stat.value}</p>
            <p className="text-[11px] leading-none font-mono font-semibold opacity-70">
              {stat.name}
            </p>
          </div>
        ))}
      </footer>
    </div>
  );
}
