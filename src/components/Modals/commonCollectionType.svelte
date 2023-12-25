<script>
  import { afterUpdate, onMount } from "svelte";
  import ThisDropzone from "../General/dropzone/thisDropzone.svelte";
  import ImageSelection from "../General/imageSelection.svelte";
  import { tags } from "../../stores";

  const { modalId } = $$props;

  /**
   * @type {HTMLSelectElement}
   */
  let typeSelect;
  let tagButton = [];

  function deleteTag() {
    console.log("deleteTag", {});
  }

  function formatState(state) {
    if (!state.id) {
      return state.text;
    }

    var state2 = jQuery(`
    <div class="d-flex justify-content-between">
      <span>${state.text}</span>
    </div>
    `);
    return state2;
  }

  afterUpdate(() => {
    jQuery(typeSelect).select2({
      dropdownParent: `#${modalId}`,
      width: "100%",
      tags: true,
      templateResult: formatState,
    });
    jQuery(typeSelect).on("select2:select", () => {
      const selection = jQuery(typeSelect).select2("data")[0].id;
      if (selection) {
        tagButton.forEach((btn) => {
          jQuery(btn).removeAttr("disabled");
        });
      } else {
        tagButton.forEach((btn) => {
          jQuery(btn).attr("disabled", "disabled");
        });
      }
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

  const hideAction = {
    remove: true,
  };

  // $: console.log({ $tags });
</script>

<div class="d-flex">
  <div class="field">
    <ImageSelection name="cardBanner" label="Card Banner" {hideAction} />
  </div>

  <div class="field d-flex align-items-baseline mt-2 mx-auto">
    <label class="mb-0 mr-3">Public</label>
    <input type="checkbox" name="public" class="form-control" />
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
  <button
    class="btn btn-sm btn-secondary deleteTag tagAction"
    disabled
    bind:this={tagButton[0]}
    data-toggle="confirmation">Delete Tag</button
  >
  <button
    class="btn btn-sm btn-secondary renameTag tagAction"
    disabled
    bind:this={tagButton[1]}>Rename Tag</button
  >
</div>

<style>
  .description {
    height: 200px;
  }
  .tagAction {
    height: 28px;
    padding-top: 2px;
    &.renameTag {
      border-radius: 0 0.25rem 0.25rem 0px;
    }
    &.deleteTag {
      border-radius: 0.25rem 0 0 0.25rem;
    }
  }
</style>
