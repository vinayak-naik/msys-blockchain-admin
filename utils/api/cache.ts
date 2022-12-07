const USER_APP_URL = process.env.NEXT_PUBLIC_USER_PANEL_URL || "";

export const callSetMatchesApi = () => {
  console.log("setMatches api is calling");
  fetch(`${USER_APP_URL}/api/betting/set-matches`);
};
export const callSetMatchApi = (matchId: any) => {
  console.log("setMatch api is calling");
  fetch(`${USER_APP_URL}/api/betting/set-match/${matchId}`);
};

export const callSetLotteriesApi = () => {
  console.log("setLotteries api is calling");
  fetch(`${USER_APP_URL}/api/lottery/set-lotteries`);
};
export const callSetLotteryApi = (lotteryId: any) => {
  console.log("setLottery api is calling");
  fetch(`${USER_APP_URL}/api/lottery/set-lottery/${lotteryId}`);
};