<script>
  import { getToDoList } from "$lib/common";
  import Modal from "../../components/General/modal.svelte";
  import ThisDropzone from "../../components/General/thisDropzone.svelte";

  // @ts-nocheck
  import Datetime from "./inputs/datetime.svelte";
  let { id, showModal } = $$props;
  let saveBtn;
  let datesContainer;
  let dateCount = 1;

  // showModal = true;

  function createNewClass(e) {
    console.log("createNewClass", {});
    const container = jQuery(e.target).closest(".modal");
    const oldBtnText = jQuery(saveBtn).html();
    jQuery(saveBtn).html(`<i class="fa fa-spin fa-spinner"></i>`);

    const title = container.find(".classTitle").val();
    const description = container.find(".description").val();
    const dateString = container.find(".dateString").val();
    const cost = container.find(".cost").val();
    const numberOfSpots = container.find(".numberOfSpots").val();
    const isPublic = container.find("input[name=public]").prop("checked");

    const payload = {
      title,
      description,
      dateString,
      cost,
      numberOfSpots,
      isPublic,
    };

    // const toDoList = getToDoList(jQuery(`#${id}`)) || [];
    console.log({
      payload,
      'container.find(".title")': container.find(".title"),
    });
    debugger;
  }
</script>

<!-- <Modal {id} {showModal} classes="modal-lg"> -->
<Modal {id} showModal={true} classes="modal-lg">
  <span slot="headerText">
    <h4 class="title align-self-center">Create New Class</h4>
  </span>
  <span slot="body">
    <div class="row">
      <div class="col-4">
        <ThisDropzone
          filePickerProps={{
            multiple: true,
          }}
        />
      </div>
      <div class="col-8">
        <input
          type="text"
          class="form-control classTitle"
          placeholder="Title"
        />
        <textarea class="form-control description" placeholder="Description"
        ></textarea>
        <div class="d-flex datetime justify-content-between">
          <div class="w-100">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id=""
                  ><i class="fa fa-calendar"></i></span
                >
              </div>
              <input
                type="text"
                class="form-control dateString"
                placeholder="Date String"
                aria-label="Date String"
              />
            </div>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id=""
                  ><i class="fa fa-dollar"></i></span
                >
              </div>
              <input
                type="text"
                class="form-control cost"
                placeholder="Cost"
                aria-label="Cost"
              />
            </div>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id=""
                  ><i class="fa fa-hashtag"></i></span
                >
              </div>
              <input
                type="number"
                class="form-control numberOfSpots"
                placeholder="# of Spots Available"
                aria-label="# of Spots Available"
              />
            </div>
            <div>
              <div class="field d-flex mt-1">
                <label class="mb-0">Public</label>
                <input type="checkbox" name="public" class="form-control" />
              </div>
            </div>
          </div>

          <div class="d-flex"></div>
        </div>
      </div>
    </div>
  </span>
  <span slot="footer">
    <button
      on:click={createNewClass}
      bind:this={saveBtn}
      class="align-self-baseline btn btn-primary">Submit</button
    >
  </span>
</Modal>

<style>
  input[type="checkbox"].form-control {
    width: 10%;
    box-shadow: none;
  }
  :global(.dropzone) {
    height: 274px;
    border-color: #9a7b7b !important;
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
  textarea {
    min-height: 208px;
  }
  .datetime button {
    white-space: nowrap;
  }
  .input-group-text {
    width: 40px;
    display: flex;
    justify-content: center;
  }
</style>
