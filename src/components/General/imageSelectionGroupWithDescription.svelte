<script>
  import ImageSelection from "./imageSelection.svelte";
  const { name, label } = $$props;

  let description;
  export let images;

  function onPreview() {
    console.log("onPreview", {});
    jQuery(description).removeAttr("style");
  }

  $: console.log("imageSelectionGroupWithDescription", { images });
</script>

<div class="imageSection d-grid {name}">
  <div>
    <label for="">{label}</label>
    <div class="imageGroup">
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
</style>
