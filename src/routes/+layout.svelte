<script>
  import "../app.scss";
  import Modal from "../components/modal.svelte";
  import Newsletter from "../components/newsletter.svelte";
</script>

<div class="body-container">
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
            <a class="dropdown-item" href="/originals"
              ><a class="main d-block">Originals</a>
              <span class="dropdown-header">Available as fine art giclee</span>
            </a>

            <div class="dropdown-divider"></div>
            <a class="dropdown-item main" href="/reproductions">Reproductions</a
            >
          </div>
        </div>
        <a class="nav-font main" href="/commissions">Commissions</a>
        <a class="nav-font main" href="/classes">Classes</a>
        <a class="nav-font main" href="/about">About</a>
        <a class="nav-font main" href="/contact">Contact</a>
      </span>
    </div>
  </nav>

  <div class="container mt-5">
    <slot />
  </div>
  <Newsletter />

  <footer>
    <div class="container">footer</div>
  </footer>
</div>

<Modal></Modal>

<style lang="scss">
  .body-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
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
      .main {
        margin: 0px 4px;
        text-decoration: none;
        &:hover:not(.logo-container) {
          text-decoration: underline;
        }
      }
      .logo-container {
        text-decoration: none;
      }
    }
  }
  .logo-container {
    font-style: italic;
  }
  footer {
    height: 50px;
    margin-top: auto;
    background-color: #000;
  }
</style>
