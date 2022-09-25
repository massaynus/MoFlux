import styles from "./Player.module.scss";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  setCurrentTime,
  selectCurrentTime,
  selectSource,
  selectDuration,
  setDuration,
} from "./playerSlice";
import { SyntheticEvent, useRef } from "react";

export function Player() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useAppDispatch();

  const source = useAppSelector(selectSource);
  const currentTime = useAppSelector(selectCurrentTime);
  const duration = useAppSelector(selectDuration);

  const onTimeUpdateHandler = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    const target = videoRef.current || e.currentTarget;

    const currentTime = target.currentTime;
    const duration = target.duration;

    dispatch(setDuration(duration));
    dispatch(setCurrentTime(currentTime));
  };

  return (
    <div className="videoWrapper">
      <video
        className="videoPlayer"
        ref={videoRef}
        src={source}
        onTimeUpdate={onTimeUpdateHandler}
        autoPlay
        controls
      />
    </div>
  );
}
