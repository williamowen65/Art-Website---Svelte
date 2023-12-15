<script>
  import { doc, onSnapshot, setDoc } from "firebase/firestore";
  import EditButton from "../../components/General/editButton.svelte";
  import Modal from "../../components/General/modal.svelte";
  import { isLoggedIn } from "../../stores";
  import { db, storage } from "../../firebase";
  import { onMount } from "svelte";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
  import {
    combineImgPayloadAsURL,
    getUid,
    saveImageAndGetUrl,
  } from "$lib/common";
  import ImageSelection from "../../components/General/imageSelection.svelte";

  const modalId = "editAboutMe";

  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";

  const aboutMeDoc = doc(db, "textContent", "aboutMe");
  let aboutMeData = {};

  let files = {};

  onSnapshot(aboutMeDoc, (doc) => {
    // console.log("Current data: ", doc.data());
    aboutMeData = doc.data() || {};
  });

  onMount(() => {
    jQuery(`#${modalId}`).on("show.bs.modal", () => {
      const profilePic = aboutMeData.profilePic;
      const galleryPic = aboutMeData.galleryPic;
      jQuery(".description").val(aboutMeData.description);
      jQuery(".profilePic .imagePreview").attr("src", profilePic);
      jQuery(".galleryPic .imagePreview").attr("src", galleryPic);
    });
    return () => {
      // Mostly for dev editing of component
      jQuery(`#${modalId}`).modal("hide");
    };
  });

  async function saveAboutMe(e) {
    const container = jQuery(e.target).closest(".modal");
    const saveBtn = container.find(".saveBtn");
    const oldBtnText = saveBtn.html();
    saveBtn.html(`<i class="fa fa-spin fa-spinner"></i>`);
    // save files in storage and get urls

    const description = container.find(".description").val();

    const payload = {
      description,
    };

    const files = await saveImageAndGetUrl(["profilePic", "galleryPic"]);
    combineImgPayloadAsURL(payload, files);

    // console.log({ files, payload });
    // debugger;

    setDoc(aboutMeDoc, payload, { merge: true }).then(() => {
      jQuery(`#${modalId}`).modal("hide");
      // clear filesToSave
      container.find(".description").val("");
      jQuery(saveBtn).html(oldBtnText);
      // urlsToSave = [];
    });
  }

  /**
   * DOM UPDATES
   */
  //  $: aboutMeStyles = aboutMeData.imgUrl
  //   ? `background-image: url(${aboutMeData?.imgUrl})`
  //   : "";

  $: aboutMeDescription = aboutMeData.description || "";
  // $: aboutMeShowDescription = aboutMeData.showDescription ? "" : "d-none";
</script>

<section class="about-section px-1 container pt-5 position-relative">
  <div class={ifLoggedInClass}>
    <EditButton {modalId} />
  </div>
  <div class="row">
    <div class="d-flex flex-column col-12 col-md-4">
      <img src={aboutMeData.profilePic} alt="" />
      <img src={aboutMeData.galleryPic} alt="" />
    </div>
    <div class="text-container col-6">
      <h3>About Me</h3>
      {aboutMeDescription}
      <div class="about-description d-flex justify-content-center mt-5">
        <a href="#goToSite"><i class="fa fa-instagram"></i></a>
        <a href="#goToSite"><i class="fa fa-facebook"></i></a>
        <a href="#goToSite"><i class="fa fa-twitter"></i></a>
      </div>
    </div>
  </div>
</section>

<div class={ifLoggedInClass}>
  <Modal id={modalId} showModal={false} classes="modal-lg aboutMeModal">
    <span slot="headerText"> Edit About Me Section </span>
    <span slot="body">
      <textarea
        class="w-100 form-control description"
        bind:value={aboutMeData.description}
      ></textarea>
      <div class="d-flex img-container">
        <ImageSelection name="profilePic" label="Profile Pic" />
        <ImageSelection name="galleryPic" label="Gallery Pic" />
      </div>
    </span>
    <span slot="footer">
      <button class="btn btn-primary saveBtn" on:click={saveAboutMe}
        >Save</button
      >
    </span>
  </Modal>
</div>

<style lang="scss">
  .text-container {
    height: 100%;
  }
  .about-section {
    img {
      width: 100%;
      float: left;
      padding: 0px 0px 20px;
    }
  }
  .fa {
    padding: 13px;
    font-size: 30px;
    width: 50px;
    text-align: center;
    text-decoration: none;
    margin: 5px 2px;
    color: white;
    &.fa-facebook {
      background: #3b5998;
    }
    &.fa-twitter {
      background: #55acee;
    }
    &.fa-instagram {
      background: #125688;
    }
  }
</style>
