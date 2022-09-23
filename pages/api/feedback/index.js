import fs from "fs";
import path from "path";
export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}
export function extrackFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}
export default function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.text;
    const newFeedback = {
      email: email,
      text: feedbackText,
      id: new Date().toISOString(),
    };
    const filePath = buildFeedbackPath();
    const data = extrackFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({
      message: "successssss !",
      feedback: data,
    });
  } else {
    const filePath = buildFeedbackPath();
    const data = extrackFeedback(filePath);
    res.status(200).json({
      message: "ok nhaaa",
      feedback: data,
    });
  }
}
