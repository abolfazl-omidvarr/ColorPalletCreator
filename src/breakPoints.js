export default {
  sizeUp(bp, custom) {
    let size;
    switch (bp) {
      case 'sm':
        size = 600;
        break;
      case 'md':
        size = 900;
        break;
      case 'lg':
        size = 1200;
        break;
      case 'xl':
        size = 1536;
        break;
      default:
        size = custom;
    }
    return `@media (max-width: ${size}px)`;
  },
  sizeDown(bp, custom) {
    let size;
    switch (bp) {
      case 'sm':
        size = 601;
        break;
      case 'md':
        size = 901;
        break;
      case 'lg':
        size = 1201;
        break;
      case 'xl':
        size = 1537;
        break;
      default:
        size = custom;
    }
    return `@media (min-width: ${size}px)`;
  }
};
