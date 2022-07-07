const useFullscreen = () => {
  const supportsRequestFullscreen =
    "requestFullscreen" in document.documentElement;
  const isSafariBrowser = "webkitRequestFullscreen" in document.documentElement;

  function toggleFullscreen(event: Event, elToFullscreen: HTMLElement): void {
    // when fullscreen mode is not available
    if (document?.fullscreenEnabled !== true) return;

    if (supportsRequestFullscreen) {
      if (document.fullscreenElement === null) {
        elToFullscreen.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } else if (isSafariBrowser) {
      // "webkitRequestFullscreen" is to support safari browser
      // typescript warns that "webkitRequestFullscreen" not exists on "document"
      // to suppress that warning we define two types

      type RequestFullscreen = {
        webkitRequestFullscreen: typeof document.documentElement.requestFullscreen;
      };
      type ExitFullscreen = {
        webkitExitFullscreen: typeof document.exitFullscreen;
      };

      if (document.fullscreenElement === null) {
        (
          event.target as typeof event.target & RequestFullscreen
        ).webkitRequestFullscreen();
      } else {
        (document as typeof document & ExitFullscreen).webkitExitFullscreen();
      }
    }
  }

  return {
    supportsRequestFullscreen,
    isSafariBrowser,
    toggleFullscreen,
  };
};

export default useFullscreen;
