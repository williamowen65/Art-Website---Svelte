<script>
  import { doc, onSnapshot, setDoc } from "firebase/firestore";
  import EditButton from "../../components/General/editButton.svelte";
  import Modal from "../../components/General/modal.svelte";
  import { isLoggedIn } from "../../stores";
  import { db } from "../../firebase";
  import { onMount } from "svelte";

  const modalId = "editAboutMe";

  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";

  const aboutMeDoc = doc(db, "textContent", "aboutMe");
  let aboutMeData = {};

  onSnapshot(aboutMeDoc, (doc) => {
    console.log("Current data: ", doc.data());
    aboutMeData = doc.data();
  });

  onMount(() => {
    jQuery(`#${modalId}`).on("show.bs.modal", populateForm);
    return () => {
      // Mostly for dev editing of component
      jQuery(`#${modalId}`).modal("hide");
    };
  });
  function populateForm() {
    const modal = jQuery(`#${modalId}`);
    // console.log("populateForm", { bannerData, modal, urlsToSave });
    modal.find(".description").val(aboutMeData.description);
    // const checkbox = modal.find(".showDescription");
    // console.log({ checkbox });
    // if (aboutMeData.showDescription) {
    //   checkbox.prop("checked", true);
    // } else {
    //   checkbox.removeProp("checked");
    // }
    // if (aboutMeData.imgUrl) {
    //   urlsToSave.push(aboutMeData.imgUrl);
    // }
  }

  function saveAboutMe(e) {
    const container = jQuery(e.target).closest(".modal");
    const saveBtn = container.find(".saveBtn");
    const oldBtnText = saveBtn.html();
    saveBtn.html(`<i class="fa fa-spin fa-spinner"></i>`);
    // save files in storage and get urls
    new Promise((res, rej) => {
      console.log("save images");
      res();
    }).then(() => {
      const description = container.find(".description").val();

      const payload = {
        description,
      };
      // if (urlsToSave[0]) {
      //   jQuery.extend(payload, {
      //     imgUrl: urlsToSave[0],
      //   });
      // }
      setDoc(aboutMeDoc, payload).then(() => {
        jQuery(`#${modalId}`).modal("hide");
        // clear filesToSave
        container.find(".description").val("");
        jQuery(saveBtn).html(oldBtnText);
        // filesToSave.update(() => ({}));
        // urlsToSave = [];
      });
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
    <div class="">
      <img
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <div class="text-container">
        <h3>About Me</h3>
        {aboutMeDescription}
        <div class="about-description d-flex justify-content-center mt-5">
          <a href="#goToSite"><i class="fa fa-instagram"></i></a>
          <a href="#goToSite"><i class="fa fa-facebook"></i></a>
          <a href="#goToSite"><i class="fa fa-twitter"></i></a>
        </div>
      </div>
    </div>
  </div>
</section>

<div class={ifLoggedInClass}>
  <Modal id={modalId} showModal={false} classes="modal-lg">
    <span slot="headerText"> Edit About Me Section </span>
    <span slot="body">
      <textarea class="w-100 form-control description"></textarea>
      <div class="d-flex">
        <div class="field" data-imgType="profilePic">
          <EditButton buttonActionType="openFilePicker" />
          <label for="">Profile Pic</label>
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <input type="file" name="" id="" class="d-none" />
        </div>
        <div class="field" data-imgType="galleryPic">
          <EditButton buttonActionType="openFilePicker" />
          <label for="">Gallery Pic</label>
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <input type="file" name="" id="" class="d-none" />
        </div>
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
  img {
    width: 40%;
    min-width: 200px;
    float: left;
    padding-right: 20px;
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
  .field {
    position: relative;
    max-width: min-content;
    :global(.edit) {
      top: -13px !important;
      right: 5px;
    }
  }
</style>
