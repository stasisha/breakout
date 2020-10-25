export default {
  ball: {
    speed: 5,
    radius: 10,
    fillStyle: '#d00'
  },
  paddle: {
    height: 10,
    width: 220,
    fillStyle: '#9b00dd',
    moveSpeed: 6
  },
  bricks: {
    rowCount: 3,
    columnCount: 6,
    offsetTop: 60,
    offsetLeft: 30,
    padding: 20
  },
  brick: {
    height: 20,
    width: 117,
    durability: [
      { fillStyle: "#c7dd00" },
      { fillStyle: "#850812" },
      { fillStyle: "#001956" }
    ]
  },
  score: {
    fillStyle: '#000'
  },
  lives: {
    count: 3,
    fillStyle: '#000'
  },
  font: "14px Arial"
};
