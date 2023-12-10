<script>
  import { afterUpdate, onMount } from "svelte";
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";

  const { modalId } = $$props;

  /**
   * @type {HTMLSelectElement}
   */
  let typeSelect;

  afterUpdate(() => {
    jQuery(typeSelect).select2({
      dropdownParent: `#${modalId}`,
    });
  });
  onMount(() => {
    return () => {
      jQuery(typeSelect).select2("close");
    };
  });
</script>

<div class="field">
  <label>Card Banner Image</label>
  <Dropzone />
</div>
<div class="field">
  <label for="">Type</label>
  <select bind:this={typeSelect} name="" id=""></select>
</div>
