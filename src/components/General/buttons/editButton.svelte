<script>
  import { onMount } from "svelte";

  let { contentType, modalId, buttonActionType, hideAction, setData } = $$props;

  if (!buttonActionType) buttonActionType = "open modal";

  function openModal(e) {
    // console.log("openModal", { "e.target": e.target, contentType, modalId });
    if (setData) setData(jQuery(`#${modalId}`), e);
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
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<i class="fa fa-pencil" on:click={buttonAction}></i>

<style lang="scss">
</style>
