<script>
  import { afterUpdate, onMount } from "svelte";
  import ThisDropzone from "../General/dropzone/thisDropzone.svelte";
  import ImageSelection from "../General/imageSelection.svelte";
  import { allPaintings, paintingsByType, tags } from "../../stores";
  import {
    hashObjects,
    hashObjectsManyToOne,
    initBootstrapConfirmation,
  } from "$lib/common";
  import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
  import { db } from "../../firebase";

  const { modalId } = $$props;

  /**
   * @type {HTMLSelectElement}
   */
  let typeSelect;
  let tagButton = [];
  let isRenaming = false;

  function deleteTag() {
    // Workaround for bootstrap confirmation
    const isConfirmOpen = jQuery(tagButton[0]).attr("aria-describedby");
    if (isConfirmOpen) {
      const selection = jQuery(typeSelect).select2("data")[0].id;
      console.log("deleteTag", { selection });
      const tagDoc = doc(db, "paintings", "tags");
      const payload = {
        [selection]: deleteField(),
      };
      updateDoc(tagDoc, payload).then(() => {
        jQuery(typeSelect).find(`option[value="${selection}"]`).remove();
        jQuery(typeSelect).val(null).trigger("change");
        tagButton.forEach((btn) => {
          jQuery(btn).attr("disabled", "disabled");
        });
      });
    }
  }

  function formatState(state) {
    if (!state.id) {
      return state.text;
    }
    console.log("formatState", { state });

    var state2 = jQuery(`
    <div class="d-flex justify-content-between">
      <span>${state.text}</span>
      <span class="small"> ${state.numberOfPaintings} Painting${
        state.numberOfPaintings == 1 ? "" : "s"
      }</span>

    </div>
    `);
    return state2;
  }

  afterUpdate(() => {
    const config = {
      dropdownParent: `#${modalId}`,
      width: "100%",
      tags: true,
      placeholder: "Search or Create a Type",
      templateResult: formatState,
      data: $tags.map((el) => {
        return {
          id: el.tag,
          text: el.tag,
          numberOfPaintings: $paintingsByType[el.tag]?.length || 0,
        };
      }),
    };
    console.log({ config, paintingsByType });
    jQuery(typeSelect).select2(config);
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
    initBootstrapConfirmation();
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
  <div class="w-100">
    <select bind:this={typeSelect} name="" id="" width="100%">
      <!-- <option></option>
      {#each $tags as tag}
        <option value={tag.tag} data-testing="1234">{tag.tag}</option>
      {/each} -->
    </select>
    {#if isRenaming}
      <input
        type="text"
        name=""
        id=""
        class="w-100 form-control"
        placeholder="Rename the above type"
      />
    {/if}
  </div>
  <div class="d-flex flex-column">
    <div class="btn-group">
      <button
        class="btn btn-sm btn-secondary deleteTag tagAction"
        disabled
        on:click={deleteTag}
        bind:this={tagButton[0]}
        data-toggle="confirmation"
        data-title="Are you sure?"
        data-content="This might be dangerous">Delete Type</button
      >
      <button
        class="btn btn-sm btn-secondary renameTag tagAction"
        disabled
        bind:this={tagButton[1]}
        on:click={() => (isRenaming = !isRenaming)}
      >
        Rename Type</button
      >
    </div>
    {#if isRenaming}
      <div class="btn btn-sm btn-secondary">Save new name</div>
    {/if}
  </div>
</div>

<style>
  .form-control {
    padding: 0.175rem 0.75rem;
  }
  .description {
    height: 200px;
  }
  .tagAction {
    height: 28px;
    padding-top: 2px;
    /* &.renameTag {
      border-radius: 0 0.25rem 0.25rem 0px;
    }
    &.deleteTag {
      border-radius: 0.25rem 0 0 0.25rem;
    } */
  }
</style>
