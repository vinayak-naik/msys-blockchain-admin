export const compressAddress = (address: string) => {
  const a = address.split("");
  const shortAddress = [
    a[0],
    a[1],
    a[2],
    a[3],
    a[4],
    " ",
    ".",
    " ",
    ".",
    " ",
    ".",
    " ",
    a[a.length - 5],
    a[a.length - 4],
    a[a.length - 3],
    a[a.length - 2],
    a[a.length - 1],
  ]
    .join("")
    .toString();
  return shortAddress;
};

export const convertStatus = (statusCode: number) => {
  const code = statusCode.toString();
  if (code === "3") {
    return "Completed";
  } else if (code === "2") {
    return "Active";
  } else if (code === "1") {
    return "Pending";
  } else if (code === "4") {
    return "Disabled";
  } else {
    return "Somthing went wrong";
  }
};
export const convertTimestampToDate = (timestamp: number) => {
  const todate = new Date(Number(timestamp) * 1000).getDate();
  const tomonth = new Date(Number(timestamp) * 1000).getMonth() + 1;
  const toyear = new Date(Number(timestamp) * 1000).getFullYear();
  return `${todate}/${tomonth}/${toyear}`;
};
export const convertTimestampToTime = (timestamp: number) => {
  const toHour = new Date(Number(timestamp) * 1000).getHours();
  const toMinute = new Date(Number(timestamp) * 1000).getMinutes();
  // const toSeconds = new Date(Number(timestamp) * 1000).getSeconds();
  return `${toHour}:${toMinute < 10 ? "0" + toMinute : toMinute}`;
};
