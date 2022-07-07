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
- Excellent touch support for navigation
- Keyboard support: (left arrow, right arrow, escape, f)
  - Left arrow goes to previous item
  - Right arrow goes to next item
  - Escape cancel focus (on carousel element)
  - F key will request fullscreen window (has support for Safari browser)
- Responsive design, from 320px screen (smart watch, phone, tablet) up-to 4K screens (laptop, desktop, TV)
- Images are not absolute-positioned, so CSS content flow is not broken (this means that if you nest the carousel inside another element there should be no CSS break happening)
- Has minimal CSS resets, so it should work fine inside any project
