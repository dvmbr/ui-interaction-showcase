# UI Interaction Showcase

A portfolio project built with **Vue 3** that focuses on  
**state-driven UI interactions and component architecture**, rather than visual styling alone.

This project demonstrates how **user actions, async flows, and UI feedback**  
can be composed into predictable and reusable interaction patterns.

---

## Overview

UI Interaction Showcase is a **practical playground**, not a UI library.

Instead of collecting many unrelated components,  
this project dives deep into **one interaction flow** and explores:

- where state should live
- how components communicate
- how loading, success, error, and rollback states are expressed in UI
- how interaction logic can be separated from presentation

The goal is to showcase **frontend implementation and state management skills**.

---

## Current Features

### Interactive Card (Core Example)

A single interactive component that demonstrates a full UI lifecycle:

- **States**
  - `default`
  - `error`
  - `loading`
  - `success`
- **User interactions**
  - hover / focus feedback
  - pressed state
  - async action handling
- **State flow**
  - `error → loading → success`
  - manual rollback back to `error`

### Key Interaction Patterns

- Parent-owned state (`props down`)
- Child-triggered events (`events up`)
- Explicit action intent via emitted events
- Async UI feedback with loading indicators
- Non-blocking toast notifications

---

## Toast System

- Global toast stack (bottom-right)
- Auto-dismiss behavior
- Multiple toasts can stack
- Implemented as a composable (`useToast`)
- Injection handled via `Symbol` (no string-based keys)

---

## Architecture Highlights

### State Ownership

- **State is owned by the parent page**
- Components never mutate their own state
- Components emit events describing _what happened_, not _what should change_

This keeps UI behavior predictable and easy to reason about.

### Composables

All reusable logic lives in `src/composables`.

- `useInteractiveCard`
- `useToast`

Components focus only on rendering and wiring interactions,  
while composables handle state, side effects, and business rules.

---

## Tech Stack

### Core

- Vue 3
- Vite
- TypeScript

### Styling

- Tailwind CSS (semantic tokens + utility-based styling)

### Interaction & Animation

- CSS transitions
- State-driven UI updates (no animation libraries)

---

## Project Structure

```txt
src/
├─ components/
│  ├─ interactions/
│  │  └─ InteractiveCard.vue
│  └─ ui/
│     └─ ToastStack.vue
├─ composables/
│  ├─ useInteractiveCard.ts
│  └─ useToast.ts
├─ pages/
│  └─ ShowcaseHome.vue
├─ App.vue
├─ main.ts
└─ style.css
```

## State Patterns Used

This project intentionally demonstrates common UI state patterns in Vue.

### 1) Parent-owned state -> props down, events up

The parent owns the state, and the child emits intent.

**Example: Accordion (Single-open policy in parent)**

- Child: `:isOpen` (prop) + `@update:isOpen` (event)
- Parent: decides which item stays open

### 2) v-model -> value editing components

When a component’s job is to update a value (on/off, selected tab, open/close),
`v-model` provides a clean two-way binding interface.

**Used in**

- ToggleSwitch -> `v-model`
- TabsNav -> `v-model`
- ModalDialog -> `v-model` (simple open/close case)

### 3) Policy lives in the parent

Components stay small and predictable.
More complex rules are implemented in the parent.

**Examples**

- Accordion single-open -> parent controls `openIndex`
- Tabs indicator -> UI reflects `activeTab` chosen by parent
