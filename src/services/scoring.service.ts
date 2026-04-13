// services/scoring.service.ts
export const calculateScore = (contact: any): number => {
  let score = 0;

  if (contact.phone) score += 30;
  if (contact.service === "installation") score += 40;
  if (contact.message.length > 20) score += 20;

  return score;
};