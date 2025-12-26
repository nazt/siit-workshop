# GEMINI.md - Project Context & AI Guidelines

**Date:** December 26, 2025
**Project:** Web-based Space Shooter
**Environment:** Linux / GitHub Codespaces
**Version:** 1.1.0 (Merged with AI Guidelines)

---

## 📚 Table of Contents
1.  [Project Context](#project-context)
2.  [Workflows & Short Codes](#workflows--short-codes)
3.  [Critical Safety Rules](#critical-safety-rules)
4.  [Development Guidelines](#development-guidelines)
5.  [Lessons Learned](#lessons-learned)
6.  [Retrospective Template](#retrospective-template)

---

## Project Context

### Overview
This project is a lightweight, client-side **Space Shooter game** built with standard web technologies. The goal is to provide an immediate, playable prototype demonstrating core game mechanics without heavy external dependencies.

### Technical Architecture
*   **Frontend Core:**
    *   **HTML5 Canvas API:** Used for high-performance 2D rendering (60 FPS).
    *   **Vanilla JavaScript (ES6+):** Logic implementation without frameworks.
        *   *Game Loop:* Utilizes `requestAnimationFrame`.
        *   *OOP Pattern:* Classes for `Bullet`, `Enemy`.
        *   *Collision:* AABB (Axis-Aligned Bounding Box).
    *   **CSS3:** Dark theme aesthetics, HUD overlays, Flexbox layout.
*   **Deployment & Runtime:**
    *   **Local Server:** `python3 -m http.server 8000` (wrapped with `nohup` for persistence).
    *   **Cloud IDE:** Requires port forwarding (e.g., `https://<codespace-name>-8000.app.github.dev`).

---

## Workflows & Short Codes

This project adopts a structured workflow to maintain context and efficiency.

### Core Short Codes
| Code | Name | Purpose |
| :--- | :--- | :--- |
| **`ccc`** | **Create Context** | Gather git status, log, and create a context issue to save session state. |
| **`nnn`** | **Next Task Plan** | Analyze context and create a detailed implementation plan (No coding, just planning). |
| **`gogogo`** | **Execute** | Execute the most recent plan issue step-by-step. |
| **`lll`** | **List Status** | Show project status, open issues, and recent commits. |
| **`rrr`** | **Retrospective** | Create a detailed session retrospective log. |

### The `ccc` → `nnn` Pattern
1.  **`ccc`**: Preserves the current state.
2.  **`nnn`**: Uses that state to plan the next move.
3.  This separation prevents "context amnesia" and ensures clear, actionable tasks.

---

## Critical Safety Rules

### Repository & Git
*   **NEVER** use `-f` or `--force` on git commands (push, checkout, clean).
*   **NEVER** merge Pull Requests without explicit user instruction.
*   **ALWAYS** verify `git status` before committing.

### File & System
*   **NEVER** use `rm -rf` without confirmation/understanding.
*   **ALWAYS** explain destructive commands before execution.
*   **ALWAYS** use non-interactive flags (e.g., `-y`) for installations *after* explaining them to the user (to avoid hanging processes).

---

## Development Guidelines

### Testing Discipline
*   **Manual Checklist:**
    *   [ ] Verify build success (no console errors).
    *   [ ] Test core mechanics (Movement, Shooting, Game Over).
    *   [ ] Check responsiveness.

### GitHub Workflow
1.  **Issue:** Create detailed issue for features/bugs.
2.  **Branch:** `feat/description` or `fix/description`.
3.  **PR:** Create PR with descriptive body (`Fixes #issue`).
4.  **Review:** Wait for user confirmation to merge.

---

## Lessons Learned

### Project-Specific (Space Shooter)
*   **Workflow Optimization (Automation):**
    *   **Lesson:** Commands waiting for input (like `apt install`) hang the agent.
    *   **Fix:** Always use `-y` or silent flags for setups.
*   **Process Management:**
    *   **Lesson:** Background processes (`&`) die when the shell session refreshes.
    *   **Fix:** Use `nohup <command> > log 2>&1 &` to ensure persistence.
*   **Prototyping:**
    *   **Lesson:** "Shapes first, Sprites later" allows for immediate gameplay verification.

### General AI Development
*   **Context Management:** Using specific issues to dump context (`ccc`) before planning (`nnn`) reduces hallucination and loss of focus.
*   **Phased Planning:** Breaking complex tasks into 1-hour chunks prevents overwhelming monolithic plans.
*   **User Preference:** Users prefer "Fire and Forget" commands over interactive prompts that require manual intervention.

---

## Retrospective Template
*Use this structure when running `rrr`*

```markdown
# Session Retrospective
**Date:** YYYY-MM-DD
**Focus:** [Feature/Bug/Refactor]

## Session Summary
[Brief overview of what was accomplished]

## 📝 AI Diary (Mandatory)
[First-person narrative of the experience, decisions, and thought process]

## 💭 Honest Feedback (Mandatory)
[Frank assessment of tools, process, and friction points]

## Technical Details
*   Files Modified: ...
*   Key Decisions: ...

## Next Steps
*   [ ] ...
```