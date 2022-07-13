// [ ] use watch for xDiff and timeDiff
// [ ] create a useSwipe version

import { reactive } from "vue";
import type { Directive } from "vue";

export type SwipeDirection = "left" | "right" | "up" | "down" | "none";

export type SwipeEventDetail = {
  direction: SwipeDirection;
  duration: number; // in ms
};

export const vSwipe: Directive = {
  mounted(swipeElement, binding) {
    const swipeState = reactive({
      startX: 0,
      startY: 0,
      startTime: 0,
      endX: 0,
      endY: 0,
      endTime: 0,
      xDiff: 0,
      yDiff: 0,
      timeDiff: 0,
      swipeDirection: "none",
    });

    // const swipeEvent = new CustomEvent('swipe', {
    //   detail: {
    //     dir: '',
    //     duration: 0,
    //   }
    // })

    swipeElement.addEventListener(
      "touchstart",
      (event: TouchEvent) => {
        swipeState.startTime = new Date().getTime();
        swipeState.startX = event.touches.item(0)?.clientX as number;
        swipeState.startY = event.touches.item(0)?.clientY as number;
      },
      { passive: true }
    );

    swipeElement.addEventListener(
      "touchend",
      (event: TouchEvent) => {
        swipeState.endTime = new Date().getTime();
        swipeState.timeDiff = swipeState.endTime - swipeState.startTime;

        swipeState.endX = event.changedTouches.item(0)?.clientX as number;
        swipeState.endY = event.changedTouches.item(0)?.clientY as number;

        swipeState.xDiff = swipeState.endX - swipeState.startX;
        swipeState.yDiff = swipeState.endY - swipeState.startY;

        const getDirection = (xDiff: number, yDiff: number): SwipeDirection => {
          if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff >= 0) {
              return "right";
            } else return "left";
          } else if (Math.abs(xDiff) < Math.abs(yDiff)) {
            if (yDiff >= 0) {
              return "down";
            } else return "up";
          } else {
            // if program reaches here it means that:
            // Math.abs(xDiff) === Math.abs(yDiff)
            // so there is no direction
            return "none";
          }
        };

        swipeState.swipeDirection = getDirection(
          swipeState.xDiff,
          swipeState.yDiff
        );

        type CustomEventDetail = {
          direction: SwipeDirection;
          duration: number; // in ms
        };

        if (swipeState.timeDiff > 50 && swipeState.swipeDirection !== "none") {
          binding.value(
            new CustomEvent("swipe", {
              detail: {
                direction: swipeState.swipeDirection,
                duration: swipeState.timeDiff,
              } as CustomEventDetail,
            })
          );
        }
      },
      { passive: true }
    );
  },
};
