import { useReducer } from "react";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";
import Stats from "./components/Stats";
import type { DrawingState, DrawingAction, Point } from "./types";
import "./App.css";

const ADD_POINT = "ADD_POINT";
const UNDO = "UNDO";
const REDO = "REDO";

const getRandomColor = () => {
  const colors = [
    "#e74c3c",
    "#3498db",
    "#2ecc71",
    "#f39c12",
    "#9b59b6",
    "#1abc9c",
    "#d35400",
    "#c0392b",
    "#16a085",
    "#27ae60",
    "#2980b9",
    "#8e44ad",
    "#2c3e50",
    "#f1c40f",
    "#e67e22",
    "#a57fab",
    "#08851d",
    "#2d5f28",
    "#e3d357",
    "#74d7de",
    "#1c8289",
    "#0979e5",
    "#071bde",
    "#ce641a",
    "#f59ba3",
    "#b4a3ae",
    "#13c771",
    "#195a50",
    "#e40129",
    "#474a34",
    "#c4bf3b",
    "#71b45f",
    "#6e793d",
    "#aa640f",
    "#0603f2",
    "#fdedeb",
    "#9745ab",
    "#63853a",
    "#015a08",
    "#4ca1bb",
    "#b67f14",
    "#3283e0",
    "#9993c1",
    "#e5ff12",
    "#d1bc6f",
    "#5837cd",
    "#009179",
    "#f798f1",
    "#d56adb",
    "#c0e6a9",
    "#d63edd",
    "#78318e",
    "#11db01",
    "#6e231f",
    "#3676ab",
    "#668b49",
    "#a2c20e",
    "#6ddbda",
    "#9cd526",
    "#773441",
    "#a94340",
    "#ef7edf",
    "#c2d069",
    "#b7ce33",
    "#c7f360",
    "#cc69bf",
    "#7790ca",
    "#1960d6",
    "#3f43f1",
    "#981c6e",
    "#9f0af9",
    "#91b58d",
    "#d0b75b",
    "#335a21",
    "#698ce0",
    "#a10e51",
    "#320ec4",
    "#56a6da",
    "#429d21",
    "#b03cf2",
    "#f228af",
    "#2dfcd5",
    "#83dd92",
    "#d1b5bc",
    "#ec3ed7",
    "#91ebd8",
    "#c5e366",
    "#2ca310",
    "#80bcd1",
    "#077b95",
    "#35ebe3",
    "#d3ba6f",
    "#52e083",
    "#84a5ee",
    "#c8f2f4",
    "#8e7720",
    "#b6c74a",
    "#59eb1c",
    "#d796ed",
    "#beadcb",
    "#f7bfe3",
    "#a9f40d",
    "#4529cc",
    "#c6f2df",
    "#9e3f78",
    "#f02d60",
    "#dbdb1d",
    "#0a3c94",
    "#7ebd2e",
    "#49e12f",
    "#42d9cc",
    "#5cfb3a",
    "#184f69",
    "#81f2c6",
    "#eabf13",
    "#61fc2f",
    "#d4181e",
    "#1768cf",
    "#e8c64b",
    "#daee3f",
    "#ff31e2",
    "#4c5a0b",
    "#146f88",
    "#39cc0a",
    "#7e71f6",
    "#4d96b3",
    "#6e0d83",
    "#7a3c41",
    "#b11be7",
    "#0f78a6",
    "#f0ad7e",
    "#dd7c23",
    "#f3e91b",
    "#bf2b70",
    "#216d91",
    "#9e17db",
    "#c7ee57",
    "#f73d14",
    "#84d369",
    "#5aab62",
    "#d2c896",
    "#c9e7aa",
    "#b2a8f7",
    "#22b11f",
    "#713dee",
    "#cfa33e",
    "#43952b",
    "#fe6f03",
    "#7e54e4",
    "#f7cc70",
    "#ac4d38",
    "#5cd0f5",
    "#b9c8a1",
    "#c13e2a",
    "#a7623a",
    "#15d1eb",
    "#31c87b",
    "#9a573c",
    "#ecdf7c",
    "#78885f",
    "#e42eb7",
    "#8db467",
    "#a7dfc9",
    "#ef4fbc",
    "#b8cc5f",
    "#c1a014",
    "#89a953",
    "#2dca47",
    "#cf2387",
    "#dd9b9b",
    "#71b983",
    "#3cb391",
    "#5d99ea",
    "#cc9917",
    "#a3839a",
    "#93c7af",
    "#c8ef2f",
    "#ab85b7",
    "#bbf5e7",
    "#1fa9f9",
    "#f7a93d",
    "#d44965",
    "#ede76a",
    "#41ea8e",
    "#cab832",
    "#e2e9a9",
    "#fc1b74",
    "#bd3547",
    "#4c94cc",
    "#0ab73d",
    "#f49b43",
    "#2d7eea",
    "#42e0a8",
    "#cf3d64",
    "#f6e1c4",
    "#8a3e91",
    "#a7f4da",
    "#fc67a9",
    "#5be13f",
    "#47fbe4",
    "#e294bb",
    "#b87124",
    "#eabb8c",
    "#acfb1e",
    "#fd31b2",
    "#95b546",
    "#6f94f2",
    "#2cf749",
    "#fb7164",
    "#dfb030",
    "#bbd3f7",
    "#3a6b79",
    "#e8e4bc",
    "#b3e2e5",
    "#d1d971",
    "#f56d0f",
    "#9a26df",
    "#7bd611",
    "#ccecf6",
    "#baedb2",
    "#f36c87",
    "#60c0b5",
    "#c2a82b",
    "#27ee9c",
    "#4b2da8",
    "#63ddbb",
    "#cf695a",
    "#ff4433",
    "#6a17c8",
    "#e1c7b4",
    "#9e5ff2",
    "#51f385",
    "#fb3c8e",
    "#1ce4eb",
    "#9dfe0e",
    "#d34b9f",
    "#55c2cc",
    "#23de44",
    "#ff7c5b",
    "#48bc6b",
    "#c7990a",
    "#f0c699",
    "#93db40",
    "#d84fe1",
    "#bc7a6c",
    "#d6a7ff",
    "#44c30f",
    "#f1e539",
    "#aa2dd1",
    "#ce6ed2",
    "#35e02c",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const initialState: DrawingState = {
  history: [[]],
  future: [],
};

function drawingReducer(
  state: DrawingState,
  action: DrawingAction
): DrawingState {
  switch (action.type) {
    case ADD_POINT: {
      const currentPoints = state.history[state.history.length - 1];
      const newPoints = [...currentPoints, action.point];
      return {
        history: [...state.history, newPoints],
        future: [],
      };
    }
    case UNDO: {
      if (state.history.length <= 1) return state;
      const lastState = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, state.history.length - 1);
      return {
        history: newHistory,
        future: [...state.future, lastState],
      };
    }
    case REDO: {
      if (state.future.length === 0) return state;
      const nextState = state.future[state.future.length - 1];
      const newFuture = state.future.slice(0, state.future.length - 1);
      return {
        history: [...state.history, nextState],
        future: newFuture,
      };
    }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(drawingReducer, initialState);
  const currentPoints = state.history[state.history.length - 1];

  const handleAddPoint = (point: Omit<Point, "color">) => {
    const pointWithColor = {
      ...point,
      color: getRandomColor(),
    };
    dispatch({ type: ADD_POINT, point: pointWithColor });
  };

  const handleUndo = () => {
    dispatch({ type: UNDO });
  };

  const handleRedo = () => {
    dispatch({ type: REDO });
  };

  return (
    <div className="app">
      <h1>Drawing App with Undo/Redo</h1>
      <p>
        Click anywhere on the canvas below to add points. Use the undo/redo
        buttons to navigate through your drawing history.
      </p>

      <Controls
        onAddPoint={() =>
          handleAddPoint({
            x: Math.random() * 500 + 100,
            y: Math.random() * 300 + 50,
            id: Date.now(),
          })
        }
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={state.history.length > 1}
        canRedo={state.future.length > 0}
        undoCount={state.history.length - 1}
        redoCount={state.future.length}
      />

      <Canvas points={currentPoints} onAddPoint={handleAddPoint} />

      <Stats
        pointsCount={currentPoints.length}
        historyCount={state.history.length}
        futureCount={state.future.length}
      />
    </div>
  );
}

export default App;
