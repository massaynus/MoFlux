import styles from "./Player.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCurrentTime,
  selectSource,
  selectPlaybackState,
  setCurrentTime,
  setPlaybackState,
} from "./playerSlice";
import { SyntheticEvent, useEffect, useRef } from "react";
import { usePlayerControlSocket } from "../../hooks/usePlayerControlSocket";

export function Player() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useAppDispatch();

  const source = useAppSelector(selectSource);
  const currentTime = useAppSelector(selectCurrentTime);
  const playbackState = useAppSelector(selectPlaybackState);

  const socketControls = usePlayerControlSocket();

  useEffect(() => {
    const target = videoRef.current;
    if (target === null) return;

    if (playbackState === "started") target.play();
    else target.pause();
  }, [playbackState]);

  useEffect(() => {
    const target = videoRef.current;

    if (target !== null) target.currentTime = currentTime;
  }, [currentTime]);

  const onTimeUpdateHandler = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    const target = videoRef.current || e.currentTarget;
    const time = target.currentTime;

    socketControls.timeUpdate(time);
  };

  return (
    <div className={styles.videoWrapper}>
      <h1>Playback state: {playbackState}</h1>
      <video
        autoPlay
        controls
        className={styles.videoPlayer}
        ref={videoRef}
        src={source}
        onTimeUpdate={onTimeUpdateHandler}
        onSeeked={() => {
          socketControls.seek(videoRef.current?.currentTime || 0);
        }}
        onPause={() => {
          dispatch(setPlaybackState("paused"));
          socketControls.pause();
        }}
        onPlay={() => {
          dispatch(setPlaybackState("started"));
          socketControls.play();
        }}
      />
    </div>
  );
}
