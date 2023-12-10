<script>
  import { onMount } from "svelte";

  const { id, headerText, showModal } = $$props;

  onMount(() => {
    if (showModal) {
      jQuery(`#${id}`).modal("show");
    }
    return () => {
      jQuery(`#${id}`).modal("hide");
    };
  });
</script>

<div class="modal" tabindex="-1" role="dialog" {id}>
  <!-- <div class="modal" tabindex="-1" role="dialog"> -->
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="headerText" />
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="">
          <slot name="body" />
        </div>
      </div>
      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</div>
