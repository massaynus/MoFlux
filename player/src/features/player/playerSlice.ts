import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type PlayerPlaycbackState = "unstarted" | "started" | "paused";

export interface PlayerState {
  source?: string;
  currentTime: number;
  duration: number;
  playbackState: PlayerPlaycbackState;
}

const initialState: PlayerState = {
  currentTime: 0,
  duration: 0,
  playbackState: "unstarted",
  source:
    "http://localhost:8080/%5bEgyBest%5d.The.Take.2016.HDRip.1080p.x264.mp4",
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setSource: (state, action: PayloadAction<string>) => {
      if (state.source !== action.payload) state.currentTime = 0;

      state.source = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setPlaybackState: (state, action: PayloadAction<PlayerPlaycbackState>) => {
      state.playbackState = action.payload;
    },
  },
});

export const { setSource, setCurrentTime, setDuration, setPlaybackState } =
  playerSlice.actions;

export const selectSource = (state: RootState) => state.player.source;
export const selectCurrentTime = (state: RootState) => state.player.currentTime;
export const selectDuration = (state: RootState) => state.player.duration;
export const selectPlaybackState = (state: RootState) =>
  state.player.playbackState;

export default playerSlice.reducer;
