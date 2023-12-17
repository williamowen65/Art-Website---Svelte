<script>
  import { afterUpdate, onMount } from "svelte";
  import ThisDropzone from "../General/thisDropzone.svelte";
  import ImageSelection from "../General/imageSelection.svelte";
  import { tags } from "../../stores";

  const { modalId } = $$props;

  /**
   * @type {HTMLSelectElement}
   */
  let typeSelect;

  afterUpdate(() => {
    jQuery(typeSelect).select2({
      dropdownParent: `#${modalId}`,
      width: "100%",
      tags: true,
    });
  });
  onMount(() => {
    // const select = jQuery(typeSelect);
    // for (let key in $tags) {
    //   if (!select.find(`option[value="${key}"]`).length) {
    //     const newOption = new Option(key, key, true, true);
    //     jQuery(typeSelect).append(newOption).trigger("change");
    //   }
    // }
    return () => {
      jQuery(typeSelect).select2("close");
    };
  });

  const filePickerProps = {
    multiple: false,
  };

  const hideAction = {
    remove: true,
  };

  $: console.log({ $tags });
</script>

<div class="d-flex">
  <div class="field">
    <ImageSelection name="cardBanner" label="Card Banner" {hideAction} />
  </div>

  <!-- <div class="field d-flex flex-column w-100">
    <label for="" class="mt-2">Description</label>
    <textarea name="" id="" class="w-100 form-control description"></textarea>
  </div> -->
</div>
<div class="field d-flex mt-3">
  <label for="" class="mr-3">Type</label>
  <select bind:this={typeSelect} name="" id="" width="100%">
    <option></option>
    {#each $tags as tag}
      <option value={tag.tag}>{tag.tag}</option>
    {/each}
  </select>
</div>

<style>
  .description {
    height: 200px;
  }
</style>
