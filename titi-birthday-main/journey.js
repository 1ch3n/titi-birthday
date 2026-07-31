import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/* ==================================================
   THREE.JS GLOBE
================================================== */

const stage = document.getElementById("globe-stage");
const statusText = document.getElementById("journey-status");
const routeProgress = document.getElementById("route-progress");
const routeBadge = document.getElementById("route-badge");
const replayButton = document.getElementById("replay-journey");
const arrivalModal = document.getElementById("arrival-modal");
const closeArrival = document.getElementById("close-arrival");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
camera.position.set(0, 0.45, 8.2);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
stage.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.055;
controls.enablePan = false;
controls.minDistance = 5.3;
controls.maxDistance = 10;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.34;

scene.add(new THREE.HemisphereLight(0xffffff, 0xb7a4c0, 2.4));

const keyLight = new THREE.DirectionalLight(0xffffff, 2.7);
keyLight.position.set(4, 3, 5);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0xd7b0c8, 1.8);
rimLight.position.set(-5, -1, -4);
scene.add(rimLight);

const globe = new THREE.Group();
scene.add(globe);

const radius = 2.25;

const globeSurface = new THREE.Mesh(
  new THREE.SphereGeometry(radius, 80, 80),
  new THREE.MeshPhongMaterial({
    color: 0xb9d7df,
    emissive: 0x23313a,
    emissiveIntensity: 0.06,
    transparent: true,
    opacity: 0.94,
    shininess: 42
  })
);
globe.add(globeSurface);

const wireGlobe = new THREE.Mesh(
  new THREE.SphereGeometry(radius * 1.006, 24, 16),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.18,
    wireframe: true
  })
);
globe.add(wireGlobe);

const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(radius * 1.055, 64, 64),
  new THREE.MeshBasicMaterial({
    color: 0xf6d9e5,
    transparent: true,
    opacity: 0.09,
    side: THREE.BackSide
  })
);
globe.add(atmosphere);

/* Approximate city coordinates for visual placement. */
const cities = {
  amsterdam: { lat: 52.3676, lon: 4.9041, label: "You · Amsterdam", color: 0x82c2d5 },
  anyang: { lat: 36.10, lon: 114.39, label: "Yichen · Anyang", color: 0xdf8eb0 }
};

function latLonToVector3(lat, lon, r = radius) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);

  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function makeTextSprite(text) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const pixelRatio = 2;
  canvas.width = 520 * pixelRatio;
  canvas.height = 90 * pixelRatio;
  context.scale(pixelRatio, pixelRatio);

  context.font = '700 27px "Helvetica Neue", Arial, sans-serif';
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "rgba(255,255,255,.9)";
  context.strokeStyle = "rgba(91,72,82,.3)";
  context.lineWidth = 8;
  context.lineJoin = "round";
  context.strokeText(text, 260, 45);
  context.fillText(text, 260, 45);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false })
  );
  sprite.scale.set(2.4, 0.42, 1);
  return sprite;
}

function addCityMarker(city) {
  const point = latLonToVector3(city.lat, city.lon, radius * 1.015);
  const group = new THREE.Group();

  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 24, 24),
    new THREE.MeshBasicMaterial({ color: city.color })
  );
  marker.position.copy(point);
  group.add(marker);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.12, 0.17, 32),
    new THREE.MeshBasicMaterial({
      color: city.color,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide
    })
  );
  ring.position.copy(point.clone().multiplyScalar(1.008));
  ring.lookAt(new THREE.Vector3(0, 0, 0));
  group.add(ring);

  const label = makeTextSprite(city.label);
  label.position.copy(point.clone().multiplyScalar(1.24));
  group.add(label);

  globe.add(group);
  return point;
}

const amsterdamPoint = addCityMarker(cities.amsterdam);
const anyangPoint = addCityMarker(cities.anyang);

function routePointAt(t) {
  const start = amsterdamPoint.clone().normalize();
  const end = anyangPoint.clone().normalize();
  const direction = start.clone().lerp(end, t).normalize();
  const lift = Math.sin(Math.PI * t) * 0.82;
  return direction.multiplyScalar(radius * 1.05 + lift);
}

const routePoints = Array.from({ length: 101 }, (_, index) => routePointAt(index / 100));
const routeCurve = new THREE.CatmullRomCurve3(routePoints);

const routeTube = new THREE.Mesh(
  new THREE.TubeGeometry(routeCurve, 160, 0.018, 8, false),
  new THREE.MeshBasicMaterial({
    color: 0xe5a2bf,
    transparent: true,
    opacity: 0.36
  })
);
globe.add(routeTube);

function createPerson() {
  const person = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.09, 0.2, 5, 10),
    new THREE.MeshPhongMaterial({ color: 0xf4c5d8, shininess: 50 })
  );
  body.rotation.z = Math.PI / 2;
  person.add(body);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 20, 20),
    new THREE.MeshPhongMaterial({ color: 0xffe2cf, shininess: 40 })
  );
  head.position.x = 0.19;
  person.add(head);

  const heart = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.055, 0),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  heart.position.set(0.02, 0.11, 0);
  heart.rotation.z = Math.PI / 4;
  person.add(heart);

  person.scale.setScalar(1.35);
  return person;
}

const traveler = createPerson();
traveler.position.copy(routeCurve.getPointAt(0));
globe.add(traveler);

let journeyUnlocked = false;
let journeyActive = false;
let journeyStart = 0;
const journeyDuration = 6200;

function beginJourney() {
  if (journeyActive) return;

  journeyUnlocked = true;
  journeyActive = true;
  journeyStart = performance.now();
  controls.autoRotate = false;
  replayButton.disabled = true;
  routeBadge.textContent = "Traveling";
  routeBadge.classList.add("is-open");
  statusText.textContent = "Leaving Amsterdam… follow the glowing route ♡";
  arrivalModal.classList.remove("is-visible");
  arrivalModal.setAttribute("aria-hidden", "true");
}

function completeJourney() {
  journeyActive = false;
  replayButton.disabled = false;
  routeBadge.textContent = "Arrived";
  statusText.textContent = "Amsterdam → Anyang complete. You found Yichen ♡";
  routeProgress.style.width = "100%";
  arrivalModal.classList.add("is-visible");
  arrivalModal.setAttribute("aria-hidden", "false");
}

function updateJourney(now) {
  if (!journeyActive) return;

  const raw = Math.min((now - journeyStart) / journeyDuration, 1);
  const eased = raw < 0.5
    ? 4 * raw * raw * raw
    : 1 - Math.pow(-2 * raw + 2, 3) / 2;

  traveler.position.copy(routeCurve.getPointAt(eased));
  const lookAhead = routeCurve.getPointAt(Math.min(eased + 0.012, 1));
  traveler.lookAt(lookAhead);
  traveler.rotateY(Math.PI / 2);
  traveler.rotation.z += Math.sin(now * 0.012) * 0.002;

  routeProgress.style.width = `${Math.round(raw * 100)}%`;

  if (raw < 0.35) {
    statusText.textContent = "Leaving Amsterdam… crossing Europe ♡";
  } else if (raw < 0.72) {
    statusText.textContent = "Halfway there… keep going east ✦";
  } else if (raw < 1) {
    statusText.textContent = "China is getting closer… Anyang ahead ♡";
  }

  if (raw >= 1) completeJourney();
}

function resizeGlobe() {
  const width = stage.clientWidth;
  const height = stage.clientHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

const resizeObserver = new ResizeObserver(resizeGlobe);
resizeObserver.observe(stage);

renderer.setAnimationLoop((now) => {
  updateJourney(now);
  controls.update();
  renderer.render(scene, camera);
});

replayButton.addEventListener("click", () => {
  traveler.position.copy(routeCurve.getPointAt(0));
  routeProgress.style.width = "0%";
  beginJourney();
});

closeArrival.addEventListener("click", () => {
  arrivalModal.classList.remove("is-visible");
  arrivalModal.setAttribute("aria-hidden", "true");
});

arrivalModal.addEventListener("click", (event) => {
  if (event.target === arrivalModal) closeArrival.click();
});

/* ==================================================
   MAZE MINI-GAME — SIMPLE 7 × 7 VERSION
================================================== */

const mazeElement = document.getElementById("maze");
const moveCountElement = document.getElementById("move-count");
const newMazeButton = document.getElementById("new-maze");
const controlButtons = document.querySelectorAll("[data-move]");

const mazeSize = 7;
let maze = [];
let player = { row: 1, col: 1 };
let goal = { row: mazeSize - 2, col: mazeSize - 2 };
let moveCount = 0;
let trail = new Set();
let mazeComplete = false;

function cellKey(row, col) {
  return `${row}-${col}`;
}

function shuffledDirections() {
  const directions = [
    [-2, 0],
    [2, 0],
    [0, -2],
    [0, 2]
  ];

  for (let index = directions.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [directions[index], directions[randomIndex]] = [
      directions[randomIndex],
      directions[index]
    ];
  }

  return directions;
}

function openExtraPassage() {
  const candidates = [];

  for (let row = 1; row < mazeSize - 1; row += 1) {
    for (let col = 1; col < mazeSize - 1; col += 1) {
      if (maze[row][col] !== 1) continue;

      const horizontal = maze[row][col - 1] === 0 && maze[row][col + 1] === 0;
      const vertical = maze[row - 1][col] === 0 && maze[row + 1][col] === 0;

      if (horizontal || vertical) candidates.push([row, col]);
    }
  }

  if (!candidates.length) return;

  const [row, col] = candidates[Math.floor(Math.random() * candidates.length)];
  maze[row][col] = 0;
}

function generateMaze() {
  maze = Array.from({ length: mazeSize }, () => Array(mazeSize).fill(1));
  const stack = [[1, 1]];
  maze[1][1] = 0;

  while (stack.length) {
    const [row, col] = stack[stack.length - 1];
    const candidates = shuffledDirections().filter(([rowStep, colStep]) => {
      const nextRow = row + rowStep;
      const nextCol = col + colStep;

      return (
        nextRow > 0 &&
        nextRow < mazeSize - 1 &&
        nextCol > 0 &&
        nextCol < mazeSize - 1 &&
        maze[nextRow][nextCol] === 1
      );
    });

    if (!candidates.length) {
      stack.pop();
      continue;
    }

    const [rowStep, colStep] = candidates[0];
    const nextRow = row + rowStep;
    const nextCol = col + colStep;

    maze[row + rowStep / 2][col + colStep / 2] = 0;
    maze[nextRow][nextCol] = 0;
    stack.push([nextRow, nextCol]);
  }

  // One shortcut keeps the maze playful but easy.
  openExtraPassage();

  player = { row: 1, col: 1 };
  goal = { row: mazeSize - 2, col: mazeSize - 2 };
  moveCount = 0;
  trail = new Set([cellKey(player.row, player.col)]);
  mazeComplete = false;

  moveCountElement.textContent = "0 moves";
  routeBadge.textContent = journeyUnlocked ? "Ready" : "Locked";
  if (!journeyUnlocked) routeBadge.classList.remove("is-open");

  statusText.textContent = journeyUnlocked
    ? "The route is unlocked. Replay it whenever you like."
    : "Complete the maze to begin the journey.";

  renderMaze();
  requestAnimationFrame(() => mazeElement.focus({ preventScroll: true }));
}

function renderMaze() {
  mazeElement.style.setProperty("--maze-size", mazeSize);
  mazeElement.style.gridTemplateColumns =
    `repeat(${mazeSize}, minmax(0, 1fr))`;
  mazeElement.style.gridTemplateRows =
    `repeat(${mazeSize}, minmax(0, 1fr))`;
  mazeElement.innerHTML = "";

  const fragment = document.createDocumentFragment();

  for (let row = 0; row < mazeSize; row += 1) {
    for (let col = 0; col < mazeSize; col += 1) {
      const cell = document.createElement("div");
      const isWall = maze[row][col] === 1;
      const isPlayer = row === player.row && col === player.col;
      const isGoal = row === goal.row && col === goal.col;

      cell.className = `maze-cell ${isWall ? "maze-wall" : "maze-path"}`;

      if (!isWall && trail.has(cellKey(row, col))) {
        cell.classList.add("maze-trail");
      }

      if (isGoal) {
        cell.classList.add("maze-goal");
        cell.textContent = "♥";
      }

      if (isPlayer) cell.classList.add("maze-player");

      fragment.appendChild(cell);
    }
  }

  mazeElement.appendChild(fragment);
}

function movePlayer(direction) {
  if (mazeComplete) return;

  const movement = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1]
  }[direction];

  if (!movement) return;

  const nextRow = player.row + movement[0];
  const nextCol = player.col + movement[1];

  if (maze[nextRow]?.[nextCol] !== 0) return;

  player = { row: nextRow, col: nextCol };
  trail.add(cellKey(player.row, player.col));
  moveCount += 1;
  moveCountElement.textContent = `${moveCount} ${moveCount === 1 ? "move" : "moves"}`;
  renderMaze();

  if (player.row === goal.row && player.col === goal.col) {
    mazeComplete = true;
    moveCountElement.textContent = `${moveCount} · complete`;
    routeBadge.textContent = "Unlocked";
    routeBadge.classList.add("is-open");
    statusText.textContent = "Portal found! Starting the Amsterdam → Anyang journey…";
    window.setTimeout(beginJourney, 500);
  }
}

const keyDirections = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  W: "up",
  s: "down",
  S: "down",
  a: "left",
  A: "left",
  d: "right",
  D: "right"
};

window.addEventListener("keydown", (event) => {
  const direction = keyDirections[event.key];
  if (!direction) return;

  event.preventDefault();
  movePlayer(direction);
});

controlButtons.forEach((button) => {
  button.addEventListener("click", () => movePlayer(button.dataset.move));
});

newMazeButton.addEventListener("click", generateMaze);

console.info("Journey maze v7 loaded — 7 × 7");
generateMaze();

/* ==================================================
   MUSIC BUTTON
================================================== */

const music = document.getElementById("music");
const musicButton = document.getElementById("music-btn");

musicButton.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicButton.textContent = "🎧 Pause";
    } else {
      music.pause();
      musicButton.textContent = "🎧 Play";
    }
  } catch (error) {
    musicButton.textContent = "Tap again ♡";
    console.warn("Music could not start:", error);
  }
});
