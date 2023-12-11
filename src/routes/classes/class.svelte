<script>
  import ImageShow from "../../components/General/imageShow.svelte";

  const { classData } = $$props;
  const imagesArray = Object.entries(classData.images).map(([id, el]) => {
    el.id = id;
    return el;
  });
  // console.log({ classData, imagesArray });
</script>

<div class="row class position-relative">
  <ImageShow {imagesArray} />
  <div class="classInfo col-8">
    <h3 class="className">{classData.className}</h3>
    <div class="description">
      {classData.description}
    </div>
    <div class="info d-flex flex-row justify-content-around w-100 mt-auto">
      <div class="dates d-flex flex-column justify-content-center">
        {#each Object.values(classData.dates) as date}
          <div>{date}</div>
        {/each}
      </div>
      <div class="payment d-flex flex-column align-items-center">
        <div class="cost">${classData.cost}</div>
        <button class="btn paypal btn-primary btn-sm">paypal</button>
      </div>
    </div>
  </div>

  <div class="action-buttons">
    <i class="fa fa-pencil icon-btn"></i>
    <i class="fa fa-times icon-btn"></i>
    <i class="fa fa-move icon-btn"></i>
  </div>
</div>

<style lang="scss">
  .classInfo {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
  }
  .action-buttons {
    position: absolute;
    right: 0px;
  }
</style>
