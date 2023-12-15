<script>
  import ImageSelection from "./imageSelection.svelte";
  const { name, label } = $$props;

  let description;
  export let images;
  let inputGroup;

  function onPreview() {
    // console.log("onPreview", {});
    jQuery(description).removeAttr("style");
  }

  function addImageToGroup(e) {
    const modal = jQuery(e.target).closest(".modal");
    const group = jQuery(e.target).closest(".imageSection");

    const groupImages = jQuery(group).find(`input[type=file]`);
    const imageCount = groupImages.toArray().length;
    new ImageSelection({
      target: modal.find(inputGroup).get(0),
      props: {
        name: `${name}_image-${imageCount}`,
        hideLabel: true,
      },
    });
  }

  $: console.log("imageSelectionGroupWithDescription", { images });
</script>

<div class="imageSection d-grid {name}">
  <div>
    <label for=""
      >{label}
      <i class="fa fa-plus addImageToGroup" on:click={addImageToGroup}
      ></i></label
    >
    <div class="imageGroup d-flex flex-wrap" bind:this={inputGroup}>
      <!-- {#each images as image (image.id)}
        <ImageSelection
          name={image.id}
          label={image.id}
          {onPreview}
          hideLabel={true}
        />
      {/each} -->
    </div>
  </div>
  <div
    class="d-flex flex-column image-description-container"
    bind:this={description}
  >
    <label class="mb-0 mt-3"> Description <small>(optional)</small></label>
    <textarea class="form-control description"></textarea>
  </div>
</div>

<style lang="scss">
  .imageSection {
    grid-template-columns: 1fr 1fr;
    textarea {
      height: 100%;
    }
  }
  :global(.imageGroup img) {
    width: revert;
    width: 100%;
    min-width: 100px;
    padding-right: 5px;
  }

  .addImageToGroup {
    cursor: pointer;
  }
</style>
