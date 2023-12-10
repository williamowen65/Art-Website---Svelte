<script>
  import { onMount } from "svelte";

  const { contentType, modalId } = $$props;

  function createContent(e) {
    console.log("editContent", { "e.target": e.target, contentType, modalId });
    jQuery(`#${modalId}`).modal("show");
  }

  onMount(() => {
    return () => {
      jQuery(`#${modalId}`).modal("hide");
    };
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<i class="fa fa-plus add" on:click={createContent}></i>

<style>
  .add {
    background: white;
    padding: 10px;
    border-radius: 50%;
    /* position: absolute;
    top: 0px;
    right: 0px; */
    margin: 5px;
    cursor: pointer;
  }
</style>
