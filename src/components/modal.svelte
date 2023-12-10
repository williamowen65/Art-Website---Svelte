<script>
  import { onMount } from "svelte";

  /**
   * @type {HTMLDivElement}
   */
  let onPageLoadPopUp;

  onMount(() => {
    // @ts-ignore
    jQuery(onPageLoadPopUp).modal("show");
    return () => {
      jQuery(onPageLoadPopUp).modal("hide");
    };
  });
</script>

<div bind:this={onPageLoadPopUp} class="modal" tabindex="-1" role="dialog">
  <!-- <div class="modal" tabindex="-1" role="dialog"> -->
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <button
          type="button"
          class="close px-1"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div>
          <button class="action btn" data-dismiss="modal">Paintings</button>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  button {
    cursor: pointer;
    position: absolute;
    &.close {
      right: 0;
      top: 0;
      outline: none;
      span {
        outline: none;
      }
    }
    &.action {
      top: 50%;
      left: 50%;
      translate: -50% -50%;
    }
  }
  .modal-content {
    overflow: hidden;
    background-image: url("https://media.istockphoto.com/id/108161719/photo/close-up-of-blue-flower-petals.jpg?s=1024x1024&w=is&k=20&c=ywZ-Ygp2MXZPOmYT0sppcz0cqQxzfSmPg1YoGTqXn2U=");
    height: 70vh;
  }
</style>
