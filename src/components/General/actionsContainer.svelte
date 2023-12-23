<script>
  import { onMount } from "svelte";

  let { contentType, modalId, buttonActionType, hideAction, setData } = $$props;
</script>

<span class="actions">
  <slot />
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
    :global(i) {
      padding: 0px 5px;
      cursor: pointer;
      margin: 0px 5px;
    }
  }
  :global(.imageGroup .actions) {
    top: -17px !important;
  }
</style>
