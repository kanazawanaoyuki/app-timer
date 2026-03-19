"use client";

import { useEffect, useMemo, useState } from "react";

const INITIAL_INPUT_SECONDS = 60;

export default function Timer() {
  const [inputSeconds, setInputSeconds] = useState<number>(INITIAL_INPUT_SECONDS);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(INITIAL_INPUT_SECONDS);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (!isRunning) return;

    const timerId = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(timerId);
          setIsRunning(false);
          setIsFinished(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isRunning]);

  const canStart = useMemo(() => remainingSeconds > 0 && !isRunning, [isRunning, remainingSeconds]);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    if (Number.isNaN(value)) {
      setInputSeconds(0);
      setRemainingSeconds(0);
      setIsFinished(false);
      setIsRunning(false);
      return;
    }

    const normalized = Math.max(0, Math.floor(value));
    setInputSeconds(normalized);
    setRemainingSeconds(normalized);
    setIsFinished(false);
    setIsRunning(false);
  };

  const handleStart = () => {
    if (remainingSeconds <= 0) return;
    setIsFinished(false);
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setRemainingSeconds(inputSeconds);
  };

  return (
    <section className="timer-card" aria-label="timer">
      <h1>タイマー</h1>

      <label htmlFor="seconds" className="input-label">
        秒数を入力
      </label>
      <input
        id="seconds"
        type="number"
        min={0}
        value={inputSeconds}
        onChange={handleChangeInput}
        className="seconds-input"
      />

      <p className="remaining-time">
        残り <strong>{remainingSeconds}</strong> 秒
      </p>

      <div className="button-row">
        <button type="button" onClick={handleStart} disabled={!canStart}>
          スタート
        </button>
        <button type="button" onClick={handleStop} disabled={!isRunning}>
          ストップ
        </button>
        <button type="button" onClick={handleReset}>
          リセット
        </button>
      </div>

      {isFinished && <p className="finished-message">時間になりました！</p>}
    </section>
  );
}
