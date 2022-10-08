import styles from "./Player.module.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectCurrentTime,
  selectSource,
  selectPlaybackState,
  setPlaybackState,
  selectRoomOwner,
  selectUsername,
  selectRoom,
  setSource,
} from "./playerSlice";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { usePlayerControlSocket } from "../../hooks/usePlayerControlSocket";

export function Player() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useAppDispatch();
  const [sourceInputEnabled, setSourceUpdateEnabled] = useState(false);

  const source = useAppSelector(selectSource);
  const currentTime = useAppSelector(selectCurrentTime);
  const playbackState = useAppSelector(selectPlaybackState);
  const username = useAppSelector(selectUsername);
  const room = useAppSelector(selectRoom);
  const roomOwner = useAppSelector(selectRoomOwner);

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
      <h1>Username: {username}</h1>
      <h1>Room: {room}</h1>
      <h1>Room owner: {roomOwner}</h1>
      <h1>Playback state: {playbackState}</h1>
      <div className="sourceInput">
        <label htmlFor="sourceInput">Source:</label>
        <input
          type="text"
          name="sourceInput"
          value={source}
          onDoubleClick={() => setSourceUpdateEnabled((b) => !b)}
          onChange={(e) => dispatch(setSource(e.target.value))}
        />
      </div>
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
