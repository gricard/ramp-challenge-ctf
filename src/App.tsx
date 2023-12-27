import "./styles.css";
import { CaptureTheFlag } from "./CaptureTheFlag";
// import { StepTwo } from "./StepTwo";
// import html from "./challenge.html"; // avoid running up their AWS bill

// the code I used to derive this url is in StepTwo.tsx
const STEP_TWO_URL =
  "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/646973";

export default function App() {
  // return <StepTwo data={html} />

  return (
    <div className="App">
      <CaptureTheFlag url={STEP_TWO_URL} />
    </div>
  );
}
