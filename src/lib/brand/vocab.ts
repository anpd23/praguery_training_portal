/** Brand Book vocab guardrails for training copy and admin CMS hints. */
export const neverSay = [
  "it's just",
  "just a checklist",
  "just ice cream",
  "just a cone",
  "just a chimney cake",
  "ice cream shop",
  "fast food",
  "quick service",
  "cheap",
  "affordable",
  "budget",
  "discount",
  "sale",
  "deal",
  "pre-made",
  "store-bought",
  "artificial",
  "processed",
  "factory",
  "mass-produced",
] as const;

export const preferSay: Record<string, string> = {
  customers: "guests",
  toppings: "house-made sauces",
  "ice cream shop": "Praguery Cafe / Praguery Ice Cream Truck",
  cafe: "Praguery Cafe",
  store: "Praguery Cafe",
  location: "Praguery Cafe or Praguery Ice Cream Truck",
  chain: "local Vancouver family business",
};

export function findVocabIssues(text: string): string[] {
  const lower = text.toLowerCase();
  return neverSay.filter((phrase) => lower.includes(phrase));
}
