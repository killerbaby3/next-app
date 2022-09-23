import { useRef, useState } from "react";

export default function Homepage() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailRef = useRef();
  const feedbackRef = useRef();
  function submitForm(e) {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredFeedback = feedbackRef.current.value;
    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
      });
  }

  function loadFeedbackHandler(e) {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
      });
  }
  return (
    <div>
      <h1>Home - section 8</h1>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="email">Yorm Email Address</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Yorm feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackRef}></textarea>
        </div>
        <button>Send feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load feedback</button>
      <ul>
        {feedbackItems.map((f) => (
            <li key={f.id}>{f.email} - {f.text}</li>
        ))}
      </ul>
    </div>
  );
}
