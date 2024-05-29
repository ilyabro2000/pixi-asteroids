import throttle from 'lodash.throttle';

const observeWindowSize = (onChangeCallback: any): void => {
  const handleResize = throttle(({ target }: { target: any}) => {
    onChangeCallback({
      width: target.innerWidth,
      height: target.innerHeight,
    });
  }, 100);

  handleResize({ target: window });

  window.addEventListener('resize', handleResize);
};

export default observeWindowSize;
