<script>
  import ImageSelection from "./imageSelection.svelte";
  const { name, label } = $$props;

  let description;

  function onPreview() {
    console.log("onPreview", {});
    jQuery(description).removeAttr("style");
  }
</script>

<div class="imageSection d-grid {name}">
  <ImageSelection {name} {label} {onPreview} />
  <div
    class="d-flex flex-column image-description-container"
    style="opacity: 0;"
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
