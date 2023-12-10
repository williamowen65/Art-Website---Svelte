<script>
  import "../app.scss";
  import Modal from "../components/modal.svelte";
</script>

<nav>
  <div class="container">
    <span>
      <a href="/" class="logo-container">
        <h1>Beth Owen Watercolors</h1>
      </a>
    </span>
    <span class="links d-flex flex-wrap">
      <a href="/originals">Originals</a>
      <a href="/reproductions">Reproductions</a>
      <a href="/commissions">Commissions</a>
      <a href="/classes">Classes</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </span>
  </div>
</nav>

<div class="container mt-5">
  <slot />
</div>

<footer></footer>

<Modal></Modal>

<style lang="scss">
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
  footer {
    height: 100px;
  }
</style>
