<script>
  import Class from "./class.svelte";
  import AddClass from "./addClassModal.svelte";
  import TodoNote from "../../components/Dev/todoNote.svelte";
  import { db as fake_db } from "../../fakeData";
  import { isLoggedIn } from "../../stores";

  const note = `
  - sort classes by date
  - create manager subdomain with login and the editable actions
    `;

  const classes = Object.entries(fake_db.classes).map(([id, el]) => {
    // @ts-ignore
    el.id = id;
    return el;
  });
  // console.log({ classes });
  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";
</script>

<div class="container">
  <TodoNote {note} />
  {#each classes as classData}
    <div class="class-container">
      <Class {classData}></Class>
    </div>
  {/each}
  <div class={ifLoggedInClass}>
    <AddClass></AddClass>
  </div>
</div>

<style>
  :global(.class) {
    margin: 100px 0px;
    /* height: 80vh; */
    display: flex;
    align-content: center;
  }
  .class-container {
    height: 50vh;
  }
</style>
