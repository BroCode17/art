
export const dateFormatter = (isoDate: Date) => {
      const date = new Date(isoDate);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    };

   return(date.toLocaleString("en-US", options));
  }
