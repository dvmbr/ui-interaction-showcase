# UI Interaction Showcase

A portfolio project built with **Vue 3** that demonstrates  
interactive UI components and animation patterns for modern web interfaces.

This project focuses on how **state changes, user interactions, and transitions**  
can work together to create a smooth and intuitive user experience.

---

## Overview

UI Interaction Showcase is not a component library,  
but a **hands-on playground** for experimenting with common UI patterns such as:

- transitions and animations
- interactive components
- reusable UI architecture
- responsive behavior

The goal of this project is to showcase **frontend implementation skills** rather than visual design alone.

---

## Features

### Landing Page
- Animation-driven hero section
- Staggered entrance animations for feature cards
- Section reveal on scroll
- Clear call-to-action leading to the showcase page

### Showcase Page
- Grid-based layout for interaction demos
- Each demo focuses on a single interaction pattern
- Components can be tested directly by the user

### Included Interaction Components
- Toast notifications (auto dismiss, stacked)
- Modal / Dialog
- Tabs with animated indicator
- Accordion with smooth height transitions

---

## Tech Stack

### Core
- Vue 3
- Vite
- TypeScript

### Styling
- Tailwind CSS

### Animation & Interaction
- Vue `<Transition>` and `<TransitionGroup>`
- CSS transitions and keyframes

### Routing
- Vue Router

### Deployment
- Netlify (SPA deployment)

---

## Project Structure

```txt
src/
├─ components/
│  ├─ common/
│  ├─ demos/
│  ├─ motion/
│  └─ ui/
├─ composables/
├─ pages/
├─ router/
├─ App.vue
└─ main.ts
```
