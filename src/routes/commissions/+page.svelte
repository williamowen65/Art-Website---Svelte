<script>
  import EditButton from "../../components/General/editButton.svelte";
  import Modal from "../../components/General/modal.svelte";
  import { db as fake_db } from "../../fakeData";
  import { marked } from "marked";
  import { isLoggedIn } from "../../stores";
  const commissionText = fake_db.textContent.commissions;
  //   console.log({ commissionText });

  const editTextModalId = "editTextModalId";
  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";
</script>

<div class="container position-relative mt-5">
  <div class={ifLoggedInClass}>
    <EditButton modalId={editTextModalId} />
  </div>
  {@html marked(commissionText)}
</div>

<div class={ifLoggedInClass}>
  <Modal id={editTextModalId} showModal={false} classes="modal-lg">
    <span slot="headerText"> Edit Commissions Text </span>
    <span slot="body">
      <textarea class="w-100 form-control"></textarea>
    </span>
    <span slot="footer">
      <button class="btn btn-primary">Save</button>
    </span>
  </Modal>
</div>
