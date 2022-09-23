import { buildFeedbackPath,extrackFeedback } from "../api/feedback/index";

export default function handler(req, res) {
  const fId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const data = extrackFeedback(filePath);
  const selectedFeedback = data.find((f) => f.id === fId);
  
  return res.status(200).json({
    feedback : selectedFeedback
  })
}
