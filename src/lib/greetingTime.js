const getGreetingTime = () => {
  const currentHour = new Date().getHours();

  const splitAfternoon = 12; // 24hr time to split the afternoon
  const splitEvening = 17; // 24hr time to split the evening

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    // Between 12 PM and 5PM
    return "Good afternoon";
  } else if (currentHour >= splitEvening) {
    // Between 5PM and Midnight
    return "Good evening";
  }
  // Between dawn and noon
  return "Good morning";
};

export default getGreetingTime;
