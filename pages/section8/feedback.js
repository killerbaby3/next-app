import { Fragment, useState } from "react";
import { buildFeedbackPath,extrackFeedback } from "../api/feedback/index";
export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extrackFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState({});
  function loadFeedbackHandler(id) {
    fetch("/api/feedback/" + id)
      .then((res) => res.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email} - {feedbackData.text}</p>}
      <ul>
        {props.feedbackItems.map((f) => (
          <li key={f.id}>
            {f.email} - {f.text}{" "}
            <button onClick={loadFeedbackHandler.bind(null, f.id)}>
              Show detail
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
