// @flow

import ConfigColors from './ConfigColors';
import Color from 'color';

const enhanceColor = (colorObject: any, colorKey: string) => {
  const color = colorObject[colorKey];
  for(let i = 1; i < 10; i++) {
    const fade = (i / 10);
    const colorIndex = 100 - (i * 10);
    const newColor = Color(color).fade(fade).string();
    const newKey = `${colorKey}${colorIndex}`;
    // eslint-disable-next-line
    colorObject[newKey] = newColor;
  }
};

const colorKeys = Object.keys(ConfigColors);
const Colors = Object.assign({}, ConfigColors);
for(const colorKey of colorKeys) {
  const colorEntry = ConfigColors[colorKey];
  if(typeof colorEntry === 'string') {
    enhanceColor(Colors, colorKey);
  }
}

export default Colors;