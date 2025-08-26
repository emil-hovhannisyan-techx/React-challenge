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
    "#e74c3c", // Spicy Ketchup Explosion
    "#3498db", // Smurf Tears
    "#2ecc71", // Shrek’s Smoothie
    "#f39c12", // Mango on Fire
    "#9b59b6", // Barney’s Revenge
    "#1abc9c", // Mermaid Latte
    "#d35400", // Pumpkin on Steroids
    "#c0392b", // Vampire Lipstick
    "#16a085", // Grandma’s Sofa
    "#27ae60", // Hulk’s Aftershave
    "#2980b9", // Facebook Blue (Premium Edition)
    "#8e44ad", // Eggplant Supreme
    "#2c3e50", // Moody Midnight
    "#f1c40f", // Pikachu Glow
    "#e67e22", // Cheeto Dust
    "#a57fab", // Grandma’s Curtain
    "#08851d", // Lawn Mower Accident
    "#2d5f28", // Swampy Business
    "#e3d357", // Banana Panic
    "#74d7de", // Dolphin Breath
    "#1c8289", // Hipster Ocean
    "#0979e5", // Blue Raspberry Slushie
    "#071bde", // Internet Explorer Blue
    "#ce641a", // Carrot Overlord
    "#f59ba3", // Flamingo Hangover
    "#b4a3ae", // Dusty Unicorn
    "#13c771", // Minty WiFi
    "#195a50", // Seaweed Accountant
    "#e40129", // Tomato Drama
    "#474a34", // Zombie Olive
    "#c4bf3b", // Radioactive Mustard
    "#71b45f", // Frog Yoga Pants
    "#6e793d", // Compost Chic
    "#aa640f", // Rusty Taco
    "#0603f2", // Blue Screen of Death
    "#fdedeb", // Marshmallow Ghost
    "#9745ab", // Grape Ambition
    "#63853a", // Broccoli Mood
    "#015a08", // Forest Ninja
    "#4ca1bb", // Sad Swimming Pool
    "#b67f14", // Dorito King
    "#3283e0", // Sonic Boom
    "#9993c1", // Depressed Lavender
    "#e5ff12", // Lemon on Steroids
    "#d1bc6f", // Grandma’s Wallpaper
    "#5837cd", // Purple Lightning
    "#009179", // Teal Avocado
    "#f798f1", // Flamingo Disco
    "#d56adb", // Barbie After Dark
    "#c0e6a9", // Cucumber Spa
    "#d63edd", // Purple Panic
    "#78318e", // Purple Moody Goth
    "#11db01", // Slime Energy
    "#6e231f", // Expired Ketchup
    "#3676ab", // Ikea Shelf Blue
    "#668b49", // Kale Chip
    "#a2c20e", // Pickle Surprise
    "#6ddbda", // Ice Cube Hug
    "#9cd526", // Frog Prince
    "#773441", // Red Wine Mistake
    "#a94340", // Spicy Salsa
    "#ef7edf", // Flamingo Bubblegum
    "#c2d069", // Rotten Banana Smoothie
    "#b7ce33", // Shrek’s Highlight
    "#c7f360", // Lemon-Lime Energy
    "#cc69bf", // Cotton Candy Bruise
    "#7790ca", // Sad Denim
    "#1960d6", // Blue Pen Ink
    "#3f43f1", // Highlighter Blue
    "#981c6e", // Dragon Fruit Punch
    "#9f0af9", // Magical Purple Worm
    "#91b58d", // Sage Grandma
    "#d0b75b", // Dijon Fancy
    "#335a21", // Garden Gnome Hat
    "#698ce0", // Windows XP Sky
    "#a10e51", // Lipstick Misfire
    "#320ec4", // Royal Mistake
    "#56a6da", // Twitter Bird Tears
    "#429d21", // Broccoli Confidence
    "#b03cf2", // Unicorn Energy Drink
    "#f228af", // Flamingo Rage
    "#2dfcd5", // Mint Toothpaste
    "#83dd92", // Lettuce Dream
    "#d1b5bc", // Dusty Rose Gossip
    "#ec3ed7", // Pink WiFi
    "#91ebd8", // Tropical Aqua
    "#c5e366", // Mustard Glow
    "#2ca310", // Hulk Juice
    "#80bcd1", // Iceberg Confusion
    "#077b95", // Sad Aquarium
    "#35ebe3", // Neon Dolphin
    "#d3ba6f", // Old Gold Chain
    "#52e083", // Fresh Mint Chip
    "#84a5ee", // Baby Unicorn Blue
    "#c8f2f4", // Ghostly Bubble Bath
    "#8e7720", // Spicy Dirt
    "#b6c74a", // Pickle Energy
    "#59eb1c", // Lime Lightning
    "#d796ed", // Cupcake Lavender
    "#beadcb", // Antique Barbie
    "#f7bfe3", // Cotton Candy Vibes
    "#a9f40d", // Radioactive Pickle
    "#4529cc", // Royal Nerd
    "#c6f2df", // Coconut Water
    "#9e3f78", // Grape Goth
    "#f02d60", // Strawberry Chaos
    "#dbdb1d", // Banana Helmet
    "#0a3c94", // Facebook Sad
    "#7ebd2e", // Lettuce Warrior
    "#49e12f", // Toxic Avocado
    "#42d9cc", // Mint Lagoon
    "#5cfb3a", // Radioactive Lettuce
    "#184f69", // Deep Sea Accountant
    "#81f2c6", // Aloe Vera Spa
    "#eabf13", // Mustard Royalty
    "#61fc2f", // Shrek Glow Stick
    "#d4181e", // Angry Tomato
    "#1768cf", // Internet Sadness
    "#e8c64b", // Old Lemon Pie
    "#daee3f", // Pikachu Energy
    "#ff31e2", // Neon Flamingo
    "#4c5a0b", // Old Couch
    "#146f88", // Whale Sadness
    "#39cc0a", // Toxic Grass
    "#7e71f6", // Lavender Lightning
    "#4d96b3", // IKEA Pillow
    "#6e0d83", // Purple Dungeon
    "#7a3c41", // Expired Red Wine
    "#b11be7", // Wizard Energy
    "#0f78a6", // Aquarium Blue
    "#f0ad7e", // Peach Smoothie
    "#dd7c23", // Carrot Delight
    "#f3e91b", // Pikachu Afterglow
    "#bf2b70", // Dragonfruit Drama
    "#216d91", // Deep Ocean Tax Lawyer
    "#9e17db", // Barney Glow Stick
    "#c7ee57", // Toxic Lemonade
    "#f73d14", // Spicy Chili Pepper
    "#84d369", // Avocado Toast
    "#5aab62", // Broccoli Jr.
    "#d2c896", // Grandma’s Carpet
    "#c9e7aa", // Pale Guacamole
    "#b2a8f7", // Unicorn’s Pajama
    "#22b11f", // Green Goblin Juice
    "#713dee", // Royal Elf
    "#cfa33e", // Dirty Dijon
    "#43952b", // Forest Froggy
    "#fe6f03", // Jalapeño Energy
    "#7e54e4", // Twitch Purple
    "#f7cc70", // Banana Split Glow
    "#ac4d38", // Expired Salsa
    "#5cd0f5", // Dolphin Pool
    "#b9c8a1", // Dusty Avocado
    "#c13e2a", // Bloody Pasta Sauce
    "#a7623a", // Autumn Toast
    "#15d1eb", // Neon Ice
    "#31c87b", // Mint Margarita
    "#9a573c", // Burnt Cookie
    "#ecdf7c", // Old Popcorn
    "#78885f", // Swamp Grandpa
    "#e42eb7", // Barbie Power
    "#8db467", // Healthy Broccoli
    "#a7dfc9", // Mint Smoothie
    "#ef4fbc", // Hot Pink Gossip
    "#b8cc5f", // Kiwi Drama
    "#c1a014", // Dijon Overload
    "#89a953", // Vegan Salad
    "#2dca47", // Toxic Celery
    "#cf2387", // Raspberry Riot
    "#dd9b9b", // Rose Tea
    "#71b983", // Garden Lettuce
    "#3cb391", // Seaweed Latte
    "#5d99ea", // Sad Blueberry
    "#cc9917", // Curry Explosion
    "#a3839a", // Dusty Grape
    "#93c7af", // Mint Couch
    "#c8ef2f", // Lemon Funk
    "#ab85b7", // Retro Purple
    "#bbf5e7", // Toothpaste Milkshake
    "#1fa9f9", // Twitter Energy
    "#f7a93d", // Dorito Dust
    "#d44965", // Cherry Rage
    "#ede76a", // Banana Breadlight
    "#41ea8e", // Aloe Smoothie
    "#cab832", // Dijon Legacy
    "#e2e9a9", // Pale Avocado
    "#fc1b74", // Hot Pink Disaster
    "#bd3547", // Expired Strawberry
    "#4c94cc", // IKEA Plate
    "#0ab73d", // Toxic Grasshopper
    "#f49b43", // Peach Explosion
    "#2d7eea", // Hyperlink Blue
    "#42e0a8", // Mint Mojito
    "#cf3d64", // Strawberry Goth
    "#f6e1c4", // Cappuccino Cream
    "#8a3e91", // Eggplant Queen
    "#a7f4da", // Seafoam Latte
    "#fc67a9", // Bubblegum Chaos
    "#5be13f", // Lettuce Vibes
    "#47fbe4", // Glowstick Dolphin
    "#e294bb", // Cotton Candy Wine
    "#b87124", // Cinnamon Toast
    "#eabb8c", // Caramel Cloud
    "#acfb1e", // Nuclear Lime
    "#fd31b2", // Barbie Panic
    "#95b546", // Pickle Jr.
    "#6f94f2", // Baby Blue Jeans
    "#2cf749", // Radioactive Broccoli
    "#fb7164", // Salmon Panic
    "#dfb030", // Golden Taco
    "#bbd3f7", // Sad Cloud
    "#3a6b79", // Moody Teal
    "#e8e4bc", // Banana Pudding
    "#b3e2e5", // Coconut Spa
    "#d1d971", // Yellow Lettuce
    "#f56d0f", // Flaming Dorito
    "#9a26df", // Purple Shazam
    "#7bd611", // Toxic Lettuce
    "#ccecf6", // Toothpaste Cloud
    "#baedb2", // Mint Salad
    "#f36c87", // Strawberry Cloud
    "#60c0b5", // Minty Fresh
    "#c2a82b", // Mustard Boss
    "#27ee9c", // Neon Salad
    "#4b2da8", // Royal Troll
    "#63ddbb", // Mint Cotton Candy
    "#cf695a", // Watermelon Drama
    "#ff4433", // Sriracha Energy
    "#6a17c8", // Wizard Purple
    "#e1c7b4", // Latte Mistake
    "#9e5ff2", // Twitch Unicorn
    "#51f385", // Mint Thunder
    "#fb3c8e", // Strawberry Neon
    "#1ce4eb", // Aqua Battery
    "#9dfe0e", // Nuclear Pickle
    "#d34b9f", // Raspberry Wifi
    "#55c2cc", // Blue Cotton Candy
    "#23de44", // Shrek Juice
    "#ff7c5b", // Salmon Glow
    "#48bc6b", // Spinach Glow
    "#c7990a", // Old Mustard
    "#f0c699", // Peach Milkshake
    "#93db40", // Kiwi Radioactive
    "#d84fe1", // Barbie Troll
    "#bc7a6c", // Burnt Coffee
    "#d6a7ff", // Cotton Candy Elf
    "#44c30f", // Radioactive Frog
    "#f1e539", // Lemon Torch
    "#aa2dd1", // Purple Sorcery
    "#ce6ed2", // Barbie Sorbet
    "#35e02c", // Nuclear Salad
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
