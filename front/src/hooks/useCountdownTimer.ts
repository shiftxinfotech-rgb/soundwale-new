import {useCallback, useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus, NativeEventSubscription} from 'react-native';

interface CountdownTimer {
  seconds: number;
  startTimer: () => void;
  stopTimer: () => void;
  restartTimer: () => void;
}

const useCountdownTimer = (initialSeconds: number): CountdownTimer => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  );

  const backgroundTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
      });
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const restartTimer = useCallback(() => {
    stopTimer();
    setSeconds(initialSeconds);
    startTimer();
  }, [initialSeconds, startTimer, stopTimer]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        const currentTime = Date.now();
        const elapsedTime = Math.floor(
          (currentTime - (backgroundTimeRef.current || 0)) / 1000,
        );
        setSeconds(prevSec => Math.max(prevSec - elapsedTime, 0));
        startTimer();
      } else if (nextAppState.match(/inactive|background/)) {
        backgroundTimeRef.current = Date.now();
        stopTimer();
      }
      setAppState(nextAppState);
    };

    const subscription: NativeEventSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [appState, startTimer, stopTimer]);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [startTimer, stopTimer]);

  return {seconds, startTimer, stopTimer, restartTimer};
};

export {useCountdownTimer};
