<script>
  import { doc, setDoc } from "firebase/firestore";
  import { onMount } from "svelte";
  import { db } from "../../../firebase";

  let { modalId, path, isPainting, id, toggleIsPublic } = $$props;

  export let isPublic;
  export let dataSource;

  onMount(() => {
    return () => {
      jQuery(`#${modalId}`).modal("hide");
    };
  });
</script>

{#if isPublic}
  <i
    class="fa fa-eye"
    on:click={() => toggleIsPublic(dataSource)}
    title="Make Private"
  ></i>
{:else}
  <i
    class="fa fa-eye-slash"
    on:click={() => toggleIsPublic(dataSource)}
    title="Make Public"
  ></i>
{/if}

<style>
  i {
    cursor: pointer;
  }
</style>
