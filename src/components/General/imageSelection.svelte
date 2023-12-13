<script>
  import { readLocalFile } from "$lib/common";
  import EditButton from "./editButton.svelte";

  const { name, label } = $$props;

  let imagePreview;

  // @returns Url string
  function saveImage() {}

  function updateImagePreview(e) {
    console.log("updateImagePreview", {});
    readLocalFile(e).then(({ theseFiles }) => {
      imagePreview = Object.values(theseFiles)[0].tempUrl;
      jQuery(`.${name} .imagePreview`).attr("src", imagePreview);
    });
  }
</script>

<div class="image-selection-field {name}">
  <EditButton buttonActionType="openFilePicker" />
  <label for="">{label}</label>
  <img class="imagePreview" alt="" />
  <input
    type="file"
    {name}
    id=""
    class="d-none"
    on:change={updateImagePreview}
  />
</div>
