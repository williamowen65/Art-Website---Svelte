<script>
  // @ts-nocheck

  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
  import { filesToSave } from "../../stores";

  const filePickerProps = $$props.filePickerProps || {};

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
          //   $filesToSave[theFile.name] = {
          //     theFile,
          //     tempUrl: e.target.result,
          //   };

          //   console.log({ $filesToSave });
          filesToSave.update((files) =>
            Object.assign(files, {
              [theFile.name]: {
                theFile,
                tempUrl: e.target.result,
              },
            })
          );
        };
      })(file);
      // Read in the image file as a data URL.
      reader.readAsDataURL(file);
    });
  }

  function removeFromFiles(e) {
    const selectedImg = jQuery(e.target).closest(".selectedImg");
    const fileName = selectedImg.attr("data-name");
    const copy = Object.assign({}, $filesToSave);
    delete copy[fileName];
    console.log({ copy });
    filesToSave.update(() => copy);
    /**
     * NEEDS TO DELETE FROM THE FILE PICKER
     */
    console.log("removeFromFiles", { filesToSave, fileName });
  }

  //   $: {
  //     Object.entries(filesToSave).forEach(([name, data]) => {
  //       console.log({ data });
  //     });
  //     console.log(filesToSave);
  //   }
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
  {filePickerProps}
  accept="image.*"
  on:change={handleFilesSelect}
/>
<!-- <Dropzone on:drop={handleFilesSelect} accept=".png" {...filePickerProps}> -->
<!-- {#if Object.entries(filesToSave).length} -->
<div class="imgs-container d-flex flex-wrap">
  {#if Object.entries($filesToSave).length}
    {#each Object.entries($filesToSave) as [name, data]}
      <div class="selectedImg ml-0" data-name={name}>
        <img src={data.tempUrl} alt="" />
        <i
          class="fa fa-times removeImg"
          on:click|stopPropagation={removeFromFiles}
        ></i>
      </div>
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
  .selectedImg {
    border: 1px solid black;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    overflow: hidden;
    align-self: flex-start;
    margin: 5px;
    position: relative;
    img {
      min-width: 100%;
      height: 100%;
    }
    .removeImg {
      cursor: pointer;
      color: black;
      position: absolute;
      top: 0;
      right: 0;
      padding: 5px;
      z-index: 1000;
    }
  }
</style>
