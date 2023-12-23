<script>
  import { readLocalFile } from "$lib/common";
  import ActionsContainer from "./actionsContainer.svelte";
  import EditButton from "./buttons/editButton.svelte";

  let {
    name,
    label,
    onPreview,
    hideLabel,
    hideAction,
    previewUrl = "https://placehold.co/600x600/png?text=Placeholder",
  } = $$props;

  // defaults
  if (!name) name = "image-1";
  if (!label) label = "Image 1";

  let imagePreview;

  // @returns Url string
  function saveImage() {}

  function updateImagePreview(e) {
    // console.log("updateImagePreview", {});
    readLocalFile(e).then(({ theseFiles }) => {
      imagePreview = Object.values(theseFiles)[0].tempUrl;
      jQuery(`.${name} .imagePreview`).attr("src", imagePreview);
    });

    if (onPreview) onPreview();
  }
</script>

<div class="image-selection-field {name}">
  <ActionsContainer>
    <EditButton buttonActionType="openFilePicker" />
  </ActionsContainer>
  {#if !hideLabel}
    <label for="">{label}</label>
  {/if}
  <img
    class="imagePreview"
    alt=""
    src={previewUrl}
    data-previewImgDefault="https://placehold.co/600x600/png?text=Placeholder"
  />
  <input
    type="file"
    {name}
    id=""
    class="d-none"
    on:change={updateImagePreview}
  />
</div>
