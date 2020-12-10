import axios from "axios";
import moment from "moment";

const latitude = 37.561468;
const longitude = 127.040485;

export default async function () {
  const url = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`;
  const response = await axios.get(url);

  const sunriseTime = moment(
    response.data.results.astronomical_twilight_begin,
    "hh:mm:ss a"
  )
    .add(8, "hour")
    .subtract(5, "minute");

  const sunsetTime = moment(
    response.data.results.astronomical_twilight_end,
    "hh:mm:ss a"
  )
    .add(8, "hour")
    .add(5, "minute");

  const duration = moment.duration(sunriseTime.diff(sunsetTime));

  return {
    sunrise: getScheduleObj(sunriseTime),
    duration: duration.asSeconds(),
  };
}

function getScheduleObj(time) {
  return {
    year: time.year(),
    month: time.month(),
    date: time.date(),
    hour: time.hour(),
    minute: time.minute(),
    second: time.second(),
  };
}
