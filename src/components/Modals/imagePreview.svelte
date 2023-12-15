<script>
  import { onMount } from "svelte";

  onMount(() => {
    jQuery("#imagePreviewModal").modal("show");
    return () => {
      jQuery("#imagePreviewModal").modal("hide");
    };
  });
</script>

<div class="modal" tabindex="-1" role="dialog" id="imagePreviewModal">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content overflow-hidden">
      <button
        type="button"
        class="close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <img class="imagePreview" />
    </div>
  </div>
</div>

<style lang="scss">
  #imagePreviewModal {
    .close {
      position: absolute;
      padding: 2px 10px;
    }
  }
</style>
