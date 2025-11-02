import {
  useState,
  useEffect,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
  type FormEvent,
} from "react";
import { useLocation } from "react-router-dom";
import "./Verification.css";

function Verification() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(59);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const location = useLocation();
  const email = location.state?.email || "";

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (index < otp.length - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length !== 4) {
      setMessage("⚠️ Please enter all 4 digits");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/verify/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message || "Verification failed");

      setMessage("Verified successfully!");
      console.log("Token:", data.token);
      localStorage.setItem("token", data.token);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed';
      setMessage(`${errorMessage}`);
    }
  };

  const handleResend = () => {
    setTimer(59);
    setCanResend(false);
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
    setMessage("");
  };

  return (
    <>
      {/* <div className="verification-card"> */}
        <h2 className="verification-title">Verification</h2>
        <p className="verification-subtitle">We've sent you the verification code on your email: {email}</p>

        <form onSubmit={handleContinue}>
          <div className="otp-row">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="otp-input"
              />
            ))}
          </div>
          <button type="submit" className="btn-continue">
            Continue
          </button>
        </form>

        <div className="resend-row">
          {canResend ? (
            <button
              className="resend-button"
              onClick={handleResend}
              type="button"
            >
              Re-send code
            </button>
          ) : (
            <span>
              Re-send code in{" "}
              <span className="timer">{`0:${timer
                .toString()
                .padStart(2, "0")}`}</span>
            </span>
          )}
        </div>

        <div className="helper-text">{message}</div>
      {/* </div> */}
    </>
  );
}

export default Verification;
