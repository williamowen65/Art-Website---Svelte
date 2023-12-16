# Svelte Examples

- https://learn.svelte.dev/tutorial/update

# Lessons Learned

> Don't use jQuery within these statements.
> Tracking down the error was even more difficult because sveltes error handling (on the server to the frontend) doesn't include much information about the file source with the error.
```
  $: {
    const select = jQuery(typeSelect);
    for (let key in $tags) {
      if (!select.find(`option[value="${key}"]`).length) {
        const newOption = new Option(key, key, true, true);
        jQuery(typeSelect).append(newOption).trigger("change");
      }
    }
  }
```