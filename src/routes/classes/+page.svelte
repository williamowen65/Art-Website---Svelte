<script>
  import Class from "./class.svelte";
  import AddClass from "./addClass.svelte";
  import TodoNote from "../../components/todoNote.svelte";

  const note = `
- sort classes by date
- create manager subdomain with login and the editable actions
  `;
</script>

<TodoNote {note} />
<Class></Class>
<AddClass></AddClass>

<style>
  :global(.class-container) {
    margin-bottom: 100px;
  }
</style>
