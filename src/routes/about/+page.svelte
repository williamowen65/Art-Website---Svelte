<script>
  import { doc, onSnapshot, setDoc } from "firebase/firestore";
  import EditButton from "../../components/General/editButton.svelte";
  import Modal from "../../components/General/modal.svelte";
  import { isLoggedIn } from "../../stores";
  import { db, storage } from "../../firebase";
  import { onMount } from "svelte";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
  import { getUid } from "$lib/common";

  const modalId = "editAboutMe";

  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";

  const aboutMeDoc = doc(db, "textContent", "aboutMe");
  let aboutMeData = {};

  let files = {};

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
      const profilePic = container
        .find("input[name=profilePic]")
        .prop("files")[0];
      if (profilePic) {
        files.profilePic = profilePic;
      }
      const galleryPic = container
        .find("input[name=galleryPic]")
        .prop("files")[0];
      console.log("save images", { profilePic, galleryPic });
      if (galleryPic) {
        files.galleryPic = galleryPic;
      }

      Object.entries(files)
        .filter(([id, value]) => Boolean(value))
        .forEach(([id, file], i) => {
          console.log({ file });
          const galleryRef = ref(storage, file.name + `-${getUid()}`);
          uploadBytes(galleryRef, file)
            .then(async (snapshot) => {
              const url = await getDownloadURL(galleryRef);
              files[id] = {
                file: files[id],
                url,
              };
            })
            .then(() => {
              const ready = Object.values(files).every((el) => el.url);
              console.log("possibly resolve ", { files, i, ready });
              if (ready) res();
            });
        });
    }).then(() => {
      const description = container.find(".description").val();

      const payload = {
        description,
      };
      for (let key in files) {
        if (files[key]) {
          jQuery.extend(true, payload, {
            [key]: files[key].url,
          });
        }
      }
      console.log({ files, payload });
      // debugger;

      setDoc(aboutMeDoc, payload).then(() => {
        jQuery(`#${modalId}`).modal("hide");
        // clear filesToSave
        container.find(".description").val("");
        jQuery(saveBtn).html(oldBtnText);
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
          <input type="file" name="profilePic" id="" class="d-none" />
        </div>
        <div class="field" data-imgType="galleryPic">
          <EditButton buttonActionType="openFilePicker" />
          <label for="">Gallery Pic</label>
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <input type="file" name="galleryPic" id="" class="d-none" />
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
    width: 100%;
    float: left;
    padding: 0px 0px 20px;
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
