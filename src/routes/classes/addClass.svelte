<script>
  // @ts-nocheck
  import Datetime from "./inputs/datetime.svelte";
  import Dropzone from "svelte-file-dropzone/Dropzone.svelte";

  let files = {
    accepted: [],
    rejected: [],
  };
  let datesContainer;
  let dateCount = 1;

  $: disable = files.accepted.length;

  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
    files.accepted = files.accepted;
  }

  function addDateTimeComponent() {
    // jQuery(datesContainer).append();
    // console.log({ Datetime });
    new Datetime({
      target: datesContainer,
    });
  }
</script>

<div class="d-flex flex-column">
  <h4 class="title align-self-center">Create New Class</h4>
  <div class="row">
    <div class="col-4">
      {#if disable}
        {files.accepted[0].name}
      {:else}
        <Dropzone on:drop={handleFilesSelect} accept="img" />
      {/if}
    </div>
    <div class="col-8">
      <input type="text" placeholder="Title" />
      <textarea name="" id="" cols="30" rows="10"></textarea>
      <div class="d-flex datetime justify-content-between">
        <div class="dates d-flex flex-column" bind:this={datesContainer}>
          <Datetime></Datetime>
        </div>
        <input type="text" class="align-self-baseline" placeholder="Costs" />

        <div class="d-flex">
          <button on:click={addDateTimeComponent} class="align-self-baseline"
            >Add Date</button
          >
          <button on:click={addDateTimeComponent} class="align-self-baseline"
            >Submit</button
          >
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  :global(.dropzone) {
    height: 274px;
    border-color: #ce9d9d;
  }
  .title {
  }
  #create-class-container {
    height: 255px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    &:hover {
      background: #efe6e6;
    }
  }
  textarea,
  input {
    width: 100%;
  }
  .datetime button {
    white-space: nowrap;
  }
</style>
