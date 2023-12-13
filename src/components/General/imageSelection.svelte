<script>
  import { readLocalFile } from "$lib/common";
  import EditButton from "./editButton.svelte";

  const { name, label } = $$props;

  let imagePreview;

  function updateImagePreview(e) {
    console.log("updateImagePreview", {});
    readLocalFile(e).then(({ theseFiles }) => {
      // jQuery(".imagePreview").attr("src", theseFiles.tempUrl);
      imagePreview = Object.values(theseFiles)[0].tempUrl;
      jQuery(".imagePreview").attr("src", imagePreview);
      console.log({ imagePreview });
      console.log({
        'jQuery(".imagePreview")': jQuery(".imagePreview"),
        "jQuery(\".imagePreview\").attr('src')":
          jQuery(".imagePreview").attr("src"),
      });
    });
  }
</script>

<div class="image-selection-field" data-imgType="backgroundPic">
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
