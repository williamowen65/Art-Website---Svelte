<script>
  import ThisDropzone from "../General/dropzone/thisDropzone.svelte";
</script>

<div class="row">
  <div class="col-4">
    <ThisDropzone
      filePickerProps={{
        multiple: true,
      }}
    />
  </div>
  <div class="col-8">
    <input type="text" class="form-control classTitle" placeholder="Title" />
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
