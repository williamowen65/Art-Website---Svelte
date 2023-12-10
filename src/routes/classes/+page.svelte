<script>
  import { onMount } from "svelte";
  import AddClassModal from "./addClassModal.svelte";
  import ClassesProxy from "./classesProxy.svelte";

  const modalId = "createClass";

  function openModal(e) {
    const modal = jQuery(`#${modalId}`);
    modal.modal("show");
  }

  onMount(() => {
    return () => {
      jQuery(`#${modalId}`).modal("hide");
    };
  });
</script>

<div class="container mt-5">
  <button class="btn btn-primary" on:click={openModal}>Create Class</button>
</div>
<AddClassModal id={modalId} />
<ClassesProxy />
