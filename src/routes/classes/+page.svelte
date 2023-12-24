<script>
  import { onMount } from "svelte";
  import AddClassModal from "./addClassModal.svelte";
  import ClassesProxy from "./classesProxy.svelte";

  const createClassModalId = "createClass";
  const editClassModalId = "editClass";
</script>

<ClassesProxy />
