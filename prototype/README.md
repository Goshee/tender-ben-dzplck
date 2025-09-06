# Scroll C-003 — Prototype: Unity 2.5D Grid

This folder contains a minimal Unity prototype scaffold for the "Volume Glyph" prototype (2.5D sprites on cards).

What this prototype includes
- A simple GridManager to spawn a grid of glyphs and handle basic tap/swap matching.
- Glyph script to represent Bee/Spider/Butterfly glyphs.
- CodexEmitter to POST ritual events to /codex/event (default: http://localhost:3000/codex/event).

How to use
1. Open Unity (2020.3 LTS / 2021.x recommended). Create or open a project and copy the `Assets/` folder contents into your project.
2. Create a Sprite-based prefab: `Assets/Prefabs/Glyph.prefab` with a SpriteRenderer and the `Glyph` script attached. Assign the glyph sprites.
3. Create an empty GameObject in the scene and attach `GridManager`.
   - Assign `glyphPrefab` to the prefab from step 2.
   - Configure rows/cols and spacing.
4. Run the scene on editor: tap/click to select and swap glyphs. Matches of 3+ will trigger a Codex event.
5. To see events in your Volume Glyph Console, make sure your dev server is running and exposes POST /codex/event and the console polls /codex/echo/list.

Notes
- This is a lightweight prototype to iterate fast; art & polish, touch smoothing, and animation can be added as follow-ups.
- For iOS testing: export to Xcode from Unity and build to device. Use iPhone 8+/iOS 16+ as target per the plan.
