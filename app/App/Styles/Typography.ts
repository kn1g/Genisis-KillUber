export interface FontProps {
  thin: string;
  light: string;
  normal: string;
  bold: string;
  emphasis: string;
  heavy: string;
}

export interface ITypography {
  font: FontProps;
}

const Typography: ITypography = {
  font: {
    thin: 'Lato-Light',
    light: 'Lato-Light', // Alias for thin
    normal: 'Lato-Regular',
    bold: 'Lato-Bold',
    emphasis: 'Lato-Italic',
    heavy: 'Lato-Heavy',
  },
};

export default Typography;
