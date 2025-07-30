# Design Guide

This document serves as the single source of truth for the visual identity and design principles of the Claude Code Agents project website. All new components and pages should adhere to this guide to ensure consistency and quality.

## Core Philosophy

Our design is driven by the principles outlined in our knowledge base:

-   **Making Users Awesome:** Our primary goal is to create an experience that is intuitive, performant, and empowers the user.
-   **HTML First & Mobile First:** We prioritize content and structure, starting with the smallest viewport and progressively enhancing.

## 1. Logo & Logotype

We use a text-based logotype. It is composed of the project name and a descriptive tagline.

-   **Primary Text:** `Claude Code Agents`
-   **Secondary Text:** `| An AI-Powered Development Team`
-   **Usage:** The primary text should be bold, and the secondary text should be a lighter weight and slightly smaller.

## 2. Color Palette

Our color system is designed to be clean, professional, and accessible. It supports both light and dark modes automatically via CSS variables.

### Light Mode (Default)

-   `--primary-color`: `#4A5568` (Slate Blue - for interactive elements)
-   `--text-primary`: `#1A202C` (Dark Gray - for body text)
-   `--text-secondary`: `#718096` (Medium Gray - for subtitles)
-   `--background-color`: `#FFFFFF` (White)
-   `--border-color`: `#E2E8F0` (Light Gray)

### Dark Mode (`@media (prefers-color-scheme: dark)`)

-   `--primary-color`: `#A0AEC0` (Light Slate Blue)
-   `--text-primary`: `#E2E8F0` (Light Gray)
-   `--text-secondary`: `#A0AEC0` (Medium Gray)
-   `--background-color`: `#1A202C` (Dark Gray)
-   `--border-color`: `#4A5568` (Slate Blue)

## 3. Typography

We use a system font stack to ensure optimal performance and a native feel.

-   **CSS `font-family`:** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`
-   **Body Text:** Should be set at a comfortable reading size (e.g., 16px or 1rem base).
-   **Headings:** Should use a clear typographic scale with descending weights or sizes to establish a strong visual hierarchy.

## 4. Spacing & Layout

-   A consistent spacing scale (e.g., based on a 4px or 8px grid) should be used for all margins, paddings, and layout components to ensure a harmonious rhythm.
-   Layouts should remain simple and focused on readability.
