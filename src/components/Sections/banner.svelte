<script>
  // @ts-nocheck

  import EditButton from "../General/editButton.svelte";
  import Modal from "../General/modal.svelte";
  import { onMount } from "svelte";
  import { filesToSave, isLoggedIn } from "../../stores";
  import ThisDropzone from "../General/thisDropzone.svelte";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
  import { db, storage } from "../../firebase";
  import { getUid } from "$lib/common";
  import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    setDoc,
  } from "firebase/firestore";
  import { marked } from "marked";

  const modalId = "editBanner";
  const showModal = false;
  let saveBtn;
  const bannerDoc = doc(db, "textContent", "banner");
  let bannerData = {};

  onSnapshot(bannerDoc, (doc) => {
    console.log("Current data: ", doc.data());
    bannerData = doc.data() || {};
  });
  // const docData = doc.data();

  onMount(() => {
    if (showModal) {
      jQuery(`#${modalId}`).modal("show");
    }
    jQuery(`#${modalId}`).on("show.bs.modal", populateForm);
    return () => {
      // Mostly for dev editing of component
      jQuery(`#${modalId}`).modal("hide");
    };
  });

  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";
  let urlsToSave = [];

  function updateBannerData(e) {
    // console.log("updateBannerData", { urlsToSave });
    const container = jQuery(e.target).closest(".modal");
    const oldBtnText = jQuery(saveBtn).html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);
    // save files in storage and get urls
    new Promise((res, rej) => {
      if (!Object.values($filesToSave).length) return res();
      urlsToSave = [];
      Object.values($filesToSave).forEach((obj) => {
        const file = obj.theFile;
        const galleryRef = ref(storage, file.name + `-${getUid()}`);
        uploadBytes(galleryRef, file)
          .then(async (snapshot) => {
            const url = await getDownloadURL(galleryRef);
            urlsToSave.push(url);
          })
          .then(() => res());
      });
    }).then(() => {
      // save banner document in db
      const description = container.find(".description").val();
      const showDescription = container
        .find(".showDescription")
        .prop("checked");

      const payload = {
        description,
        showDescription,
      };
      if (urlsToSave[0]) {
        jQuery.extend(payload, {
          imgUrl: urlsToSave[0],
        });
      }

      setDoc(bannerDoc, payload).then(() => {
        jQuery(`#${modalId}`).modal("hide");
        // clear filesToSave
        container.find(".description").val("");
        container.find(".showDescription").removeProp("checked");
        jQuery(saveBtn).html(oldBtnText);
        filesToSave.update(() => ({}));
        urlsToSave = [];
      });
    });
  }

  function populateForm() {
    const modal = jQuery(`#${modalId}`);
    // console.log("populateForm", { bannerData, modal, urlsToSave });
    modal.find(".description").val(bannerData.description);
    const checkbox = modal.find(".showDescription");
    // console.log({ checkbox });
    if (bannerData.showDescription) {
      checkbox.prop("checked", true);
    } else {
      checkbox.removeProp("checked");
    }
    if (bannerData.imgUrl) {
      urlsToSave.push(bannerData.imgUrl);
    }
  }

  /**
   * DOM UPDATES
   */
  $: bannerStyles = bannerData?.imgUrl
    ? `background-image: url(${bannerData?.imgUrl})`
    : "";

  $: bannerDescription = bannerData.description || "";
  $: bannerShowDescription = bannerData.showDescription ? "" : "d-none";

  let modalClasses = "";
  function toggleModalClasses() {
    // console.log("toggleModalClasses", { modalClasses });
    const icon = jQuery(".moveModal");
    if (modalClasses) {
      modalClasses = "";
      icon.addClass("fa-arrow-circle-left");
      icon.removeClass("fa-arrow-circle-right");
    } else {
      icon.removeClass("fa-arrow-circle-left");
      icon.addClass("fa-arrow-circle-right");
      modalClasses = "ml-0 w-25";
    }
    // console.log("toggleModalClasses", { modalClasses });
  }
</script>

<div class="jumbotron banner rounded-0" style={bannerStyles}>
  <div class={bannerShowDescription}>
    <div class="bannerDescription background"></div>
    <div class="bannerDescription content">
      {@html marked(bannerDescription)}
    </div>
  </div>
  <div class={ifLoggedInClass}>
    <EditButton contentType="banner" {modalId} />
    <Modal id={modalId} classes={modalClasses} showModal={false}>
      <span slot="headerText" class="w-100">
        <div class="d-flex justify-content-between align-items-baseline w-100">
          <span>Edit Banner</span>
          <i
            class="fa fa-arrow-circle-left moveModal"
            on:click={toggleModalClasses}
          ></i>
        </div>
      </span>
      <span slot="body">
        <ThisDropzone />
        <div class="field">
          <label for="">Description</label>
          <textarea
            class="form-control description"
            rows="5"
            bind:value={bannerData.description}
          ></textarea>
        </div>
        <div class="field">
          <div class="d-flex">
            <label for="" class="mr-3">Show Description</label>
            <input
              type="checkbox"
              class="showDescription"
              bind:checked={bannerData.showDescription}
            />
          </div>
        </div>
      </span>
      <span slot="footer">
        <button
          class="btn btn-primary"
          on:click={updateBannerData}
          bind:this={saveBtn}>Save</button
        >
      </span>
    </Modal>
  </div>
</div>

<style lang="scss">
  .banner {
    position: relative;
    height: 80vh;
    background-size: cover;
    .bannerDescription {
      background: white;
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      /* padding: 50px; */
      height: 60%;
      width: 50%;
      &.content {
        height: 43%;
        width: 40%;
        padding: 10px 20px;
      }
      &.background {
        opacity: 0.5;
        height: 60%;
        width: 50%;
      }
    }
  }
  .moveModal {
    cursor: pointer;
  }
</style>
