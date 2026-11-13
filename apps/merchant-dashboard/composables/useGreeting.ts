export function useGreeting() {
  const now = useNow();

  const greetingData = computed(() => {
    const hour = now.value.getHours();
    let greeting = "";
    let emoji = "";

    if (hour >= 5 && hour < 12) {
      greeting = "Good Morning";
      emoji = "👋";
    } else if (hour >= 12 && hour < 17) {
      greeting = "Good Afternoon";
      emoji = "☀️";
    } else if (hour >= 17 && hour < 21) {
      greeting = "Good Evening";
      emoji = "🌆";
    } else {
      greeting = "Good Night";
      emoji = "🌙";
    }

    return { greeting, emoji };
  });

  const currentDate = computed(() => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(now.value);
  });

  const currentTime = useDateFormat(now, 'hh:mm:ss A');
  const timeParts = computed(() => {
    const [time, ampm] = currentTime.value.split(' ');
    const [hour, minute, second] = time.split(':');
    return { hour, minute, second, ampm };
  });

  return {
    greeting: computed(() => greetingData.value.greeting),
    emoji: computed(() => greetingData.value.emoji),
    currentDate,
    currentTime,
    timeParts,
  };
}
