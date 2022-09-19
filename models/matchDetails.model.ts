export interface TeamDetailsIF {
  team1Users: any[];
  team2Users: any[];
  totalAmount: number;
  team1TotalAmount: number;
  team2TotalAmount: number;
}
export interface TeamDetailsProgressIF {
  team: number;
  label: string;
  data: TeamDetailsIF;
}
export interface MatchDetailsIF {
  team1: string;
  team2: string;
  status: string;
  won: string;
}
export interface ParticipantsCardIF {
  team: number;
  cardData: any;
  data: TeamDetailsIF;
  matchDetails: MatchDetailsIF;
}
