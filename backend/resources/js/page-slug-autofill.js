(() => {
    const initializedForms = new WeakSet();

    const dictionary = {
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "e",
        ж: "zh",
        з: "z",
        и: "i",
        й: "i",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "h",
        ц: "c",
        ч: "ch",
        ш: "sh",
        щ: "sch",
        ъ: "",
        ы: "y",
        ь: "",
        э: "e",
        ю: "yu",
        я: "ya",
    };

    const transliterate = (value) =>
        value
            .toLowerCase()
            .split("")
            .map((char) => dictionary[char] ?? char)
            .join("");

    const slugifySegment = (value) =>
        transliterate(value)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/['"`’«»„“”]+/g, "")
            .replace(/&/g, " i ")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");

    const slugify = (value) => slugifySegment(value);

    const normalizeManualSlug = (value) =>
        value
            .split("/")
            .map((segment) => slugifySegment(segment))
            .filter(Boolean)
            .join("/");

    const emitInputEvents = (input, commit = false) => {
        input.dispatchEvent(new Event("input", { bubbles: true }));

        if (commit) {
            input.dispatchEvent(new Event("change", { bubbles: true }));
        }
    };

    const setInputValue = (input, value, commit = false) => {
        if (input.value === value) {
            return;
        }

        input.value = value;
        emitInputEvents(input, commit);
    };

    const initForm = (form) => {
        if (initializedForms.has(form)) {
            return;
        }

        const titleInput = form.querySelector('input[name="title_ru"]');
        const slugInput = form.querySelector('input[name="slug"]');
        const control = form.querySelector("[data-page-slug-autofill-control]");
        const toggle = control?.querySelector("[data-page-slug-autofill-toggle]");

        if (!titleInput || !slugInput || !control || !toggle) {
            return;
        }

        initializedForms.add(form);

        const slugWrapper = slugInput.closest('[data-field-selector="slug"]');

        const updateSlug = (commit = false) => {
            if (!toggle.checked) {
                return;
            }

            setInputValue(slugInput, slugify(titleInput.value), commit);
        };

        const syncState = () => {
            slugInput.readOnly = toggle.checked;
            control.classList.toggle("page-slug-autofill--enabled", toggle.checked);
            slugWrapper?.classList.toggle("page-slug-autofill-field--enabled", toggle.checked);
        };

        syncState();

        if (toggle.checked && slugInput.value.trim() === "") {
            updateSlug();
        }

        titleInput.addEventListener("input", () => updateSlug());
        titleInput.addEventListener("change", () => updateSlug(true));

        slugInput.addEventListener("change", () => {
            if (!toggle.checked) {
                setInputValue(slugInput, normalizeManualSlug(slugInput.value), true);
            }
        });

        toggle.addEventListener("change", () => {
            syncState();

            if (toggle.checked) {
                updateSlug(true);
                return;
            }

            slugInput.focus();
        });
    };

    const initAll = () => {
        document.querySelectorAll("form").forEach(initForm);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAll);
    } else {
        initAll();
    }

    new MutationObserver(initAll).observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
})();
