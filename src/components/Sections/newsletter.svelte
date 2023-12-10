<script>
  import { db } from "../../fakeData";
  import EditButton from "../General/editButton.svelte";
  import Modal from "../General/modal.svelte";

  const editNewsletterText = "editNewsletterText";
  const newsletterText = db.textContent.newsletterTitle;
</script>

<div class="d-flex justify-content-center newsletter position-relative">
  <EditButton modalId={editNewsletterText} />
  <div class="container-md content-container">
    <div>{newsletterText}</div>
    <label for="">Name (required)</label>
    <div class="d-flex">
      <input
        class="form-control"
        type="text"
        placeholder="First Name"
        style="margin-left: 0;"
      />
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

<Modal id={editNewsletterText} showModal={false}>
  <span slot="headerText"> Edit Section Header </span>
  <span slot="body">
    <input type="text" class="form-control w-100" />
  </span>
  <span slot="footer">
    <button class="btn btn-primary">Save</button>
  </span>
</Modal>

<style lang="scss">
  .container-md {
    max-width: 700px;
  }
  .newsletter {
    padding: 75px 0px;
    margin: 75px 0px 0px;
    background-size: cover;
    background-image: url(https://media.istockphoto.com/id/1182650732/photo/abstract-multi-colored-bokeh-background-lights-at-night-autumn-fall-winter-christmas.jpg?s=1024x1024&w=is&k=20&c=Vx6ECs43Qbn6xCzbEyEdvqMQGxyaRpceIeq31gILqic=);
    :not(i, button) {
      color: white;
    }
    height: 89vh;
    .content-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      align-self: center;
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
