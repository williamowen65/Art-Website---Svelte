<script>
  import Modal from "../../components/General/modal.svelte";
  import ThisDropzone from "../../components/General/thisDropzone.svelte";

  // @ts-nocheck
  import Datetime from "./inputs/datetime.svelte";
  let { id, showModal } = $$props;

  let datesContainer;
  let dateCount = 1;

  // showModal = true;

  function addDateTimeComponent() {
    // jQuery(datesContainer).append();
    // console.log({ Datetime });
    new Datetime({
      target: datesContainer,
    });
  }
</script>

<Modal {id} {showModal} classes="modal-lg">
  <span slot="headerText">
    <h4 class="title align-self-center">Create New Class</h4>
  </span>
  <span slot="body">
    <div class="row">
      <div class="col-4">
        <ThisDropzone />
      </div>
      <div class="col-8">
        <input type="text" class="form-control" placeholder="Title" />
        <textarea class="form-control" placeholder="Description"></textarea>
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
                class="form-control"
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
                class="form-control"
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
                class="form-control"
                placeholder="# of Spots Available"
                aria-label="# of Spots Available"
              />
            </div>
          </div>

          <div class="d-flex">
            <!-- <button on:click={addDateTimeComponent} class="align-self-baseline"
              >Add Date</button
            > -->
          </div>
        </div>
      </div>
    </div>
  </span>
  <span slot="footer">
    <button
      on:click={addDateTimeComponent}
      class="align-self-baseline btn btn-primary">Submit</button
    >
  </span>
</Modal>

<style>
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
