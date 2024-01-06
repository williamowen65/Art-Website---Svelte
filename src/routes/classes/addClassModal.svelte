<script>
  import { getToDoList, getUid, getUrls } from "$lib/common";
  import Modal from "../../components/General/modal.svelte";
  import ThisDropzone from "../../components/General/dropzone/thisDropzone.svelte";

  // @ts-nocheck
  import Datetime from "./inputs/datetime.svelte";
  import { addDoc, collection, doc, setDoc } from "firebase/firestore";
  import { db } from "../../firebase";
  import CommonClassModalBody from "../../components/Modals/common/commonClassModalBody.svelte";
  import { isLoggedIn, modalIds } from "../../stores";
  import { onMount } from "svelte";
  import PreviewImage from "../../components/General/dropzone/previewImage.svelte";
  // let { createClassModalId, editClassModalId } = $$props;
  let saveBtn;
  let datesContainer;
  let dateCount = 1;

  const { editClassModalId, createClassModalId } = modalIds;

  onMount(() => {
    jQuery(`#${editClassModalId}`).on("show.bs.modal", populateForm);
    jQuery(`#${editClassModalId}`).on("hide.bs.modal", clearModal);
    jQuery(`#${createClassModalId}`).on("hide.bs.modal", clearModal);
    return () => {};
  });
  // showModal = true;

  function populateForm(e) {
    console.log("populateForm", {});
    const container = jQuery(`#${editClassModalId}`);
    const classData = container.data();
    console.log({ classData });
    // empty zone to prevent stupid duplication issue
    const randomId = getUid();
    container.find(".preview-zone").empty();
    Object.entries(classData.pictures || {}).forEach(([id, painting]) => {
      const data = painting;
      console.log(painting);
      new PreviewImage({
        target: container.find(".preview-zone").get(0),
        props: {
          name: id,
          data: painting,
          radioId: randomId,
          imageId: id,
        },
      });
      // container.find('.image-zone').append(<PreviewImage {data} {name} />)
    });
    container.find(".classTitle").val(classData.title);
    container.find(".description").val(classData.description);
    container.find(".dateString").val(classData.dateString);
    container.find(".cost").val(classData.cost);
    container.find(".numberOfSpots").val(classData.numberOfSpots);
    container.find("input[name=public]").prop("checked", classData.isPublic);
  }

  async function getPayload(e) {
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

    const imgs = container.find(".selectedImg").toArray();
    const files = await Promise.all([
      ...imgs.map((el) => {
        const imageData = jQuery(el).data();
        const isMain = jQuery(el).find("input[type=radio]").prop("checked");
        imageData.isMain = isMain;
        // imageData.id; is set
        return new Promise(async (resolve, rej) => {
          if (imageData.theFile) {
            const urls = await getUrls({
              [imageData.name]: imageData.theFile,
            });
            console.log({ imageData, urls });
            imageData.url = urls[imageData.name].url;
          }
          resolve(imageData);
        });
      }),
    ]);

    for (let key in files) {
      const randomId = files[key].id || getUid();
      console.log({ key, files, "files[key]": files[key] });
      payload.pictures[randomId] = {
        isMain: files[key].isMain,
        url: files[key].url || "",
      };
    }

    console.log({ payload, files, imgs });

    return payload;
  }

  function clearModal(e) {
    console.log("clearModal", { saveBtn });
    // clear filesToSave
    const container = jQuery(e.target).closest(".modal");
    container.find(".preview-zone").empty();
    container.find(".classTitle").val("");
    container.find(".description").val("");
    container.find(".dateString").val("");
    container.find(".cost").val("");
    container.find(".numberOfSpots").val("");
    container.find("input[name=public]").removeProp("checked");
    container.find("img").remove();
    jQuery(saveBtn).html("Save");
  }

  async function editClass(e) {
    const payload = await getPayload(e);
    console.log("editClass", { payload });
    const container = jQuery(`#${editClassModalId}`);
    const classData = container.data();

    const classCollection = doc(db, "classes", classData.id);
    setDoc(classCollection, payload, { merge: true }).then(() => {
      jQuery(`#${editClassModalId}`).modal("hide");
    });
  }

  async function createNewClass(e) {
    const payload = await getPayload(e);
    console.log("createNewClass", { payload });

    const classCollection = collection(db, "classes");
    addDoc(classCollection, payload).then(() => {
      jQuery(`#${createClassModalId}`).modal("hide");
    });
  }
</script>

{#if $isLoggedIn}
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
      <button
        on:click={editClass}
        bind:this={saveBtn}
        class="align-self-baseline btn btn-primary">Submit</button
      >
    </span>
  </Modal>
{/if}

<style>
</style>
