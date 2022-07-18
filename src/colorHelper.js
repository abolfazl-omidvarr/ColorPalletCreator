import chroma from 'chroma-js';

const colors1 = {
  paletteName: 'Flat UI Colors v1',
  id: 'flat-ui-colors-v1',
  emoji: '🤙',
  colors: [
    { name: 'Turquoise', color: '#1abc9c' },
    { name: 'Emerald', color: '#2ecc71' },
    { name: 'PeterRiver', color: '#3498db' },
    { name: 'Amethyst', color: '#9b59b6' },
    { name: 'WetAsphalt', color: '#34495e' },
    { name: 'GreenSea', color: '#16a085' },
    { name: 'Nephritis', color: '#27ae60' },
    { name: 'BelizeHole', color: '#2980b9' },
    { name: 'Wisteria', color: '#8e44ad' },
    { name: 'MidnightBlue', color: '#2c3e50' },
    { name: 'SunFlower', color: '#f1c40f' },
    { name: 'Carrot', color: '#e67e22' },
    { name: 'Alizarin', color: '#e74c3c' },
    { name: 'Clouds', color: '#ecf0f1' },
    { name: 'Concrete', color: '#95a5a6' },
    { name: 'Orange', color: '#f39c12' },
    { name: 'Pumpkin', color: '#d35400' },
    { name: 'Pomegranate', color: '#c0392b' },
    { name: 'Silver', color: '#bdc3c7' },
    { name: 'Asbestos', color: '#7f8c8d' }
  ]
};

const colorLevels = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

function generatePallet(pallet = colors1) {
  const newColorPallet = {
    paletteName: pallet.paletteName,
    id: pallet.id,
    emoji: pallet.emoji,
    colors: {}
  };
  colorLevels.forEach(lvl => (newColorPallet.colors[lvl] = []));
  for (let color of pallet.colors) {
    let scale = getColorScale(color.color, 11).reverse();

    scale.forEach((scl, i) => {
      let level = colorLevels[i];
      newColorPallet.colors[level].push({
        name: `${color.name} ${level}`,
        id: color.name.replace(/ /g, '-').toLowerCase(),
        hex: scl,
        rgb: chroma(scl).css()
      });
    });
  }

  return newColorPallet;
}

function colorRange(color) {
  return [
    chroma(color)
      .darken(1.5)
      .hex(),
    color,
    '#fff'
  ];
}
function getColorScale(color, numOfColor) {
  return chroma
    .scale(colorRange(color))
    .mode('lab')
    .colors(numOfColor);
}
export default generatePallet;
export { colorLevels };
