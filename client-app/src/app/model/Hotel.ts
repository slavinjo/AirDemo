export interface Hotel {
  id: string,
  name: string,
  stars: number,
  description: string,
  available: boolean,
  cheapestOfferPrice: string;
  cheapestOfferCurrency: string;
}