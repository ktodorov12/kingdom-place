# Design System Document

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Sovereign Minimalist."** 

This system rejects the cluttered, "busy" aesthetic of traditional barbershop sites in favor of a high-end editorial experience. It marries the raw, unyielding geometry of **Minimalist Brutalism** with the intricate, ornate prestige of **Vintage Royalty**. We achieve this through a "heavy-base" layout: deep, cavernous blacks contrasted with razor-sharp gold accents. 

To break the "template" look, the system relies on intentional asymmetry—such as oversized serif typography bleeding off-grid and high-contrast photography that uses shadow as a structural element. The goal is to make the user feel like they are entering a private club, not just browsing a service menu.

## 2. Colors
The palette is a calculated balance of absolute darkness and metallic radiance.

*   **Primary Backgrounds:** `surface` (#131313) provides a deeper, more sophisticated foundation than pure black, allowing for "truer" blacks to be used in imagery and shadows.
*   **The Gold Standard:** We use a primary gold (`primary`: #F2CA50) and its container variant (`primary_container`: #D4AF37) for all CTAs and interactive elements.
*   **The "No-Line" Rule:** Sectioning must never be achieved with 1px solid borders. Boundaries are defined through background shifts. For instance, a booking module should use `surface_container_low` (#1B1B1B) to distinguish itself from the `surface` background.
*   **Surface Hierarchy:** Use the `surface_container` tiers to create depth. A profile card should sit at `surface_container_high` (#2A2A2A) to naturally "lift" off the page without artificial lines.
*   **Signature Textures:** Use linear gradients for primary buttons, transitioning from `#D4AF37` to `#F2CA50` at a 45-degree angle. This mimics the luster of polished brass and prevents a "flat" digital appearance.

## 3. Typography
Typography is the voice of the brand. It must feel both authoritative and bespoke.

*   **Display & Headlines (Newsreader):** This serif font is our "Royal" element. Use `display-lg` for hero statements. To achieve the editorial look, use tight letter-spacing (-0.02em) and consider "Justified" alignments in large-scale typography blocks to lean into the brutalist vibe.
*   **Titles & Body (Manrope):** The modern sans-serif. It provides the "Minimalist" counter-balance. Use `body-lg` for readability. In the context of the service menu (referencing the provided imagery), use `label-md` for prices to maintain a clean, high-contrast grid.
*   **Hierarchy Note:** High-end design lives in the contrast. Pair an oversized `display-lg` heading with a significantly smaller `label-sm` sub-header in uppercase with wide tracking (+0.2em) to create a premium, rhythmic tension.

## 4. Elevation & Depth
In a dark UI, traditional shadows often disappear. We use **Tonal Layering** and **Luminescence** instead.

*   **The Layering Principle:** Stacking is our primary tool. A `surface_container_highest` (#353535) element placed on top of a `surface_dim` (#131313) base creates a natural physical presence.
*   **Ambient Shadows:** When a float is required (e.g., a modal), use a shadow tinted with `on_surface` (#E2E2E2) at 4% opacity. This creates a "glow" rather than a "dark spot," mimicking how light hits a dark surface in a physical barbershop.
*   **The "Ghost Border" Fallback:** For input fields or secondary buttons, use the `outline_variant` token (#4D4635) at 20% opacity. This creates a suggestion of a border that only reveals itself upon close inspection.
*   **Glassmorphism:** For navigation bars or floating "Book Now" buttons, use `surface` with a 70% opacity and a `20px` backdrop-blur. This allows the high-contrast imagery to bleed through, maintaining the "luxury lifestyle" atmosphere.

## 5. Components

### Buttons
*   **Primary:** Solid Gold Gradient (`primary` to `primary_container`). **Sharp 0px corners.** No roundedness. Text is `on_primary` (#3C2F00) in `label-md` bold, all-caps.
*   **Secondary:** Ghost style. `outline` color border at 20% opacity with `primary` gold text.
*   **Tertiary:** Pure text in `primary` with a 1px gold underline that expands on hover.

### Input Fields
*   **Style:** Minimalist. No background fill. A single bottom border using `outline_variant`. 
*   **Focus State:** The bottom border transitions to a `primary` gold glow. Labels move from `body-md` to `label-sm` above the line.

### Cards & Lists (The Service Menu)
*   **Rule:** Forbid divider lines. Referencing the provided price list, use the Spacing Scale `8` (2.75rem) to separate categories. 
*   **List Items:** Use `body-lg` for service names. Use a "dotted leader" only if it matches the vintage-royal vibe; otherwise, use right-aligned bold prices in `primary` gold to draw the eye.

### Interactive "Glow"
*   Hover states on images should trigger a subtle `primary` inner shadow or a "gold flash" transition to simulate the reflective quality of a barber’s mirror.

## 6. Do's and Don'ts

*   **DO:** Use extreme white space. If you think there is enough space, add 20% more.
*   **DO:** Use high-contrast, desaturated photography. The gold in the UI should be the only vibrant color on the screen.
*   **DO:** Utilize the **0px roundedness** scale. Everything is sharp, precise, and masculine.
*   **DON'T:** Use standard "Drop Shadows." They look muddy on dark backgrounds. Use tonal shifts.
*   **DON'T:** Use generic icons. If an icon is needed, it should be custom-drawn with a stroke weight that matches the `outline` token.
*   **DON'T:** Center-align everything. Use the "Minimalist Brutalist" approach—align elements to the far left or right of the container to create a dynamic, sophisticated path for the eye.