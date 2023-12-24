<script>
  import { getToDoList, getUid, getUrls } from "$lib/common";
  import Modal from "../../components/General/modal.svelte";
  import ThisDropzone from "../../components/General/dropzone/thisDropzone.svelte";

  // @ts-nocheck
  import Datetime from "./inputs/datetime.svelte";
  import { addDoc, collection, doc } from "firebase/firestore";
  import { db } from "../../firebase";
  import CommonClassModalBody from "../../components/Modals/commonClassModalBody.svelte";
  import { modalIds } from "../../stores";
  // let { createClassModalId, editClassModalId } = $$props;
  let saveBtn;
  let datesContainer;
  let dateCount = 1;

  const { editClassModalId, createClassModalId } = modalIds;

  // showModal = true;

  async function createNewClass(e) {
    console.log("createNewClass", {});
    const container = jQuery(e.target).closest(".modal");
    const oldBtnText = jQuery(saveBtn).html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);

    const title = container.find(".classTitle").val();
    const description = container.find(".description").val();
    const dateString = container.find(".dateString").val();
    const cost = container.find(".cost").val();
    const numberOfSpots = container.find(".numberOfSpots").val();
    const isPublic = container.find("input[name=public]").prop("checked");

    const payload = {
      title,
      description,
      dateString,
      cost,
      numberOfSpots,
      isPublic,
      pictures: {},
    };

    const files = container
      .find(".selectedImg")
      .toArray()
      .reduce((curr, prev) => {
        const imageData = jQuery(prev).data();
        const isMain = jQuery(prev).find("input[type=radio]").prop("checked");
        imageData.theFile.isMain = isMain;
        curr[imageData.theFile.name] = imageData.theFile;
        return curr;
      }, {});
    console.log({ files });
    const urlResponse = await getUrls(files);
    for (let key in urlResponse) {
      const randomId = getUid();
      payload.pictures[randomId] = {
        isMain: urlResponse[key].file.isMain,
        url: urlResponse[key].url,
      };
    }

    console.log("createNewClass", { payload });

    const classCollection = collection(db, "classes");
    addDoc(classCollection, payload).then(() => {
      jQuery(`#${createClassModalId}`).modal("hide");
      // clear filesToSave
      container.find(".classTitle").val("");
      container.find(".description").val("");
      container.find(".dateString").val("");
      container.find(".cost").val("");
      container.find(".numberOfSpots").val("");
      container.find("input[name=public]").removeProp("checked");
      container.find("img").remove();
      jQuery(saveBtn).html(oldBtnText);
    });
  }
</script>

<Modal id={createClassModalId} showModal={false} classes="modal-lg">
  <span slot="headerText">
    <h4 class="title align-self-center">Create New Class</h4>
  </span>
  <span slot="body">
    <CommonClassModalBody />
  </span>
  <span slot="footer">
    <button
      on:click={createNewClass}
      bind:this={saveBtn}
      class="align-self-baseline btn btn-primary">Submit</button
    >
  </span>
</Modal>

<Modal id={editClassModalId} showModal={false} classes="modal-lg">
  <span slot="headerText">
    <h4 class="title align-self-center">Edit Class</h4>
  </span>
  <span slot="body">
    <CommonClassModalBody />
  </span>
  <span slot="footer">
    <button bind:this={saveBtn} class="align-self-baseline btn btn-primary"
      >Submit</button
    >
  </span>
</Modal>

<style>
</style>
