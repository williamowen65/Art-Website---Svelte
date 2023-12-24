<script>
  import Class from "./class.svelte";
  import AddClass from "./addClassModal.svelte";
  import TodoNote from "../../components/Dev/todoNote.svelte";
  // import { dbb as fake_db } from "../../fakeData";
  import { isLoggedIn, classes, modalIds } from "../../stores";
  import AddClassModal from "./addClassModal.svelte";
  import { onMount } from "svelte";
  import AddButton from "../../components/General/buttons/addButton.svelte";
  import { page } from "$app/stores";

  const { editClassModalId, createClassModalId } = modalIds;

  const note = `
  - sort classes by date
  - create manager subdomain with login and the editable actions
    `;

  function openModal(e) {
    console.log("  function openModal(e) {", { createClassModalId });
    const modal = jQuery(`#${createClassModalId}`);
    modal.modal("show");
  }

  onMount(() => {
    return () => {
      jQuery(`#${createClassModalId}`).modal("hide");
    };
  });
</script>

<span class="d-flex {$page.route.id == '/' ? 'justify-content-center' : ''}">
  <h2>Classes</h2>
  {#if $isLoggedIn}
    <AddButton modalId={createClassModalId} />
  {/if}
</span>
<AddClassModal />

<!-- {#if Object.values($classes).length} -->
<!-- {@debug classes} -->
<TodoNote {note} />
{#each Object.values($classes) as classData (classData.id)}
  <Class {classData}></Class>
{/each}
{#if $isLoggedIn}
  <AddClass></AddClass>
{/if}

<!-- {/if} -->

<style>
  :global(.class) {
    margin: 100px 0px;
    /* height: 80vh; */
    display: flex;
    align-content: center;
  }
  .class-container {
    min-height: 50vh;
  }
</style>
