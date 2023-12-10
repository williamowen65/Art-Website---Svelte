<script>
  import EditButton from "../../components/General/editButton.svelte";
  import Modal from "../../components/General/modal.svelte";
  const editAboutMe = "editAboutMe";
</script>

<section class="about-section px-1 container pt-5 position-relative">
  <EditButton modalId={editAboutMe} />
  <div class="row">
    <div class="">
      <img
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <div class="text-container">
        <h3>About Me</h3>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur ut
        laudantium fuga reprehenderit, alias mollitia omnis, aliquid et sit a eaque
        quidem totam atque sint temporibus debitis officia in modi, ducimus fugiat
        animi quos nostrum. Quidem nulla cupiditate blanditiis dignissimos natus
        facilis omnis, ullam magni minima id sit odit doloribus numquam recusandae
        incidunt eum? Vero quisquam maxime explicabo quas consequatur ab? Quibusdam
        pariatur, nobis quod labore cupiditate dolores beatae debitis accusamus animi
        non obcaecati, natus
        <div class="about-description d-flex justify-content-center mt-5">
          <a href="#goToSite"><i class="fa fa-instagram"></i></a>
          <a href="#goToSite"><i class="fa fa-facebook"></i></a>
          <a href="#goToSite"><i class="fa fa-twitter"></i></a>
        </div>
      </div>
    </div>
  </div>
</section>

<Modal id={editAboutMe} showModal={true} classes="modal-lg">
  <span slot="headerText"> Edit About Me Section </span>
  <span slot="body">
    <textarea class="w-100 form-control"></textarea>
    <div class="d-flex">
      <div class="field" data-imgType="profilePic">
        <EditButton buttonActionType="openFilePicker" />
        <label for="">Profile Pic</label>
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <input type="file" name="" id="" class="d-none" />
      </div>
      <div class="field" data-imgType="galleryPic">
        <EditButton buttonActionType="openFilePicker" />
        <label for="">Gallery Pic</label>
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <input type="file" name="" id="" class="d-none" />
      </div>
    </div>
  </span>
  <span slot="footer">
    <button class="btn btn-primary">Save</button>
  </span>
</Modal>

<style lang="scss">
  .text-container {
    height: 100%;
  }
  img {
    width: 40%;
    min-width: 200px;
    float: left;
    padding-right: 20px;
  }
  .fa {
    padding: 13px;
    font-size: 30px;
    width: 50px;
    text-align: center;
    text-decoration: none;
    margin: 5px 2px;
    color: white;
    &.fa-facebook {
      background: #3b5998;
    }
    &.fa-twitter {
      background: #55acee;
    }
    &.fa-instagram {
      background: #125688;
    }
  }
  .field {
    position: relative;
    max-width: min-content;
    :global(.edit) {
      top: -13px !important;
      right: 5px;
    }
  }
</style>
