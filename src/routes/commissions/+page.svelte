<script>
  // @ts-nocheck

  import EditButton from "../../components/General/editButton.svelte";
  import Modal from "../../components/General/modal.svelte";
  // import { db as fake_db } from "../../fakeData";
  import { marked } from "marked";
  import { isLoggedIn } from "../../stores";
  import { onMount } from "svelte";
  import { doc, onSnapshot, setDoc } from "firebase/firestore";
  import { db } from "../../firebase";
  const commissionText = "test";
  //   console.log({ commissionText });

  const modalId = "editTextModalId";
  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";

  const commissionsDoc = doc(db, "textContent", "commissions");
  let commissionsData = {};
  onSnapshot(commissionsDoc, (doc) => {
    console.log("Current data: ", doc.data());
    commissionsData = doc.data();
  });

  onMount(() => {
    jQuery(`#${modalId}`).on("show.bs.modal", populateForm);
    return () => {
      jQuery(`#${modalId}`).modal("hide");
    };
  });

  function populateForm() {
    const modal = jQuery(`#${modalId}`);
    // console.log("populateForm", { bannerData, modal, urlsToSave });
    modal.find(".description").val(commissionsData.description);
  }
  function saveCommissionsText(e) {
    console.log("saveCommissionsText", {});
    const container = jQuery(e.target).closest(".modal");
    const saveBtn = container.find(".saveBtn");
    const oldBtnText = jQuery(saveBtn).html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);
    const description = container.find(".description").val();
    const payload = {
      description,
    };
    setDoc(commissionsDoc, payload).then(() => {
      jQuery(`#${modalId}`).modal("hide");
      // // clear filesToSave
      container.find(".description").val("");
      jQuery(saveBtn).html(oldBtnText);
    });
  }

  $: commissionsDescription = commissionsData.description || "";
</script>

<div class="container position-relative mt-5">
  <div class={ifLoggedInClass}>
    <EditButton {modalId} />
  </div>
  {@html marked(commissionsDescription)}
</div>

<div class={ifLoggedInClass}>
  <Modal id={modalId} showModal={false} classes="modal-lg">
    <span slot="headerText"> Edit Commissions Text</span>
    <span slot="body">
      <textarea class="w-100 form-control description"></textarea>
    </span>
    <span slot="footer">
      <button class="btn btn-primary saveBtn" on:click={saveCommissionsText}
        >Save</button
      >
    </span>
  </Modal>
</div>
