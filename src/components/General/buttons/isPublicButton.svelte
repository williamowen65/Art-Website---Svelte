<script>
  import { doc, setDoc } from "firebase/firestore";
  import { onMount } from "svelte";
  import { db } from "../../../firebase";

  let { modalId, path, isPainting, id } = $$props;

  export let isPublic;

  onMount(() => {
    return () => {
      jQuery(`#${modalId}`).modal("hide");
    };
  });

  function toggleIsPublic(e) {
    console.log({ path });
    const cardPathFull = path;
    const lastSlash = cardPathFull.lastIndexOf("/");
    const cardPath = cardPathFull.slice(0, lastSlash);
    const cardId = cardPathFull.slice(lastSlash);
    console.log({ cardPath, cardId });
    const docRef = doc(db, cardPath, cardId);
    let payload = {
      isPublic: !isPublic,
    };

    if (isPainting) {
      payload = {
        paintings: {
          [id]: {
            isPublic: !isPublic,
          },
        },
      };
    }

    setDoc(docRef, payload, { merge: true });
  }
</script>

{#if isPublic}
  <i class="fa fa-eye" on:click={toggleIsPublic} title="Make Private"></i>
{:else}
  <i class="fa fa-eye-slash" on:click={toggleIsPublic} title="Make Public"></i>
{/if}

<style>
  i {
    cursor: pointer;
  }
</style>
