<div class="d-flex justify-content-center newsletter">
  <div class="container-md content-container">
    <div>Sign Up for Newsletters</div>
    <label for="">Name (required)</label>
    <div class="d-flex">
      <input class="form-control" type="text" placeholder="First Name" />
      <input
        class="form-control"
        type="text"
        placeholder="Last Name"
        style="margin-right: 0;"
      />
    </div>
    <input class="form-control" type="text" placeholder="Email" />
    <textarea class="form-control" type="text" placeholder="Message" />
    <button class="btn send">Send</button>
  </div>
</div>

<style lang="scss">
  .container-md {
    max-width: 700px;
  }
  .newsletter {
    padding: 75px 0px;
    margin: 75px 0px;
    background-size: cover;
    background-image: url(https://media.istockphoto.com/id/1182650732/photo/abstract-multi-colored-bokeh-background-lights-at-night-autumn-fall-winter-christmas.jpg?s=1024x1024&w=is&k=20&c=Vx6ECs43Qbn6xCzbEyEdvqMQGxyaRpceIeq31gILqic=);
    color: white;
    .content-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .send {
      align-self: stretch;
    }
    input,
    textarea {
      margin: 3px;
    }
  }
</style>
