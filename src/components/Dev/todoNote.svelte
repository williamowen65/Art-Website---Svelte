<script>
  import { marked } from "marked";
  export let note = "";

  function removeThis(e) {
    jQuery(e.target).closest(".toDo-note-container").remove();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="toDo-note-container" on:click={removeThis}>
  <div class="d-flex">
    <div class="text-nowrap pr-2">To Do:</div>
    <p>{@html marked(note)}</p>
  </div>
</div>

<style>
  .toDo-note-container {
    display: none;
    background: grey;
    position: absolute;
    top: 0px;
    z-index: 2;
    font-weight: bold;
    opacity: 0.95;
    padding: 10px;
    max-width: 400px;
  }
</style>
