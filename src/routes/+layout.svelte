<script>
  import "../app.scss";
  import Modal from "../components/modal.svelte";
</script>

<nav>
  <div class="container">
    <span>
      <a href="/" class="logo-container">
        <h1 class="nav-font">Beth Owen Watercolors</h1>
      </a>
    </span>
    <span class="links d-flex flex-wrap">
      <div>
        <div
          class="dropdown-toggle nav-font"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Paintings
        </div>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="/originals">Originals</a>
          <a class="dropdown-item" href="/reproductions">Reproductions</a>
        </div>
      </div>
      <a class="nav-font" href="/commissions">Commissions</a>
      <a class="nav-font" href="/classes">Classes</a>
      <a class="nav-font" href="/about">About</a>
      <a class="nav-font" href="/contact">Contact</a>
    </span>
  </div>
</nav>

<div class="container mt-5">
  <slot />
</div>

<footer></footer>

<Modal></Modal>

<style lang="scss">
  .nav-font {
    color: white;
  }
  .dropdown-item {
    padding: 2px;
    background-color: transparent;
  }
  .dropdown-toggle {
    margin-right: 7px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
    &::after {
      /* opacity: 0 */
      display: none;
    }
  }
  nav {
    z-index: 1;
    height: fit-content;
    background: #000;
    position: sticky;
    top: 0px;
    /* translate: 0px 100%; */
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .links {
        justify-content: right;
      }
      a {
        margin: 0px 4px;
        text-decoration: none;
        &:hover:not(.logo-container) {
          text-decoration: underline;
        }
      }
    }
  }
  .logo-container {
    font-style: italic;
  }
  footer {
    height: 100px;
  }
</style>
