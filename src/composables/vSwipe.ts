import { reactive } from "vue";
import type { Directive, DirectiveBinding } from "vue";

// [ ] create a useSwipe versionX

export type SwipeDirection = "left" | "right" | "up" | "down" | "none";

export type SwipeEventDetail = {
  direction: SwipeDirection;
  duration: number; // in ms
  distance: number; // in pixels
};

type SwipeOptions = {
  durationThreshold?: number; // in ms
  distanceThreshold?: number; // in pixels
};

export function initSwipeDirective(
  options: SwipeOptions = { durationThreshold: 50, distanceThreshold: 10 }
) {
  const swipeState = reactive({
    startX: 0,
    startY: 0,
    startTime: 0,
    endX: 0,
    endY: 0,
    endTime: 0,
    xDistance: 0,
    yDistance: 0,
    swipeDuration: 0,
    swipeDirection: "none",
    swipeDistance: 0,
  });

  const getDirection = (
    xDistance: number,
    yDistance: number
  ): SwipeDirection => {
    if (Math.abs(xDistance) > Math.abs(yDistance)) {
      if (xDistance >= 0) {
        return "right";
      } else return "left";
    } else if (Math.abs(xDistance) < Math.abs(yDistance)) {
      if (yDistance >= 0) {
        return "down";
      } else return "up";
    } else {
      // if program reaches here it means that:
      // Math.abs(xDistance) === Math.abs(yDistance)
      // so there is no direction
      return "none";
    }
  };

  const getDistance = (xDistance: number, yDistance: number): number => {
    return Math.max(Math.abs(xDistance), Math.abs(yDistance));
  };

  const isAllTrue = (rules: Array<boolean>): boolean => {
    return rules.every((rule) => rule);
  };

  const handleTouchStart = (event: TouchEvent) => {
    swipeState.startTime = new Date().getTime();
    swipeState.startX = event.touches.item(0)?.clientX as number;
    swipeState.startY = event.touches.item(0)?.clientY as number;
  };

  const handleTouchEnd = (event: TouchEvent, binding: DirectiveBinding) => {
    swipeState.endTime = new Date().getTime();
    swipeState.swipeDuration = swipeState.endTime - swipeState.startTime;

    swipeState.endX = event.changedTouches.item(0)?.clientX as number;
    swipeState.endY = event.changedTouches.item(0)?.clientY as number;

    swipeState.xDistance = swipeState.endX - swipeState.startX;
    swipeState.yDistance = swipeState.endY - swipeState.startY;

    swipeState.swipeDirection = getDirection(
      swipeState.xDistance,
      swipeState.yDistance
    );

    swipeState.swipeDistance = getDistance(
      swipeState.xDistance,
      swipeState.yDistance
    );

    // check swipe option rules (all must be true to be a valid swipe)
    const isSwipeValid = isAllTrue([
      swipeState.swipeDuration > (options.durationThreshold as number),
      swipeState.swipeDistance > (options.distanceThreshold as number),
      swipeState.swipeDirection !== "none",
      swipeState.swipeDirection in binding.modifiers,
    ]);

    if (isSwipeValid) {
      binding.value(
        new CustomEvent("swipe", {
          detail: {
            direction: swipeState.swipeDirection,
            duration: swipeState.swipeDuration,
            distance: swipeState.swipeDistance,
          } as SwipeEventDetail,
        })
      );
    }
  };

  const vSwipe: Directive = {
    mounted(swipeElement, binding) {
      swipeElement.addEventListener(
        "touchstart",
        (event: TouchEvent) => handleTouchStart(event),
        { passive: true }
      );

      swipeElement.addEventListener(
        "touchend",
        (event: TouchEvent) => handleTouchEnd(event, binding),
        { passive: true }
      );
    },

    unmounted(swipeElement) {
      swipeElement.removeEventListener("touchstart", handleTouchStart);
      swipeElement.removeEventListener("touchend", handleTouchEnd);
    },
  };

  return vSwipe;
}
