<div class="card" id="matter-content">
  <ul class="nav nav-tabs mt-1" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button
        class="nav-link active"
        id="home-tab"
        data-toggle="tab"
        data-target="#home"
        type="button"
        role="tab"
        aria-controls="home"
        aria-selected="true">Home</button
      >
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="commissions-tab"
        data-toggle="tab"
        data-target="#commissions"
        type="button"
        role="tab"
        aria-controls="profile"
        aria-selected="false">Commissions</button
      >
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="classes-tab"
        data-toggle="tab"
        data-target="#classes"
        type="button"
        role="tab"
        aria-controls="contact"
        aria-selected="false">Classes</button
      >
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="about-tab"
        data-toggle="tab"
        data-target="#about"
        type="button"
        role="tab"
        aria-controls="contact"
        aria-selected="false">About</button
      >
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="tools-tab"
        data-toggle="tab"
        data-target="#tools"
        type="button"
        role="tab"
        aria-controls="contact"
        aria-selected="false"
      >
        <i class="fa fa-plus"></i>
        Add Page
      </button>
    </li>
  </ul>
  <div class="card-body">
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <p>page</p>
      </div>
      <div
        class="tab-pane fade"
        id="commissions"
        role="tabpanel"
        aria-labelledby="commissions-tab"
      >
        Commissions
      </div>
      <div
        class="tab-pane fade"
        id="classes"
        role="tabpanel"
        aria-labelledby="classes"
      >
        Classes
      </div>
      <div
        class="tab-pane fade"
        id="about"
        role="tabpanel"
        aria-labelledby="about-tab"
      >
        About
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  :global(.nav-item.websiteSettings) {
    cursor: pointer;
    padding-bottom: 0px;
    border-bottom: 1px solid #a1afbd;
    &:hover {
      border-bottom: 1px solid #d4d7db;
      background-color: #a1afbd;
    }
    :global(a),
    :global(a:hover) {
      border: 0px;
    }
  }
  .nav-item.websiteSettings .active {
    border-radius: 0;
    background-color: rgb(244, 228, 228);
    border-color: none;
  }
  .tab-pane {
    min-height: 263px;
  }
</style>
