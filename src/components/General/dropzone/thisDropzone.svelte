<script>
  // @ts-nocheck

  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  // import { filesToSave } from "../../stores";
  import { getUid } from "$lib/common";
  import PreviewImage from "./previewImage.svelte";

  const filePickerProps = $$props.filePickerProps || {};

  let filesToSave = {};
  let filePicker;

  function handleFilesSelect(e) {
    const files = e.target.files;

    Array.from(files).forEach((file) => {
      //   console.log("processing file");
      // Only process image files.
      if (!file.type.match("image.*")) return;
      //   console.log("processing file 2");

      var reader = new FileReader();

      //   console.log({ reader });

      reader.onload = (function (theFile) {
        return function (e) {
          //   console.log("e.target.result", {
          //     "e.target.result": e.target.result,
          //     e,
          //   });
          //   console.log({
          //     "Object.assign({}, filesToSave)": Object.assign({}, filesToSave),
          //   });
          //   filesToSave[theFile.name] = {
          //     theFile,
          //     url: e.target.result,
          //   };

          //   console.log({ filesToSave });
          filesToSave = Object.assign(filesToSave, {
            [theFile.name]: {
              theFile,
              url: e.target.result,
            },
          });
        };
      })(file);
      // Read in the image file as a data URL.
      reader.readAsDataURL(file);
    });
  }

  function removeFromFiles(e) {
    const selectedImg = jQuery(e.target).closest(".selectedImg");
    const fileName = selectedImg.attr("data-name");
    const copy = Object.assign({}, filesToSave);
    delete copy[fileName];
    filesToSave = copy;
    // console.log({ copy });
    // filesToSave.update(() => copy);
    /**
     * NEEDS TO DELETE FROM THE FILE PICKER
     */
    // console.log("removeFromFiles", { filesToSave, fileName });
  }

  //   $: {
  //     Object.entries(filesToSave).forEach(([name, data]) => {
  //       console.log({ data });
  //     });
  //     console.log(filesToSave);
  //   }

  let randomId = getUid();
</script>

<button class="btn btn-info" on:click={() => jQuery(filePicker).click()}
  >Select Image(s)</button
>
<input
  bind:this={filePicker}
  type="file"
  class="d-none"
  name=""
  id=""
  {...filePickerProps}
  accept="image.*"
  on:change={handleFilesSelect}
/>
<!-- <Dropzone on:drop={handleFilesSelect} accept=".png" {...filePickerProps}> -->
<!-- {#if Object.entries(filesToSave).length} -->
<div class="imgs-container d-flex flex-wrap preview-zone">
  {#if Object.entries(filesToSave).length}
    {#each Object.entries(filesToSave) as [name, data]}
      <PreviewImage {data} {name} {randomId} {removeFromFiles} />
    {/each}
  {/if}
</div>

<!-- </Dropzone> -->

<style lang="scss">
  :global(.dropzone) {
    padding: 4px !important;
  }
  .imgs-container {
  }
</style>
