<script>
  import Gallery from "../../components/Gallery/gallery.svelte";
  import CollectionCard from "../../components/Gallery/collectionCard.svelte";
  import TodoNote from "../../components/Dev/todoNote.svelte";
  import {
    combineImgPayloadAsURL,
    getToDoList,
    getUid,
    mapId,
    saveImageAndGetUrl,
  } from "$lib/common";
  import { isLoggedIn, originals } from "../../stores";
  import AddButton from "../../components/General/addButton.svelte";
  import Modal from "../../components/General/modal.svelte";
  import ImageSelection from "../../components/General/imageSelection.svelte";
  import { addDoc, doc, setDoc } from "firebase/firestore";
  import { db } from "../../firebase";
  import { onMount } from "svelte";
  import GalleryCard from "../../components/Gallery/galleryCard.svelte";

  const note = `
- Create common modal for Collection and gallery modal components.
- use a common file for the ID
`;
  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";
  let modalId = "modalAddPainting";
  let hideAction = {
    remove: true,
  };

  onMount(() => {
    console.log({ $originals });
    // jQuery(`#${modalId}`).on("show.bs.modal", populateForm);
    return () => {};
  });

  function populateForm() {
    console.log("populateForm", {});
  }

  async function addPainting() {
    const container = jQuery(`#${modalId}`);

    const collectionName = container.find(".collectionName").text();
    const saveBtn = container.find(".saveBtn");
    const oldBtnText = saveBtn.html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);
    const description = container.find(".description").val();
    const title = container.find(".title").val();
    const cost = container.find(".cost").val();

    let payload = {};

    const toDoList = getToDoList(jQuery(`#${modalId}`)) || [];
    const files = await saveImageAndGetUrl(toDoList, modalId);
    combineImgPayloadAsURL(payload, files);
    for (let imageName of toDoList) {
      // get meta data
      // console.log({ imageName });
      const url = payload[imageName];
      delete payload[imageName];

      payload.paintings = {};
      const randomId = getUid();
      payload.paintings = {
        [randomId]: {
          description: description || "",
          title,
          cost,
        },
      };

      if (!description || !url) {
        jQuery(saveBtn).html(oldBtnText);
        alert("Missing img, description, title, or cost");
        return console.log("Save missing data");
      }

      if (url) {
        jQuery.extend(true, payload, {
          paintings: {
            [randomId]: {
              url,
            },
          },
        });
      }
    }

    const collection = "paintings/collections/originals";
    console.log("addPainting", { payload, files, collection });
    // debugger;
    const collectionRef = doc(db, collection, collectionName);
    setDoc(collectionRef, payload, { merge: true }).then(() => {
      jQuery(`#${modalId}`).modal("hide");
      //   // clear filesToSave
      container.find(".description").val("");
      jQuery(saveBtn).html(oldBtnText);
      //   // urlsToSave = [];
    });
  }
</script>

<TodoNote {note} />
<div class="mt-5 container">
  <h2>Originals</h2>

  <!-- <TodoNote {note} /> -->
  <!-- {@debug $originals} -->
  {#each mapId($originals) as collectionData}
    <div class="galleryContainer">
      <span class="d-flex align-items-baseline">
        <h5 class="collectionName">{collectionData.cardBanner.type}</h5>
        <div class={ifLoggedInClass}>
          <AddButton {modalId} />
        </div>
      </span>
      <Gallery>
        <!-- {tag} -->

        <!-- {@debug collectionData} -->
        {#each mapId(collectionData.paintings) as painting (painting.id)}
          <GalleryCard
            type="galleryImage"
            galleryImageData={painting}
            collectionName={collectionData.id}
          />
          <!-- {@debug painting} -->
        {/each}
      </Gallery>
    </div>
  {/each}
</div>

<Modal id={modalId} showModal={false}>
  <span slot="headerText">
    <h5>Add Painting to <span class="collectionName"></span></h5>
  </span>
  <span slot="body">
    <div class="d-flex">
      <div class="field">
        <ImageSelection name="cardBanner" label="Painting" {hideAction} />
      </div>
      <div class="w-100 d-flex flex-column">
        <div class="field d-flex flex-column">
          <label for="" class="mt-2">Title</label>
          <input name="" id="" class="w-100 form-control title" />
        </div>
        <div class="field d-flex flex-column description-field">
          <label for="" class="mt-2">Description</label>
          <textarea name="" id="" class="w-100 form-control description"
          ></textarea>
        </div>
        <div class="field d-flex flex-column">
          <label for="" class="mt-2">Cost</label>
          <input name="" id="" class="w-100 form-control cost" />
        </div>
      </div>
    </div>
  </span>
  <span slot="footer">
    <button class="btn btn-primary saveBtn" on:click={addPainting}>Save</button>
  </span>
</Modal>

<style>
  .description-field {
    height: 100%;
  }
  .description {
    height: 100%;
  }
</style>
