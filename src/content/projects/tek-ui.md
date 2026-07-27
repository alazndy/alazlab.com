---
image: "/projects/tek-ui.png"
title: tek-ui
category: UI Infrastructure
area: lab
status: Stable
summary: A private design system and component library powering all T-Ecosystem applications — built on React 19, Tailwind v4, and Radix UI primitives.
techStack: [React 19, TypeScript, Tailwind CSS v4, Radix UI, Framer Motion, Storybook, pnpm Workspaces]
date: 2025-08-01
github: https://github.com/alazndy/tek-ui
---

## Overview

tek-ui is the shared UI foundation for all projects in the T-Ecosystem. Rather than rebuilding components from scratch in each project, tek-ui provides a consistent, accessible, and themeable component set that can be consumed as a package.

## Design Principles

- **Accessibility first** — All interactive components are built on Radix UI primitives, which handle focus management, keyboard navigation, and ARIA attributes out of the box.
- **Composable** — Components are small and composable rather than large and opinionated. A `Button` is a `Button`; complex patterns are assembled from primitives.
- **Themeable** — The design token system uses CSS custom properties, making dark/light mode and brand-specific themes trivial to implement.

## Component Categories

- **Layout** — Container, Grid, Stack, Divider
- **Inputs** — Button, Input, Select, Checkbox, Switch, Slider
- **Feedback** — Toast, Alert, Badge, Progress
- **Overlay** — Modal, Drawer, Tooltip, Popover, DropdownMenu
- **Data Display** — Table, Card, Avatar, Stat
- **Navigation** — Tabs, Breadcrumb, Pagination

## Tooling

Components are developed and documented in Storybook. The library is distributed via pnpm workspaces, with each consuming project importing directly from source for zero-bundle overhead.

## Status

Stable. Used in production across ENV-I and other active projects.
