# Vue Carousel

## Features

- Writtin in [Vue 3](https://vuejs.org/) and [TypeScript](https://www.typescriptlang.org/)
- Has 2 Carousel components:
  - [BaseCarousel](src/components/BaseCarousel.vue) for general use with [Vue's slot](https://vuejs.org/guide/components/slots.html) support
  - [ImageCarousel](src/components/ImageCarousel.vue) specifically for image slideshow (has a prop to get all image paths)
- Carousel features include:
  - Cycle through items
  - Continuously item navigation
  - Autofocus on page load
  - Change transition time (ex: '0.3s')
- Excellent touch support for navigation:
  - Cannot swipe items for now
- Keyboard support: (left arrow, right arrow, escape)
  - Left arrow goes to previous item
  - Right arrow goes to next item
  - Escape cancel focus (on carousel element)
  - F key will request fullscreen window
- Fullscreen mode (with Safari support) by:
  - Pressing *f* key (no interfer with *ctrl + f* which is binded to find action)
  - *Double clicking* on carousel (except it's arrow buttons)

## Notes

### CSS Notes

- Responsive design, from *320px* screen (smart watch, phone, tablet) up-to *4K* screens (laptop, desktop, TV)
- **Images are not absolute-positioned**, so CSS *content flow* is not broken (this means that if you nest the carousel inside another element there should be no CSS break happening)
- Has minimal CSS resets, so it should work fine inside any project

### Logic sorting method

All Vue projects logic code can be sorted in two ways:

- **a)** Sort base on normal vue sections:

For example all actions for *onMounted* are always in the same place and when a new feature is added, it is placed inside the same (previous) *onMounted* hook. This makes featues coupled together because you have to know what relates to what!

- **b)** Sort base on features:

For example I already have used *onMounted* for one feature, but my new feature also needs to run an action when component mounts (needs to run inside, *onMounted*); in this case we don't touch previous codes and simply write everything needed for this feature to work at the end of last feature code. This makes adding and debugging very easy, because all featues code are possibly in the same place.

> This project's logic is sorted based on feature concerns not specifically Vue's consern (this means that you can easily find and remove features you don't want or add new features with no hassle to touch current code)

## Continuous Development

Next feature will be focues on *touch swipes*.
