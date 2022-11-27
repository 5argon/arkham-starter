/**
 * Minimal data about all the campaign cards.
 * - Only cards that can go into player deck.
 * - Only for translating ID to readable name. No card text information.
 */
export type CampaignDatabase = CampaignDatabaseItem[];

export interface CampaignDatabaseItem {
  id: string;
  name: string;
}
