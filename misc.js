function measureToFrame(measure, quarter) {
  const beat = measure * 4 + quarter;
  return beat * 40;
}

console.log(measureToFrame(22, 0));
console.log(measureToFrame(30, 0));

// 22 === 1780
// 30 === 2400
