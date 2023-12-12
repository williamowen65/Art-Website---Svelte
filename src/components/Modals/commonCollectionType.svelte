<script>
  import { afterUpdate, onMount } from "svelte";
  import ThisDropzone from "../General/thisDropzone.svelte";

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

  const filePickerProps = {
    multiple: false,
  };
</script>

<div class="field">
  <label>Card Banner Image</label>
  <ThisDropzone {filePickerProps} />
</div>
<div class="field">
  <label for="">Type</label>
  <select bind:this={typeSelect} name="" id=""></select>
</div>
