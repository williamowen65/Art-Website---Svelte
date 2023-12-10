<script>
  import EditButton from "../../components/General/editButton.svelte";
  import Modal from "../../components/General/modal.svelte";
  import { db } from "../../fakeData";
  import { marked } from "marked";
  const commissionText = db.textContent.commissions;
  //   console.log({ commissionText });

  const editTextModalId = "editTextModalId";
</script>

<div class="container position-relative mt-5">
  <EditButton modalId={editTextModalId} />
  {@html marked(commissionText)}
</div>

<Modal id={editTextModalId} showModal={false} classes="modal-lg">
  <span slot="headerText"> Edit Commissions Text </span>
  <span slot="body">
    <textarea class="w-100 form-control"></textarea>
  </span>
  <span slot="footer">
    <button class="btn btn-primary">Save</button>
  </span>
</Modal>
