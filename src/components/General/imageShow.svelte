<script>
  const { imagesArray } = $$props;

  if (!imagesArray || !Array.isArray(imagesArray))
    throw new Error("imageShow component not being passed imagesArray");

  let mainImageEl;
  const mainImg = imagesArray.filter((el) => el.isMain)[0];
  const subImages = imagesArray.filter((el) => !el.isMain);
  console.log({ mainImg, imagesArray, subImages });
  function swapImage(e) {
    const srcUrl = jQuery(e.target).attr("src");
    const mainUrl = jQuery(mainImageEl).attr("src");
    jQuery(mainImageEl).attr("src", srcUrl);
    jQuery(e.target).attr("src", mainUrl);
  }
</script>

<div class="col-4 pl-0">
  {#if mainImg}
    <img class="main-img" src={mainImg.url} alt="" bind:this={mainImageEl} />
    <div class="sub-images mt-1">
      {#each subImages as img}
        <img src={img.url} alt="" on:click={swapImage} />
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .sub-images {
    display: flex;

    justify-content: space-between;
    img {
      width: 30%;
      cursor: pointer;
    }
  }
  img {
    &.main-img {
      width: 100%;
    }
  }
</style>
