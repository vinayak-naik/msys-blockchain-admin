const USER_APP_URL = process.env.NEXT_PUBLIC_USER_PANEL_URL || "";

export const callSetMatchesApi = () => {
  fetch(`${USER_APP_URL}/api/betting/set-matches`);
};
export const callSetMatchApi = (matchId: any) => {
  fetch(`${USER_APP_URL}/api/betting/set-match/${matchId}`);
};

export const callSetLotteriesApi = () => {
  fetch(`${USER_APP_URL}/api/lottery/set-lotteries`);
};
export const callSetLotteryApi = (lotteryId: any) => {
  fetch(`${USER_APP_URL}/api/lottery/set-lottery/${lotteryId}`);
};
