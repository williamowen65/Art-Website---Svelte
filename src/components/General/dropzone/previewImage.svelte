<script>
  import { onMount } from "svelte";

  const { name, randomId, removeFromFiles, radioId } = $$props;
  export let data;
  let img;
  onMount(() => {
    console.log({ data, name });
    jQuery(img).data(data);
    return () => {};
  });
</script>

<div class="selectedImg ml-0" data-id={name} bind:this={img}>
  <img src={data.url} alt="" />
  <i class="fa fa-times removeImg" on:click|stopPropagation={removeFromFiles}
  ></i>
  <input type="radio" name={radioId} id="" checked={data.isMain} />
</div>

<style lang="scss">
  img {
    width: auto !important;
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

  input[type="radio"] {
    position: absolute;
    top: 5px;
    left: 5px;
  }
</style>
