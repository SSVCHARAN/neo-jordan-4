# Nike Air Jordan 4 Retro "Bred" Scrollytelling

A premium, high-performance scrollytelling landing page built with Next.js 14, Framer Motion, and HTML5 Canvas.

## Core Features
- **Scroll-Linked Image Sequence**: 192-frame sequence of the AJ4 assembling from a deconstructed state.
- **Sticky Canvas Rendering**: High-performance canvas drawing with responsive "contain" scaling.
- **Smooth Spring Physics**: Mechanical assembly feel using Framer Motion's `useSpring`.
- **Beat-Based Storytelling**: Synchronized text overlays describing the shoe's anatomy.
- **Premium Aesthetics**: Pure black void background (#000000), Jumpman red accents, and minimalist typography.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS
- **Graphics**: HTML5 Canvas
- **Type**: Inter (Google Fonts)

## Image Sequence
The image sequence is located in `public/sequence/`. It contains 192 frames (`frame_0.jpg` to `frame_191.jpg`) which are preloaded for zero-latency scrolling.
