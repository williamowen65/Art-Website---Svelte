<script>
  import Class from "./class.svelte";
  import AddClass from "./addClass.svelte";
  import TodoNote from "../../components/Dev/todoNote.svelte";

  const note = `
  - sort classes by date
  - create manager subdomain with login and the editable actions
    `;
</script>

<div class="container">
  <TodoNote {note} />
  <Class></Class>
  <AddClass></AddClass>
</div>

<style>
  :global(.class-container) {
    margin-bottom: 100px;
  }
</style>
