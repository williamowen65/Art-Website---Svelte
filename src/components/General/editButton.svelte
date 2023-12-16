<script>
  import { onMount } from "svelte";

  let { contentType, modalId, buttonActionType, hideAction, setData } = $$props;

  if (!hideAction) hideAction = {};

  if (!buttonActionType) buttonActionType = "open modal";

  function openModal(e) {
    console.log("openModal", { "e.target": e.target, contentType, modalId });
    if (setData) setData(jQuery(`#${modalId}`));
    jQuery(`#${modalId}`).modal("show");
  }
  function openFilePicker(e) {
    const container = jQuery(e.target).closest(".image-selection-field");
    const imgType = container.attr("data-imgType");
    container.find("input").click();
    // console.log("openFilePicker", { imgType });
  }

  const buttonAction =
    buttonActionType == "open modal" ? openModal : openFilePicker;

  onMount(() => {
    return () => {
      jQuery(`#${modalId}`).modal("hide");
    };
  });

  function removeFileInput(e) {
    jQuery(e.target).closest(".image-selection-field").remove();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span class="actions">
  <i class="fa fa-pencil" on:click={buttonAction}></i>
  {#if !hideAction.hasOwnProperty("remove")}
    <i class="fa fa-times" on:click={removeFileInput}></i>
  {/if}
</span>

<style lang="scss">
  .actions {
    background: rgb(235, 229, 229);
    border-radius: 5px 5px;
    position: absolute;
    top: 0px;
    right: 0px;
    margin: 5px;
    cursor: default;
    i {
      padding: 0px 5px;
      cursor: pointer;
      margin: 0px 5px;
    }
  }
  :global(.imageGroup .actions) {
    top: -17px !important;
  }
</style>
