import CONSTANT from "../constants";

const matrixCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const calculateWinner = (positions) => {
  const horizontal = horinzontalCombination(positions)
  if (horizontal) return horizontal

};

const horinzontalCombination = (positions) => {
  let players = [];
  matrixCombinations.forEach((horizontal) => {
    for (const i of horizontal) {
      const value = positions.get(i);
      if (value) players.push(value.player);
    }
  });

  if (players.every((player) => player === CONSTANT.player1))
    return CONSTANT.player1;
  else if (players.every((player) => player === CONSTANT.player2))
    return CONSTANT.player2;
  else return null;
};

const verticalCombination = (positions) => {
  let players = [];
  let verticalCombinations = []

  matrixCombinations.forEach((horizontal) => {
    for (const i of horizontal) {
      verticalCombinations[horizontal.indexOf(i)].push(positions.get(i));
    }
  });

  if (players.every((player) => player === CONSTANT.player1))
    return CONSTANT.player1;
  else if (players.every((player) => player === CONSTANT.player2))
    return CONSTANT.player2;
  else return null;
};
export default calculateWinner;