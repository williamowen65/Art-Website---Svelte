<script>
  // @ts-nocheck

  import { doc, onSnapshot, setDoc } from "firebase/firestore";
  import { isLoggedIn } from "../../stores";
  import EditButton from "../General/editButton.svelte";
  import Modal from "../General/modal.svelte";
  import { onMount } from "svelte";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
  import { storage, db } from "../../firebase";
  import { getUid, readLocalFile } from "$lib/common";
  import ImageSelection from "../General/imageSelection.svelte";

  $: ifLoggedInClass = $isLoggedIn ? "" : "d-none";
  const modalId = "editNewsletterText";
  // const newsletterText = fake_db.textContent.newsletterTitle;
  const newsletterDoc = doc(db, "textContent", "newsletter");

  let newsletterData = {};
  let files = {};

  onSnapshot(newsletterDoc, (doc) => {
    console.log("Current  newsletterData data: ", doc.data());
    newsletterData = doc.data();
  });

  onMount(() => {
    jQuery(`#${modalId}`).on("show.bs.modal", () => {
      const imgSrc = newsletterData.backgroundPic;
      jQuery(".description").val(newsletterData.description);
      jQuery(".imagePreview").attr("src", imgSrc);
      console.log("jQuery('.imagePreview')", {
        'jQuery(".imagePreview")': jQuery(".imagePreview"),
        imgSrc,
      });
    });
    return () => {
      // Mostly for dev editing of component
      jQuery(`#${modalId}`).modal("hide");
    };
  });

  function saveNewsletter(e) {
    const container = jQuery(e.target).closest(".modal");
    const saveBtn = container.find(".saveBtn");
    const oldBtnText = saveBtn.html();
    saveBtn.html(`<i class="fa fa-spin fa-spinner"></i>`);
    // save files in storage and get urls
    new Promise((res, rej) => {
      //This block for every image collected
      const backgroundPic = container
        .find("input[name=backgroundPic]")
        .prop("files")[0];
      if (backgroundPic) {
        files.backgroundPic = backgroundPic;
      }
      if (!Object.entries(files).length) return res();

      Object.entries(files)
        .filter(([id, value]) => Boolean(value))
        .forEach(([id, file], i) => {
          // console.log({ file });
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
              // console.log("possibly resolve ", { files, i, ready });
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
      // console.log({ files, payload });
      // debugger;

      setDoc(newsletterDoc, payload).then(
        () => {
          jQuery(`#${modalId}`).modal("hide");
          // clear filesToSave
          container.find(".description").val("");
          jQuery(saveBtn).html(oldBtnText);
          // urlsToSave = [];
        },
        { merge: true }
      );
    });
  }

  // $: imagePreviewUrl = imagePreview
  //   ? `background-image: url(${imagePreview});`
  //   : "";

  $: newsletterText = newsletterData.description || "";
  $: backgroundImage = newsletterData.backgroundPic
    ? `background-image: url(${newsletterData.backgroundPic});`
    : "";

  // console.log({ newsletterData });
</script>

<div
  class="d-flex justify-content-center newsletter position-relative"
  style={backgroundImage}
>
  <div class={ifLoggedInClass}>
    <EditButton {modalId} />
  </div>
  <div class="container-md content-container">
    <div>{newsletterText}</div>
    <label for="">Name (required)</label>
    <div class="d-flex">
      <input
        class="form-control"
        type="text"
        placeholder="First Name"
        style="margin-left: 0;"
      />
      <input
        class="form-control"
        type="text"
        placeholder="Last Name"
        style="margin-right: 0;"
      />
    </div>
    <input class="form-control" type="text" placeholder="Email" />
    <textarea class="form-control" type="text" placeholder="Message" />
    <button class="btn send">Send</button>
  </div>
</div>

<Modal id={modalId} showModal={true}>
  <span slot="headerText"> Edit Section Header </span>
  <span slot="body">
    <input type="text" class="form-control w-100 description" />
    <div class="d-flex img-container">
      <ImageSelection name="backgroundPic" label="Background Pic" />
    </div>
  </span>
  <span slot="footer">
    <button class="btn btn-primary saveBtn" on:click={saveNewsletter}
      >Save</button
    >
  </span>
</Modal>

<style lang="scss">
  .container-md {
    max-width: 700px;
  }
  .newsletter {
    padding: 75px 0px;
    /* margin: 75px 0px 0px; */
    background-size: cover;
    :not(i, button) {
      /* color: white; */
    }
    height: 89vh;
    .content-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      align-self: center;
    }
    .send {
      align-self: stretch;
    }
    input,
    textarea {
      margin: 3px;
    }
  }
</style>
