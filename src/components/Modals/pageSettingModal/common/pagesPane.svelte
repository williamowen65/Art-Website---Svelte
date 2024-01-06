<div class="card" id="matter-content">
  <ul class="nav nav-tabs mt-1" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button
        class="nav-link active"
        id="party-tab"
        data-toggle="tab"
        data-target="#party"
        type="button"
        role="tab"
        aria-controls="home"
        aria-selected="true">Home</button
      >
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="courthouse-tab"
        data-toggle="tab"
        data-target="#courthouse"
        type="button"
        role="tab"
        aria-controls="profile"
        aria-selected="false">Commissions</button
      >
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="calendar-tab"
        data-toggle="tab"
        data-target="#calendar"
        type="button"
        role="tab"
        aria-controls="contact"
        aria-selected="false">Classes</button
      >
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="document-center-tab"
        data-toggle="tab"
        data-target="#document-center"
        type="button"
        role="tab"
        aria-controls="contact"
        aria-selected="false">About</button
      >
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="discovery-tab"
        data-toggle="tab"
        data-target="#discovery"
        type="button"
        role="tab"
        aria-controls="contact"
        aria-selected="false">Contact</button
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
        id="party"
        role="tabpanel"
        aria-labelledby="party-tab"
      >
        test
      </div>
      <div
        class="tab-pane fade"
        id="courthouse"
        role="tabpanel"
        aria-labelledby="courthouse-tab"
      >
        "tttest"
      </div>
      <div
        class="tab-pane fade"
        id="calendar"
        role="tabpanel"
        aria-labelledby="calendar"
      >
        "tttest"
      </div>
      <div
        class="tab-pane fade"
        id="document-center"
        role="tabpanel"
        aria-labelledby="document-center-tab"
      >
        "tttest"
      </div>
      <div
        class="tab-pane fade"
        id="discovery"
        role="tabpanel"
        aria-labelledby="discovery-tab"
      >
        "tttest"
      </div>
      <div
        class="tab-pane fade"
        id="document-generator"
        role="tabpanel"
        aria-labelledby="document-generator-tab"
      >
        "tttest"
      </div>
      <div
        class="tab-pane fade"
        id="all-data"
        role="tabpanel"
        aria-labelledby="all-data-tab"
      >
        "tttest"
      </div>
      <div
        class="tab-pane fade"
        id="tools"
        role="tabpanel"
        aria-labelledby="tools-tab"
      >
        "tttest"
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
</style>
