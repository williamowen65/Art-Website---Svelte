<script>
  import { doc, setDoc } from "firebase/firestore";
  import { onMount } from "svelte";
  import { db } from "../../../firebase";

  let { modalId, isPublic, path } = $$props;

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
    setDoc(
      docRef,
      {
        isPublic: !isPublic,
      },
      { merge: true }
    );
  }
</script>

{#if isPublic}
  <i class="fa fa-eye" on:click={toggleIsPublic} title="Make Private"></i>
{:else}
  <i class="fa fa-eye-slash" on:click={toggleIsPublic} title="Make Public"></i>
{/if}
