<div class="row class-container position-relative">
  <div class="col-4 pl-0">
    <img
      class="main-img"
      src="https://media.istockphoto.com/id/474058580/photo/abstract-colored-background-with-beautiful-flowers-tulips-and-soft-hues.jpg?s=1024x1024&w=is&k=20&c=XBULuxTOW1YyseGalcydPNo8G_qrIhE0uxaGkHLtIJc="
      alt=""
    />
    <div class="sub-images mt-1">
      <img
        src="https://media.istockphoto.com/id/474058580/photo/abstract-colored-background-with-beautiful-flowers-tulips-and-soft-hues.jpg?s=1024x1024&w=is&k=20&c=XBULuxTOW1YyseGalcydPNo8G_qrIhE0uxaGkHLtIJc="
        alt=""
      />
      <img
        src="https://media.istockphoto.com/id/474058580/photo/abstract-colored-background-with-beautiful-flowers-tulips-and-soft-hues.jpg?s=1024x1024&w=is&k=20&c=XBULuxTOW1YyseGalcydPNo8G_qrIhE0uxaGkHLtIJc="
        alt=""
      />
      <img
        src="https://media.istockphoto.com/id/474058580/photo/abstract-colored-background-with-beautiful-flowers-tulips-and-soft-hues.jpg?s=1024x1024&w=is&k=20&c=XBULuxTOW1YyseGalcydPNo8G_qrIhE0uxaGkHLtIJc="
        alt=""
      />
    </div>
  </div>
  <div class="classInfo col-8">
    <h3 class="className">Class Name</h3>
    <div class="description">
      Class description, Lorem ipsum dolor sit, amet consectetur adipisicing
      elit. Nostrum perspiciatis eum et amet unde laudantium quae adipisci iusto
      error. Quidem vitae dicta ipsa qui est, minus cum nisi eos delectus
      asperiores omnis vel sequi laborum ratione debitis in ullam velit aperiam
      voluptatibus voluptatum facilis! Rerum illo unde incidunt voluptas
      necessitatibus?
    </div>
    <div class="description">Dates, Time, Cost, paypal link</div>
  </div>

  <div class="action-buttons">
    <i class="fa fa-pencil icon-btn"></i>
    <i class="fa fa-times icon-btn"></i>
    <i class="fa fa-move icon-btn"></i>
  </div>
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
  .classInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .action-buttons {
    position: absolute;
    right: 0px;
  }
</style>
