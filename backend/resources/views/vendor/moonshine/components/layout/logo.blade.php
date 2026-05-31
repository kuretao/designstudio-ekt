@props([
    'href',
    'logo',
    'logoAttributes',
    'logoSmall',
    'logoSmallAttributes',
    'darkLogo' => null,
    'darkLogoSmall' => null,
])
<style>
    :root {
        --logo-stroke-outer: rgba(139,80,30,0.85);
        --logo-stroke-inner: rgba(139,80,30,0.55);
        --logo-stroke-center: rgba(120,65,20,0.8);
        --logo-fill-center: rgba(245,235,220,0.7);
        --logo-text-color: rgba(110,60,15,1);
    }
    .authentication-logo {
        --logo-stroke-outer: rgba(139,80,30,0.85);
        --logo-stroke-inner: rgba(139,80,30,0.55);
        --logo-stroke-center: rgba(120,65,20,0.8);
        --logo-fill-center: rgba(245,235,220,0.7);
        --logo-text-color: rgba(110,60,15,1);
    }
</style>
<a {{ $attributes->merge(['class' => 'logo block', 'rel' => 'home', 'href' => $href]) }}>
    <span class="flex items-center gap-2">
        <svg viewBox="-1.12 -1.12 2.24 2.24" class="block h-7 w-7 shrink-0" fill="none" aria-hidden="true">
            <g stroke="var(--logo-stroke-outer)" stroke-width="0.038">
                <circle cx="0.52" cy="0" r="0.52" transform="rotate(0)"></circle>
                <circle cx="0.52" cy="0" r="0.52" transform="rotate(60)"></circle>
                <circle cx="0.52" cy="0" r="0.52" transform="rotate(120)"></circle>
                <circle cx="0.52" cy="0" r="0.52" transform="rotate(180)"></circle>
                <circle cx="0.52" cy="0" r="0.52" transform="rotate(240)"></circle>
                <circle cx="0.52" cy="0" r="0.52" transform="rotate(300)"></circle>
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="32s" repeatCount="indefinite"></animateTransform>
            </g>
            <g stroke="var(--logo-stroke-inner)" stroke-width="0.028">
                <circle cx="0.34" cy="0" r="0.34" transform="rotate(30)"></circle>
                <circle cx="0.34" cy="0" r="0.34" transform="rotate(90)"></circle>
                <circle cx="0.34" cy="0" r="0.34" transform="rotate(150)"></circle>
                <circle cx="0.34" cy="0" r="0.34" transform="rotate(210)"></circle>
                <circle cx="0.34" cy="0" r="0.34" transform="rotate(270)"></circle>
                <circle cx="0.34" cy="0" r="0.34" transform="rotate(330)"></circle>
                <animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="22s" repeatCount="indefinite"></animateTransform>
            </g>
            <circle cx="0" cy="0" r="0.19" fill="var(--logo-fill-center)" stroke="var(--logo-stroke-center)" stroke-width="0.032"></circle>
        </svg>
        <span style="color: var(--logo-text-color);" class="text-center text-[9px] font-medium uppercase leading-none tracking-[0.42em]">
            3D Smart<span class="mt-1 block tracking-[0.5em]">Design</span>
        </span>
    </span>
</a>
