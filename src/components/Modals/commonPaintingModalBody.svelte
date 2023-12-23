<script>
  import ImageSelection from "../General/imageSelection.svelte";

  export let thisPainting = {};

  let hideAction = {
    remove: true,
  };
</script>

<div class="d-flex">
  <div class="field">
    <ImageSelection
      name="cardBanner"
      label="Painting"
      {hideAction}
      previewUrl={thisPainting.url}
    />
  </div>
  <div class="w-100 d-flex flex-column">
    <div class="field d-flex flex-column">
      <label for="" class="mt-2">Title</label>
      <input
        name=""
        id=""
        class="w-100 form-control title"
        bind:value={thisPainting.title}
      />
    </div>
    <div class="field d-flex flex-column description-field">
      <label for="" class="mt-2">Description</label>
      <textarea
        name=""
        id=""
        class="w-100 form-control description"
        bind:value={thisPainting.description}
      ></textarea>
    </div>
    <div class="input-group mt-4">
      <div class="input-group-prepend">
        <span class="input-group-text" id=""><i class="fa fa-dollar"></i></span>
      </div>
      <input
        type="text"
        class="form-control cost"
        placeholder="Cost"
        aria-label="Cost"
        bind:value={thisPainting.cost}
      />
    </div>
  </div>
</div>
