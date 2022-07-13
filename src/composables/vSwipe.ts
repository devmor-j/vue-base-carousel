// [ ] use watch for xDiff and timeDiff
// [ ] use swipeState with reactive instead of ref
// [ ] create a useSwipe version

import { ref } from "vue";
import type { Directive } from "vue";

export type SwipeDirection = "left" | "right" | "up" | "down" | "none";

export type SwipeEventDetail = {
  direction: SwipeDirection;
  duration: number; // in ms
};

export const vSwipe: Directive = {
  mounted(swipeElement, binding) {
    const startX = ref(0);
    const startY = ref(0);
    const startTime = ref(0);

    const endX = ref(0);
    const endY = ref(0);
    const endTime = ref(0);

    const xDiff = ref(0);
    const yDiff = ref(0);
    const timeDiff = ref(0);

    const swipeDirection = ref<SwipeDirection>("none");

    // const swipeEvent = new CustomEvent('swipe', {
    //   detail: {
    //     dir: '',
    //     duration: 0,
    //   }
    // })

    swipeElement.addEventListener(
      "touchstart",
      (event: TouchEvent) => {
        startTime.value = new Date().getTime();
        startX.value = event.touches.item(0)?.clientX as number;
        startY.value = event.touches.item(0)?.clientY as number;
      },
      { passive: true }
    );

    swipeElement.addEventListener(
      "touchend",
      (event: TouchEvent) => {
        endTime.value = new Date().getTime();
        timeDiff.value = endTime.value - startTime.value;

        endX.value = event.changedTouches.item(0)?.clientX as number;
        endY.value = event.changedTouches.item(0)?.clientY as number;

        xDiff.value = endX.value - startX.value;
        yDiff.value = endY.value - startY.value;

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

        swipeDirection.value = getDirection(xDiff.value, yDiff.value);

        type CustomEventDetail = {
          direction: SwipeDirection;
          duration: number; // in ms
        };

        if (timeDiff.value > 50 && swipeDirection.value !== "none") {
          binding.value(
            new CustomEvent("swipe", {
              detail: {
                direction: swipeDirection.value,
                duration: timeDiff.value,
              } as CustomEventDetail,
            })
          );
        }
      },
      { passive: true }
    );
  },
};
